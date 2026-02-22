import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { users } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import type { RequestHandler } from './$types.js';

export const POST: RequestHandler = async ({ request }) => {
	const { email, password, name } = await request.json();

	if (!email || !password) {
		return json({ error: 'Email and password are required' }, { status: 400 });
	}

	if (password.length < 8) {
		return json({ error: 'Password must be at least 8 characters' }, { status: 400 });
	}

	const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);
	if (existing) {
		return json({ error: 'An account with this email already exists' }, { status: 409 });
	}

	const hash = await bcrypt.hash(password, 12);

	await db.insert(users).values({
		email,
		name: name || email.split('@')[0],
		password: hash
	});

	return json({ success: true }, { status: 201 });
};
