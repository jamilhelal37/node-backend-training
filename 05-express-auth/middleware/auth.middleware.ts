import type {
    Request,
    Response,
    NextFunction
} from "express";

import jwt from "jsonwebtoken";

import {
    AppError
} from "../errors/app-error.js";

import {
    Role
} from "../models/user.js";
import {env} from "../config/env.js";

export interface AuthPayload {
    sub: number;
    email: string;
    role: Role;
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader =
        req.headers.authorization;

    if (!authHeader) {
        throw new AppError(
            "Authorization header is missing",
            401
        );
    }

    const [type, token] =
        authHeader.split(" ");

    if (
        type !== "Bearer" ||
        !token
    ) {
        throw new AppError(
            "Invalid authorization format",
            401
        );
    }



    try {
        const decoded =
            jwt.verify(
                token,
                env.jwtSecret
            );

        if (
            typeof decoded === "string" ||
            typeof decoded.sub !== "number" ||
            typeof decoded.email !== "string" ||
            !Object.values(Role).includes(
                decoded.role as Role
            )
        ) {
            throw new AppError(
                "Invalid token payload",
                401
            );
        }

        const payload: AuthPayload = {
            sub: decoded.sub,
            email: decoded.email,
            role: decoded.role as Role,
        };

        req.user = payload;

        return next();
    } catch {
        throw new AppError(
            "Invalid or expired token",
            401
        );
    }
};