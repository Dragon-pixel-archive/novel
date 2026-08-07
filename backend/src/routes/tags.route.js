import { Router } from "express";
import { getTagList } from "../controllers/tags.controller.js"
import { getNovelByTag } from "../controllers/tags.controller.js"

const router = Router();

router.get('/', getTagList)
router.get('/:tagId/novels', getNovelByTag)

export default router