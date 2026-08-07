import { pgTable, integer, primaryKey } from 'drizzle-orm/pg-core';
import { novels } from './novels.ts';
import { tags } from './tags.ts';

export const novelTags = pgTable('novel_tags', {
    novelId: integer('novel_id')
        .notNull()
        .references(() => novels.id, { onDelete: 'cascade' }),
    tagId: integer('tag_id')
        .notNull()
        .references(() => tags.id, { onDelete: 'cascade' }),
}, (table) => ({
    pk: primaryKey({ columns: [table.novelId, table.tagId] }),
}));