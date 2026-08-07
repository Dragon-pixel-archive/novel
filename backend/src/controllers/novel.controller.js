import { getChapter, getNovel, getNovelBySlug } from "../services/novel.service.js";

export async function getAllNovel(req, res, next) {
    try {
        const novels = await getNovel();

        res.json({
            success: true,
            data: novels,
        });
    } catch (error) {
        next(error);
    }
}

export async function getANovel(req, res, next) {
    try {

        const {slug} = req.params;

        const novel = await getNovelBySlug(slug);

        if(!novel) {
            res.status(404).json({
                success: false,
                error: "Novel not found!"
            })
        } else {
            res.json({
                success: true,
                data: novel
            });
        }
    } catch (error) {
        next(error);
    }
}


export async function getAChapter(req, res, next) {
    try {

        const {slug, chapterNumber} = req.params;

        const chapter = await getChapter(slug, chapterNumber);

        if(!chapter){
            res.status(404).json({
                success: false,
                error: "Can not find chapter or story!"
            })
        } else {
            res.json({
                success: true,
                data: chapter
            })
        }
    } catch (error) {
        next (error)
    }
}

