import { deleteChapter, getFullChapter, postChapter, updateChapter } from "../services/adminChapter.service.js";


export async function getFullChapterControl(req, res, next) {
    try {
        const id = Number(req.params.id);

        const Chapter = await getFullChapter(id);

        if(!Chapter) {
            res.status(404).json({
                success: false,
                error: "Chapter not found"
            })
        }else{
            res.status(200).json({
                success: true,
                data: Chapter[0]
            })
        }
    }catch(error){
        next(error);
    }
}

export async function postChpaterControl(req, res, next) {
    try {
        const Chapter = await postChapter(req.body)

        res.status(200).json({
            success: true,
            data: Chapter
        })
    } catch(error){
        next(error)
    }
}

export async function updateChapterControl(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid Novel ID",
            });
        }

        const result = await updateChapter(id, req.body)

        if (!result) {
            return res.status(404).json({
                success: false,
                error: "Chapter not found"
            })
        } else {
            return res.status(200).json({
                success: true,
                data: result
            })
        }
    } catch(error){
        next(error)
    }
}

export async function deleteChapterControl(req, res, next) {
    try{
        const id = Number(req.params.id)

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid Novel ID",
            });
        }

        const result = await deleteChapter(id, req.body)

        if (!result) {
            return res.status(404).json({
                success: false,
                error: "Novel not found"
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