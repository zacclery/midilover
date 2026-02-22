import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session) {
		redirect(303, '/auth/login');
	}
	return { session };
};
