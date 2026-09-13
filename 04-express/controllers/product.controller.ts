import type {
    Request,
    Response,
    NextFunction
} from "express";

import {
    ProductService
} from "../services/product.service.js";

const productService =
    new ProductService();

export const getProducts = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products =
            productService.getAll();

        return res.status(200).json(
            products
        );
    } catch (error) {
        next(error);
    }
};

export const getProductById = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id =
            Number(req.params.id);

        const product =
            productService.getById(id);

        return res.status(200).json(
            product
        );
    } catch (error) {
        next(error);
    }
};

export const createProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const product =
            productService.create(
                req.body
            );

        return res.status(201).json(
            product
        );
    } catch (error) {
        next(error);
    }
};

export const updateProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id =
            Number(req.params.id);

        const product =
            productService.update(
                id,
                req.body
            );

        return res.status(200).json(
            product
        );
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id =
            Number(req.params.id);

        productService.delete(id);

        return res.status(200).json({
            message:
                "Product deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};