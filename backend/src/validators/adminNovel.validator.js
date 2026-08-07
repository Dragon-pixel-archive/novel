import { z } from "zod";

const postNovelSchema = z.object({
    slug: z
        .string({ required_error: "Need a slug" })
        .trim()
        .min(1, "Word cannot be empty")
        .max(255, "Word too long"),

    title: z
        .string({required_error: "Need a title"})
        .trim()
        .min(1, "Title cannot be empty"),

    author: z
        .string()
        .trim()
        .optional(),

    description: z
        .string()
        .trim()
        .optional(),

    cover_url: z
        .string().url({ message: "Invalid URL"})
        .trim()
        .optional(),

    status: z
        .enum(['ongoing',
            'completed',
            'dropped'])

});

const updateNovelSchema = postNovelSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field is required"
        }
    );


export function validatePostNovel(req, res, next) {
    const result = postNovelSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            success: false,
            message: "Invalid Novel data",
            errors: result.error.issues,
        })
    }

    req.body = result.data;

    next();
}

export function validateUpdateNovel(req, res, next){
    const result = updateNovelSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            success: false,
            message: "Invalid Novel data",
            errors: result.error.issues,
        })
    }

    req.body = result.data;

    next();
}