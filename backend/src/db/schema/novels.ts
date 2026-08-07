import { pgTable, pgEnum, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';

// Enum này sẽ tạo 1 type riêng trong Postgres (CREATE TYPE novel_status AS ENUM (...))
// Postgres sẽ tự chặn nếu insert/update giá trị ngoài 3 giá trị này.
export const novelStatusEnum = pgEnum('novel_status', ['ongoing', 'completed', 'dropped']);

export const novels = pgTable('novels', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(), // dùng cho URL: /novel/ten-truyen
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }), // tác giả gốc (nếu là truyện dịch/sưu tầm)
  description: text('description'),
  coverUrl: text('cover_url'), // link ảnh lưu trên Vercel Blob
  status: novelStatusEnum('status').default('ongoing').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});