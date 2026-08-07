import { Router } from "express";
import { getAChapter, getAllNovel, getANovel} from "../controllers/novel.controller.js";

const router = Router();

router.get('/', getAllNovel);
router.get('/:slug', getANovel);
router.get('/:slug/chapters/:chapterNumber', getAChapter)

export default router;