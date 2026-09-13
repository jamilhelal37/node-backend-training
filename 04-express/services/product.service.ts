import type {
    Product
} from "../models/product.js";

import {
    AppError
} from "../errors/app-error.js";
import type {
    CreateProductDto
} from "../dto/create-product.dto.js";

import type {
    UpdateProductDto
} from "../dto/update-product.dto.js";

export class ProductService {
    private products: Product[] = [
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

    getAll(): Product[] {
        return this.products;
    }

    getById(id: number): Product {
        const product = this.products.find(
            product => product.id === id
        );

        if (!product) {
            throw new AppError(
                "Product not found",
                404
            );
        }

        return product;
    }

    create(
        data: CreateProductDto
    ): Product {
        if (!data.name?.trim()) {
            throw new AppError(
                "Invalid product name",
                400
            );
        }

        if (data.price <= 0) {
            throw new AppError(
                "Invalid price",
                400
            );
        }

        if (data.stock < 0) {
            throw new AppError(
                "Invalid stock",
                400
            );
        }

        const newProduct: Product = {
            id:
                this.products.length > 0
                    ? Math.max(
                    ...this.products.map(
                        product => product.id
                    )
                ) + 1
                    : 1,

            name: data.name.trim(),
            price: data.price,
            stock: data.stock,
        };

        this.products.push(
            newProduct
        );

        return newProduct;
    }

    update(
        id: number,
        data: UpdateProductDto
    ): Product {
        const product =
            this.getById(id);

        if (
            data.name !== undefined &&
            !data.name.trim()
        ) {
            throw new AppError(
                "Invalid product name",
                400
            );
        }

        if (
            data.price !== undefined &&
            data.price <= 0
        ) {
            throw new AppError(
                "Invalid price",
                400
            );
        }

        if (
            data.stock !== undefined &&
            data.stock < 0
        ) {
            throw new AppError(
                "Invalid stock",
                400
            );
        }

        if (data.name !== undefined) {
            product.name =
                data.name.trim();
        }

        if (data.price !== undefined) {
            product.price =
                data.price;
        }

        if (data.stock !== undefined) {
            product.stock =
                data.stock;
        }

        return product;
    }

    delete(id: number): void {
        this.getById(id);

        this.products =
            this.products.filter(
                product => product.id !== id
            );
    }
}