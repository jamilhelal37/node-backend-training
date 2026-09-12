import http from "node:http";
import path from "node:path";
import {
    readFile,
    writeFile,
} from "node:fs/promises";

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

const filePath = path.join(
    process.cwd(),
    "data",
    "products.json"
);

const getProducts = async (): Promise<Product[]> => {
    const content = await readFile(
        filePath,
        "utf-8"
    );

    return JSON.parse(content);
};

const saveProducts = async (
    products: Product[]
): Promise<void> => {
    await writeFile(
        filePath,
        JSON.stringify(products, null, 2)
    );
};

const server = http.createServer(
    async (request, response) => {
        if (
            request.method === "GET" &&
            request.url === "/products"
        ) {
            const products =
                await getProducts();

            response.writeHead(
                200,
                {
                    "Content-Type":
                        "application/json",
                }
            );

            response.end(
                JSON.stringify(products)
            );

            return;
        }

        if (
            request.method === "POST" &&
            request.url === "/products"
        ) {
            let body = "";

            request.on(
                "data",
                (chunk) => {
                    body += chunk;
                }
            );

            request.on(
                "end",
                async () => {
                    try {
                        const data =
                            JSON.parse(body);

                        if (
                            !data.name ||
                            typeof data.price !== "number" ||
                            typeof data.stock !== "number"
                        ) {
                            response.writeHead(
                                400,
                                {
                                    "Content-Type":
                                        "application/json",
                                }
                            );

                            response.end(
                                JSON.stringify({
                                    message:
                                        "Invalid product data",
                                })
                            );

                            return;
                        }

                        const products =
                            await getProducts();

                        const newProduct: Product = {
                            id:
                                products.length > 0
                                    ? Math.max(
                                    ...products.map(
                                        product =>
                                            product.id
                                    )
                                ) + 1
                                    : 1,

                            name:
                                data.name.trim(),

                            price:
                            data.price,

                            stock:
                            data.stock,
                        };

                        products.push(
                            newProduct
                        );

                        await saveProducts(
                            products
                        );

                        response.writeHead(
                            201,
                            {
                                "Content-Type":
                                    "application/json",
                            }
                        );

                        response.end(
                            JSON.stringify(
                                newProduct
                            )
                        );
                    } catch {
                        response.writeHead(
                            400,
                            {
                                "Content-Type":
                                    "application/json",
                            }
                        );

                        response.end(
                            JSON.stringify({
                                message:
                                    "Invalid request",
                            })
                        );
                    }
                }
            );

            return;
        }


        if (
            request.method === "GET" &&
            request.url?.startsWith("/products/")
        ) {
            const id = Number(
                request.url.split("/")[2]
            );

            if (Number.isNaN(id)) {
                response.writeHead(
                    400,
                    {
                        "Content-Type":
                            "application/json",
                    }
                );

                response.end(
                    JSON.stringify({
                        message: "Invalid product id",
                    })
                );

                return;
            }

            const products =
                await getProducts();

            const product =
                products.find(
                    product => product.id === id
                );

            if (!product) {
                response.writeHead(
                    404,
                    {
                        "Content-Type":
                            "application/json",
                    }
                );

                response.end(
                    JSON.stringify({
                        message: "Product not found",
                    })
                );

                return;
            }

            response.writeHead(
                200,
                {
                    "Content-Type":
                        "application/json",
                }
            );

            response.end(
                JSON.stringify(product)
            );

            return;
        }

        if (
            request.method === "DELETE" &&
            request.url?.startsWith("/products/")
        ) {
            const id = Number(
                request.url.split("/")[2]
            );

            if (Number.isNaN(id)) {
                response.writeHead(
                    400,
                    {
                        "Content-Type":
                            "application/json",
                    }
                );

                response.end(
                    JSON.stringify({
                        message: "Invalid product id",
                    })
                );

                return;
            }

            const products =
                await getProducts();

            const productExists =
                products.some(
                    product => product.id === id
                );

            if (!productExists) {
                response.writeHead(
                    404,
                    {
                        "Content-Type":
                            "application/json",
                    }
                );

                response.end(
                    JSON.stringify({
                        message: "Product not found",
                    })
                );

                return;
            }

            const updatedProducts =
                products.filter(
                    product => product.id !== id
                );

            await saveProducts(
                updatedProducts
            );

            response.writeHead(
                200,
                {
                    "Content-Type":
                        "application/json",
                }
            );

            response.end(
                JSON.stringify({
                    message:
                        "Product deleted successfully",
                })
            );

            return;
        }
        response.writeHead(
            404,
            {
                "Content-Type":
                    "application/json",
            }
        );

        response.end(
            JSON.stringify({
                message: "Route not found",
            })
        );
    }
);

server.listen(
    3000,
    () => {
        console.log(
            "Server running on http://localhost:3000"
        );
    }
);