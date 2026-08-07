import { eq } from "drizzle-orm";
import { db } from "../config/database.js";
import { chapters } from "../db/schema/index.ts";

export async function postChapter(data) {
    const result = await db
        .insert(chapters)
        .values(data)
        .returning()

    return result[0]; 
}

export async function updateChapter(id, data) {
    const result = await db
        .update(chapters)
        .set(data)
        .where(eq(chapters.id, id))
        .returning()

    return result[0];
}

export async function deleteChapter(id) {
    const result = await db
        .delete(chapters)
        .where(eq(chapters.id, id))
        .returning()

    return result[0];
}