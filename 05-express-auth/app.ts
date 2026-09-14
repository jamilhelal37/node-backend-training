import "dotenv/config";

import express from "express";

import authRouter
    from "./routes/auth.routes.js";

import {
    notFoundHandler
} from "./middleware/not-found.middleware.js";

import {
    errorHandler
} from "./middleware/error.middleware.js";

import {
    env
} from "./config/env.js";

const app =
    express();

app.use(
    express.json()
);

app.get(
    "/health",
    (req, res) => {
        return res
            .status(200)
            .json({
                status: "ok",
            });
    }
);

app.use(
    "/auth",
    authRouter
);

app.use(
    notFoundHandler
);

app.use(
    errorHandler
);

app.listen(
    env.port,
    () => {
        console.log(
            `Server running on http://localhost:${env.port}`
        );
    }
);