import { asc, eq, and, lt, gt, desc} from "drizzle-orm";
import { db } from "../config/database.js";
import { chapters, novels, tags, novelTags } from "../db/schema/index.ts";

export async function getNovel() {
    return await db
        .select()
        .from(novels)
        .orderBy(novels.id);
}

export async function getNovelBySlug(slug) {
    const novel = await db
        .select()
        .from(novels)
        .where(eq(novels.slug, slug))
        .limit(1);

    if(!novel[0]) return null;

    const ChapterNovel = await db
        .select({
            id: chapters.id,
            novelId: chapters.novelId,
            chapterNumber: chapters.chapterNumber,
            tittle: chapters.title,
            wordCount: chapters.wordCount,
            createdAt: chapters.createdAt,
            updatedAt: chapters.updatedAt
        })
        .from(chapters)
        .where(eq(chapters.novelId, novel[0].id))
        .orderBy(asc(chapters.chapterNumber));

    const NovelTagList = await db
        .select()
        .from(novelTags)
        .innerJoin(tags, eq(novelTags.tagId, tags.id))
        .where(eq(novelTags.novelId, novel[0].id));

    return {
        ...novel[0],
        chapters: ChapterNovel,
        tags: NovelTagList
    };
}

export async function getChapter(slug, chapterNumber) {
    const novel =  await db
        .select({
            id: novels.id,
            title: novels.title,
            slug: novels.slug
        })
        .from(novels)
        .where(eq(novels.slug, slug))
        .limit(1);

    if(!novel[0])
        return null;

    const chapter = await db
        .select()
        .from(chapters)
        .where(and(
            eq(chapters.novelId, novel[0].id),
            eq(chapters.chapterNumber, chapterNumber)
        ))
        .limit(1);

    if(!chapter[0])
        return null;

    const [prevChapter, nextChapter] = await Promise.all([
        db
            .select({ chapterNumber: chapters.chapterNumber })
            .from(chapters)
            .where(
                and(
                    eq(chapters.novelId, novel[0].id),
                    lt(chapters.chapterNumber, chapterNumber)
                )
            )
            .orderBy(desc(chapters.chapterNumber))
            .limit(1),

        db
            .select({ chapterNumber: chapters.chapterNumber })
            .from(chapters)
            .where(
                and(
                    eq(chapters.novelId, novel[0].id),
                    gt(chapters.chapterNumber, chapterNumber)
                )
            )
            .orderBy(asc(chapters.chapterNumber))
            .limit(1),
    ]);

    return {
        novel: novel[0],
        chapter: chapter[0],
        prevChapterNumber: prevChapter[0]?.chapterNumber ?? null,
        nextChapterNumber: nextChapter[0]?.chapterNumber ?? null,
    };

    
}

