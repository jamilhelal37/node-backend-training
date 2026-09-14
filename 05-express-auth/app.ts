import express from "express";
import "dotenv/config";
import authRouter
    from "./routes/auth.routes.js";

import {
    notFoundHandler
} from "./middleware/not-found.middleware.js";

import {
    errorHandler
} from "./middleware/error.middleware.js";

const app = express();

const PORT = 3000;

app.use(
    express.json()
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
    PORT,
    () => {
        console.log(
            `Server running on http://localhost:${PORT}`
        );
    }
);