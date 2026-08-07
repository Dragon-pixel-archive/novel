import { Router } from "express";
import { deleteNovelControl, PostNovelControl, UpdateNovelControl } from "../controllers/adminNovel.controller.js";
import { validatePostNovel, validateUpdateNovel } from "../validators/adminNovel.validator.js";
import { deleteChapterControl, postChpaterControl, updateChapterControl } from "../controllers/adminChapter.controller.js";
import { validatePostChapter, validateUpdateChapter } from "../validators/adminChapter.validator.js";
import { validatePostTag, validatePostTagToNovel } from "../validators/adminTag.validator.js";
import { deleteTagControl, deleteTagFromNovelControl, postTagControl, postTagToNovelControl } from "../controllers/adminTag.controller.js";

const router = Router();

router.post('/novels',
    validatePostNovel,
    PostNovelControl
)
router.put('/novels/:id',
    validateUpdateNovel,
    UpdateNovelControl
)
router.delete('/novels/:id',deleteNovelControl)

router.post('/chapters',
    validatePostChapter,
    postChpaterControl
)
router.put('/chapters/:id',
    validateUpdateChapter,
    updateChapterControl
)
router.delete('/chapters/:id', deleteChapterControl)

router.post('/tags',
    validatePostTag,
    postTagControl
)
router.post('/novels/:id/tags/:tagId',
    validatePostTagToNovel,
    postTagToNovelControl
)
router.delete('/novels/:id/tags/:tagId', deleteTagFromNovelControl)
router.delete('/tags/:id', deleteTagControl)

//router.post('/upload')//url cover

export default router;