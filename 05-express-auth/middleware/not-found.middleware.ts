import type {
    Request,
    Response,
    NextFunction
} from "express";

import {
    AppError
} from "../errors/app-error.js";

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    next(
        new AppError(
            `Route ${req.method} ${req.originalUrl} not found`,
            404
        )
    );
};