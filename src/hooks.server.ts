import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from '@sveltejs/kit';
import { handle as authHandle } from './auth.js';
import type { Handle } from '@sveltejs/kit';

const protectedRoutes: Handle = async ({ event, resolve }) => {
	const protectedPaths = ['/dashboard'];
	const isProtected = protectedPaths.some((path) => event.url.pathname.startsWith(path));

	if (isProtected) {
		const session = await event.locals.auth();
		if (!session) {
			redirect(303, '/auth/login');
		}
	}

	return resolve(event);
};

export const handle = sequence(authHandle, protectedRoutes);
