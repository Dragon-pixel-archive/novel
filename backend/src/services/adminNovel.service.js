import { eq } from "drizzle-orm";
import { db } from "../config/database.js";
import { novels } from "../db/schema/index.ts";

export async function postNovel(data) {
    const result = await db
        .insert(novels)
        .values(data)
        .returning()

    return result[0];
}

export async function updateNovel(id, data) {
    const result = await db
        .update(novels)
        .set(data)
        .where(eq(novels.id, id))
        .returning()

    return result[0];   
}

export async function deleteNovel(id) {
    const result = await db
        .delete(novels)
        .where(eq(novels.id, id))
        .returning()

    return result[0];
}
