import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import Credentials from '@auth/sveltekit/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '$lib/server/db/index.js';
import { users } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: DrizzleAdapter(db),
	providers: [
		Google,
		Credentials({
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const email = credentials.email as string;
				const password = credentials.password as string;

				const [user] = await db
					.select()
					.from(users)
					.where(eq(users.email, email))
					.limit(1);

				if (!user?.password) return null;

				const valid = await bcrypt.compare(password, user.password);
				if (!valid) return null;

				return { id: user.id, name: user.name, email: user.email, image: user.image };
			}
		})
	],
	session: { strategy: 'jwt' },
	pages: {
		signIn: '/auth/login'
	},
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		session({ session, token }) {
			if (session.user && token.id) {
				session.user.id = token.id as string;
			}
			return session;
		}
	}
});
