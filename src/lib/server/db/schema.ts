import { pgTable, serial, integer, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const stats = pgTable('stats', {
	id: integer('id').primaryKey(),
	views: integer('views').default(0).notNull(),
	likes: integer('likes').default(0).notNull()
});

export const testimonials = pgTable('testimonials', {
	id: serial('id').primaryKey(),
	email: text('email').notNull(),
	role: text('role'),
	content: text('content').notNull(),
	rating: integer('rating').notNull(),
	approved: boolean('approved').default(false).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});
