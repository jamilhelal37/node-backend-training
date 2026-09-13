import express from "express";

import categoryRouter
    from "./routes/category.routes.js";

import productRouter
    from "./routes/product.routes.js";

import {
    errorHandler
} from "./middleware/error.middleware.js";
import {
    notFoundHandler
} from "./middleware/not-found.middleware.js";

const app = express();

const PORT = 3000;

app.use(
    express.json()
);

app.use(
    "/products",
    productRouter
);
app.use("/categories", categoryRouter);

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