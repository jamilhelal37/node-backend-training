import {
    Router
} from "express";
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
    updateCategory
} from "../controllers/category.controller.js";

const router = Router();

router.get("/",getCategories);
router.get("/:id",getCategoryById)
router.post("/",createCategory);
router.put("/:id",updateCategory);
router.delete("/:id",deleteCategory);

export default router;