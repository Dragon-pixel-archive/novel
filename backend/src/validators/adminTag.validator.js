import { object, z } from "zod";
import { eq, and } from "drizzle-orm";
import { db } from "../config/database.js";
import { novels, novelTags, tags } from "../db/schema/index.ts";

const postTagSchema = z.object({
    name: z
        .string({ required_error: "Tag name is required" })
        .trim()
        .min(1, "Tag cannot be empty")
        .max(50, "Tag name too long")
});

export async function validatePostTag(req, res, next) {
    const result = postTagSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid tag data",
            errors: result.error.issues,
        });
    }

    const { name } = result.data;

    try {
        const existingTag = await db
            .select()
            .from(tags)
            .where(eq(tags.name, name))
            .limit(1)

        if (existingTag.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Tag already exist"
            });
        }

        req.body = result.data;
        next();
    } catch (error) {
        next(error);
    }
}

const postTagToNovelSchema = z.object({
    novelId: z
        .number({ required_error: "novelId is required" })
        .int()
        .positive(),

    tagId: z
        .number({ required_error: "tagId is required" })
        .int()
        .positive(),
});

export async function validatePostTagToNovel(req, res, next) {
    const novelId = Number(req.params.id);
    const tagId = Number(req.params.tagId);

    const result = postTagToNovelSchema.safeParse({novelId, tagId});

    if(!result.success){
        return res.status(400).json({
            success: false,
            message: "Invalid id data",
            errors: result.error.issues,
        });
    }

    try{
        const novel = await db
            .select()
            .from(novels)
            .where(eq(novels.id, novelId))
            .limit(1);
        
        if(novel.length === 0){
            return res.status(404).json({
                success: false,
                message: "Novel not found",
            });
        }

        const tag = await db
            .select()
            .from(tags)
            .where(eq(tags.id, tagId))
            .limit(1);

        if(tag.length === 0){
            return res.status(404).json({
                success: false,
                message: "Tag not found",
            });
        }

        const existingRelation = await db
            .select()
            .from(novelTags)
            .where(
                and(
                    eq(novelTags.novelId, novelId),
                    eq(novelTags.tagId, tagId)
                )
            )
            .limit(1)

        if(existingRelation.length > 0){
            return res.status(409).json({
                success: false,
                message: "Tag and novel already connect"
            });
        }

        req.body = result.data;
        next();
    }catch(error){
        next(error)
    }

}