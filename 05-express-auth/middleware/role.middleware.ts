import type {
    Request,
    Response,
    NextFunction
} from "express";

import {
    AppError
} from "../errors/app-error.js";

import {
    Role
} from "../models/user.js";

export const requireRoles = (
    ...allowedRoles: Role[]
) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            throw new AppError(
                "Unauthorized",
                401
            );
        }

        if (
            !allowedRoles.includes(
                req.user.role
            )
        ) {
            throw new AppError(
                "Forbidden",
                403
            );
        }

        next();
    };
};