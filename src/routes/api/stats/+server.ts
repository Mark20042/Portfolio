import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { stats, testimonials } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';


export async function GET() {
	try {
		
		let result = await db.select().from(stats).where(eq(stats.id, 1));
		if (result.length === 0) {
			result = await db.insert(stats).values({ id: 1, views: 0, likes: 0 }).returning();
		}

		// Calculate avg rating from approved testimonials
		const avgRes = await db.select({
			avg: sql`avg(${testimonials.rating})`
		}).from(testimonials).where(eq(testimonials.approved, true));

		let avgRating = 0;
		if (avgRes.length > 0 && avgRes[0].avg !== null) {
			avgRating = Math.round(Number(avgRes[0].avg) * 10) / 10;
		}

		return json({
			...result[0],
			avgRating
		});
	} catch (e) {
		console.error(e);
		return json({ error: 'Database error', views: 0, likes: 0, avgRating: 0 }, { status: 500 });
	}
}


export async function POST({ request }) {
	try {
		const { action } = await request.json();
		
		
		const existing = await db.select().from(stats).where(eq(stats.id, 1));
		if (existing.length === 0) {
			await db.insert(stats).values({ id: 1, views: 0, likes: 0 });
		}

		let updated;
		if (action === 'view') {
			updated = await db.update(stats)
				.set({ views: sql`${stats.views} + 1` })
				.where(eq(stats.id, 1))
				.returning();
		} else if (action === 'like') {
			updated = await db.update(stats)
				.set({ likes: sql`${stats.likes} + 1` })
				.where(eq(stats.id, 1))
				.returning();
		} else {
			return json({ error: 'Invalid action' }, { status: 400 });
		}

		
		const avgRes = await db.select({
			avg: sql`avg(${testimonials.rating})`
		}).from(testimonials).where(eq(testimonials.approved, true));

		let avgRating = 0;
		if (avgRes.length > 0 && avgRes[0].avg !== null) {
			avgRating = Math.round(Number(avgRes[0].avg) * 10) / 10;
		}

		return json({
			...updated[0],
			avgRating
		});
	} catch (e) {
		console.error(e);
		return json({ error: 'Database error' }, { status: 500 });
	}
}
