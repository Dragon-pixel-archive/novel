import { eq, and } from "drizzle-orm";
import { db } from "../config/database.js";
import { tags } from "../db/schema/tags.ts";
import { novelTags } from "../db/schema/novelTags.ts";

export async function postTag(name) {
    const result = await db
        .insert(tags)
        .values({
            name: name
        })
        .returning();

    return result[0];
}

export async function postTagToNovel(id, tagId) {
    const result = await db
        .insert(novelTags)
        .values({
            novelId: id,
            tagId: tagId
        })
        .returning()

    return result[0];
}

export async function deleteTagFromNovel(id, tagId) {
    const result = await db
        .delete(novelTags)
        .where(
            and(
                eq(novelTags.novelId, id),
                eq(novelTags.tagId, tagId)
            )
        )
        .returning()

    return result[0];
}

export async function deleteTag(tagId) {
    const result = await db
        .delete(tags)
        .where(eq(tags.id, tagId))
        .returning()

    return result[0];
}