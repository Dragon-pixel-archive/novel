import { pgTable, serial, integer, varchar, text, numeric, timestamp, unique } from 'drizzle-orm/pg-core';
import { novels } from './novels.ts';

export const chapters = pgTable('chapters', {
  id: serial('id').primaryKey(),
  novelId: integer('novel_id')
    .notNull()
    .references(() => novels.id, { onDelete: 'cascade' }),
  chapterNumber: numeric('chapter_number', { precision: 10, scale: 2 }).notNull(), // cho phép 12.5 nếu có chương phụ
  title: varchar('title', { length: 255 }),
  content: text('content').notNull(), // markdown hoặc plain text
  wordCount: integer('word_count'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  novelChapterUnique: unique().on(table.novelId, table.chapterNumber),
}));