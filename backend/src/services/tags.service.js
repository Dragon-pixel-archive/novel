import { eq} from "drizzle-orm";
import { db } from "../config/database.js";
import { chapters, novels, novelTags, tags } from "../db/schema/index.ts";

export async function getTags() {
    return await db
        .select()
        .from(tags)
        .orderBy(tags.name);
}

export async function getStoryByTag(tagId) {
    const storyList = await db
        .select()
        .from(novels)
        .innerJoin(novelTags, eq(novels.id, novelTags.novelId))
        .where(eq(novelTags.tagId, tagId))
        .orderBy(novels.title)

    if (!storyList[0])
        return null;

    return storyList[0];
}