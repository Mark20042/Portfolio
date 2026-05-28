import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { testimonials } from '$lib/server/db/schema';
import { desc, eq, sql } from 'drizzle-orm';

export async function GET() {
	try {
		const result = await db.select().from(testimonials).where(eq(testimonials.approved, true)).orderBy(desc(testimonials.createdAt));
		return json(result);
	} catch (e) {
		console.error(e);
		// Return some mock data if DB isn't set up yet
		return json([
			{
				id: 1,
				email: 'anonymous@gmail.com',
				role: '@anonymous',
				content: 'great experience, love working with u!',
				rating: 5,
				createdAt: new Date().toISOString()
			},
			{
				id: 2,
				email: 'anonymous@gmail.com',
				role: '@anonymous',
				content: 'highly recommended, fast and efficient!',
				rating: 5,
				createdAt: new Date().toISOString()
			}
		]);
	}
}

export async function POST({ request }: { request: Request }) {
	try {
		const body = await request.json();
		const { email, role, content, rating } = body;

		if (!email || !content || !rating) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		const result = await db.insert(testimonials).values({
			email,
			role: role || '@anonymous',
			content,
			rating
		}).returning();

		return json(result[0], { status: 201 });
	} catch (e) {
		console.error(e);
		return json({ error: 'Database error' }, { status: 500 });
	}
}
