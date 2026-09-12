import http from "node:http";

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 800,
        stock: 5,
    },
    {
        id: 2,
        name: "Mouse",
        price: 30,
        stock: 10,
    },
];

const server = http.createServer(
    (request, response) => {
        if (
            request.method === "GET" &&
            request.url === "/health"
        ) {
            response.writeHead(
                200,
                {
                    "Content-Type": "application/json",
                }
            );

            response.end(
                JSON.stringify({
                    status: "OK",
                })
            );

            return;
        }

        if (
            request.method === "GET" &&
            request.url === "/products"
        ) {
            response.writeHead(
                200,
                {
                    "Content-Type": "application/json",
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
                () => {
                    try {
                        const data = JSON.parse(body);

                        if (
                            !data.name ||
                            data.price === undefined ||
                            data.stock === undefined
                        ) {
                            response.writeHead(
                                400,
                                {
                                    "Content-Type": "application/json",
                                }
                            );

                            response.end(
                                JSON.stringify({
                                    message: "Missing required fields",
                                })
                            );

                            return;
                        }

                        if (
                            typeof data.name !== "string" ||
                            !data.name.trim()
                        ) {
                            response.writeHead(
                                400,
                                {
                                    "Content-Type": "application/json",
                                }
                            );

                            response.end(
                                JSON.stringify({
                                    message: "Invalid product name",
                                })
                            );

                            return;
                        }

                        if (
                            typeof data.price !== "number" ||
                            data.price <= 0
                        ) {
                            response.writeHead(
                                400,
                                {
                                    "Content-Type": "application/json",
                                }
                            );

                            response.end(
                                JSON.stringify({
                                    message: "Invalid price",
                                })
                            );

                            return;
                        }

                        if (
                            typeof data.stock !== "number" ||
                            data.stock < 0
                        ) {
                            response.writeHead(
                                400,
                                {
                                    "Content-Type": "application/json",
                                }
                            );

                            response.end(
                                JSON.stringify({
                                    message: "Invalid stock",
                                })
                            );

                            return;
                        }

                        const newProduct = {
                            id: products.length + 1,
                            name: data.name.trim(),
                            price: data.price,
                            stock: data.stock,
                        };

                        products.push(newProduct);

                        response.writeHead(
                            201,
                            {
                                "Content-Type": "application/json",
                            }
                        );

                        response.end(
                            JSON.stringify(newProduct)
                        );
                    } catch {
                        response.writeHead(
                            400,
                            {
                                "Content-Type": "application/json",
                            }
                        );

                        response.end(
                            JSON.stringify({
                                message: "Invalid JSON",
                            })
                        );
                    }
                }
            );

            return;
        }

        response.writeHead(
            404,
            {
                "Content-Type": "application/json",
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