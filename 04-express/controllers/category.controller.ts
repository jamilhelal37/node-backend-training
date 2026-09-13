import type {
    Request,
    Response,
    NextFunction
} from "express";

import {
    CategoryService
} from "../services/Category.Service.js";

const categoryService =
    new CategoryService();

export const getCategories = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories =
            categoryService.getAll();

        return res.status(200).json(
            categories
        );
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id =
            Number(req.params.id);

        const category =
            categoryService.getById(id);

        return res.status(200).json(
            category
        );
    } catch (error) {
        next(error);
    }
};

export const createCategory = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const category =
            categoryService.create(
                req.body
            );

        return res.status(201).json(
            category
        );
    } catch (error) {
        next(error);
    }
};

export const updateCategory = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id =
            Number(req.params.id);

        const category =
            categoryService.update(
                id,
                req.body
            );

        return res.status(200).json(
            category
        );
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id =
            Number(req.params.id);

        categoryService.delete(id);

        return res.status(200).json({
            message:
                "Category deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};