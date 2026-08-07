import { relations } from 'drizzle-orm';
import { novels } from './novels.ts';
import { chapters } from './chapters.ts';
import { tags } from './tags.ts';
import { novelTags } from './novelTags.ts';

export const novelsRelations = relations(novels, ({ many }) => ({
  chapters: many(chapters),
  novelTags: many(novelTags),
}));

export const chaptersRelations = relations(chapters, ({ one }) => ({
  novel: one(novels, {
    fields: [chapters.novelId],
    references: [novels.id],
  }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  novelTags: many(novelTags),
}));

export const novelTagsRelations = relations(novelTags, ({ one }) => ({
  novel: one(novels, {
    fields: [novelTags.novelId],
    references: [novels.id],
  }),
  tag: one(tags, {
    fields: [novelTags.tagId],
    references: [tags.id],
  }),
}));