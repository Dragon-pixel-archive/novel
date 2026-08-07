import { z } from "zod";

const baseChapterSchema = z.object({
    novelId: z.coerce
        .number({ required_error: "Need novel id" })
        .positive("Novel ID must be positive"),

    chapterNumber: z.coerce
        .number({ required_error: "Need a chapter number" })
        .multipleOf(0.01, "Maximum of two decimal places allowed.")
        .positive("It has to be bigger than 0"),

    title: z.string().trim().optional(),

    content: z
        .string({ required_error: "Need content for the chapter" })
        .min(1, "Require at least 1 character"),
});

const postChapterSchema = baseChapterSchema.transform((data) => ({
    ...data,
    wordCount: data.content.trim().split(/\s+/).filter(Boolean).length,
}));

const updateChapterSchema = baseChapterSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field is required",
    })
    .transform((data) => ({
        ...data,
        ...(data.content && {
            wordCount: data.content.trim().split(/\s+/).filter(Boolean).length,
        }),
    }));

export function validatePostChapter(req, res, next) {
    const result = postChapterSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid Chapter data",
            errors: result.error.issues,
        });
    }

    req.body = result.data;
    next();
}

export function validateUpdateChapter(req, res, next) {
    const result = updateChapterSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid Chapter data",
            errors: result.error.issues,
        });
    }

    req.body = result.data;
    next();
}