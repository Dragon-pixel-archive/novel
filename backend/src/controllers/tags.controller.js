import {getStoryByTag, getTags } from "../services/tags.service.js";

export async function getTagList(req, res, next) {
    try {
        const TagList = await getTags();

        res.json({
            success: true,
            data: TagList
        })
    } catch (error) {
        next(error);
    }
}

export async function getNovelByTag(req, res, next) {
    try {
        const { tagId } = req.params;

        const NovelList = await getStoryByTag(tagId)

        if (!NovelList) {
            return res.status(404).json({
                success: false,
                error: "There're no novel with this tags"
            })
        } else {
            return res.json({
                success: true,
                data: NovelList
            })
        }
    } catch (error) {
        next(error)
    }
}