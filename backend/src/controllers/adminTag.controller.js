import { deleteTag, deleteTagFromNovel, postTag, postTagToNovel } from "../services/adminTag.service.js";

export async function postTagControl(req, res, next) {
    try{
        const name = req.body.name;

        const tag = await postTag(name)

        res.status(201).json({
            success: true,
            data: tag
        })
    }catch(error){
        next(error)
    }
}

export async function postTagToNovelControl(req, res, next) {
    try{
        const id = Number(req.params.id)
        const tagId = Number(req.params.tagId)

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid Novel ID",
            });
        }

        if (Number.isNaN(tagId)) {
            return res.status(400).json({
                success: false,
                error: "Invalid tag ID",
            });
        }

        const result = await postTagToNovel(id, tagId)

        if (!result) {
            return res.status(404).json({
                success: false,
                error: "Novel or tag not found"
            })
        } else {
            return res.status(200).json({
                success: true,
                data: result
            })
        }
    }catch(error){
        next(error)
    }
}

export async function deleteTagFromNovelControl(req, res, next) {
    try{
        const id = Number(req.params.id)
        const tagId = Number(req.params.tagId)

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid Novel ID",
            });
        }

        if (Number.isNaN(tagId)) {
            return res.status(400).json({
                success: false,
                error: "Invalid tag ID",
            });
        }

        const result = await deleteTagFromNovel(id, tagId)

        if (!result) {
            return res.status(404).json({
                success: false,
                error: "Novel or tag not found or don't have relation"
            })
        } else {
            return res.status(200).json({
                success: true,
                data: result
            })
        }
    }catch(error){
        next(error)
    }
}

export async function deleteTagControl(req, res, next) {
    try{
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid tag ID",
            });
        }

        const result = await deleteTag(id)

        if (!result) {
            return res.status(404).json({
                success: false,
                error: "Tag not found"
            })
        } else {
            return res.status(200).json({
                success: true,
                data: result
            })
        }
    }catch(error){
        next(error)
    }
}