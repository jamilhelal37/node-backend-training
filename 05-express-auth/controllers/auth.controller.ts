import type {
    Request,
    Response,
    NextFunction
} from "express";

import {
    AuthService
} from "../services/auth.service.js";

const authService =
    new AuthService();

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user =
            await authService.register(
                req.body
            );

        return res.status(201).json(
            user
        );
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user =
            await authService.login(
                req.body
            );

        return res.status(200).json(
            user
        );
    } catch (error) {
        next(error);
    }
};

export const profile = (
    req: Request,
    res: Response
) => {
    return res.status(200).json({
        user: req.user,
    });
};

export const adminOnly = (
    req: Request,
    res: Response
) => {
    return res.status(200).json({
        message: "Welcome Admin",
        user: req.user,
    });
};