import { deleteNovel, postNovel, updateNovel } from "../services/adminNovel.service.js";


export async function PostNovelControl(req, res, next) {
    try {
        const Novel = await postNovel(req.body);

        res.status(201).json({
            success: true,
            data: Novel
        });
    } catch (error) {
        next(error)
    }
}

export async function UpdateNovelControl(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid Novel ID",
            });
        }

        const result = await updateNovel(id, req.body);

        if(!result){
            return res.status(404).json({
                success: false,
                error: "Novel not found"
            })
        }else{
            return res.status(200).json({
                success: true,
                data: result
            })
        }
    } catch (error){
        next(error)
    }
}

export async function deleteNovelControl(req, res, next) {
    try{
        const id =Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid Novel ID",
            });
        }

        const result = deleteNovel(id, req.body)

        if(!result){
            return res.status(404).json({
                success: false,
                error: "Novel not found"
            })
        }else{
            return res.status(200).json({
                success: true,
                data: result
            })
        }
    }catch(error){
        next(error)
    }
}