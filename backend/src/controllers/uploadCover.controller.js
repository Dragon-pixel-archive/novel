import { put } from "@vercel/blob";
import { eq, and } from "drizzle-orm";
import { db } from "../config/database.js";
import { novels } from "../db/schema/novels.ts";

export async function PostCoverControl(req, res) {
    const file = req.file;

    const blob = await put(
        file.originalname,
        file.buffer,
        {
            access: "public",
        }
    );

    const id = Number(req.params.id);

    const result = await db
        .update(novels)
        .set({
            coverUrl: blob.url
        })
        .where(eq(novels.id, id))
        .returning()

    if(!result[0]) {
        res.status(400).json({
            success: false,
            error: "Novel not found"
        })
    }else {
        res.status(200).json({
            success: true,
            data: result[0]
        })
    }
}