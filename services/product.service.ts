import {
    ProductRepository
} from "../repositories/product.repository";

import {
    Product
} from "../models/product";

import {
    CreateProductDto
} from "../dto/create-product.dto";

import {
    UpdateProductDto
} from "../dto/update-product.dto";

export class ProductService {
    private nextId = 1;

    constructor(
        private repository: ProductRepository
    ) {}

    getAllProducts(): Product[] {
        return this.repository.findAll();
    }

    getProductById(id: number): Product {
        const product =
            this.repository.findById(id);

        if (!product) {
            throw new Error(
                "Product not found"
            );
        }

        return product;
    }

    createProduct(
        data: CreateProductDto
    ): Product {
        if (!data.name.trim()) {
            throw new Error(
                "Invalid product name"
            );
        }

        if (data.price <= 0) {
            throw new Error(
                "Invalid price"
            );
        }

        if (data.stock < 0) {
            throw new Error(
                "Invalid stock"
            );
        }

        const product: Product = {
            id: this.nextId++,
            ...data,
        };

        this.repository.save(product);

        return product;
    }

    updateProduct(
        id: number,
        updates: UpdateProductDto
    ): Product {
        this.getProductById(id);

        if (
            updates.name !== undefined &&
            !updates.name.trim()
        ) {
            throw new Error(
                "Invalid product name"
            );
        }

        if (
            updates.price !== undefined &&
            updates.price <= 0
        ) {
            throw new Error(
                "Invalid price"
            );
        }

        if (
            updates.stock !== undefined &&
            updates.stock < 0
        ) {
            throw new Error(
                "Invalid stock"
            );
        }

        return this.repository.update(
            id,
            updates
        );
    }

    deleteProduct(id: number): void {
        this.getProductById(id);

        this.repository.delete(id);
    }
}