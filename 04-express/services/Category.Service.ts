import type {
    Category
} from "../models/Category.js";

import type {
    CreateCategoryDto
} from "../dto/CreateCategoryDto.js";

import type {
    UpdateCategoryDto
} from "../dto/UpdateCategoryDto.js";

import {
    AppError
} from "../errors/app-error.js";

export class CategoryService {
    private categories: Category[] = [
        {
            id: 1,
            name: "Electronics",
            description: "Electronic devices and accessories",
            isActive: true,
        },
        {
            id: 2,
            name: "Clothing",
            description: "Men and women clothing",
            isActive: true,
        },
        {
            id: 3,
            name: "Books",
            description: "Books and educational materials",
            isActive: true,
        },
        {
            id: 4,
            name: "Home & Kitchen",
            description: "Home and kitchen products",
            isActive: true,
        },
        {
            id: 5,
            name: "Sports",
            description: "Sports and fitness equipment",
            isActive: true,
        },
        {
            id: 6,
            name: "Beauty",
            description: "Beauty and personal care products",
            isActive: false,
        },
    ];

    getAll(): Category[] {
        return this.categories;
    }

    getById(id: number): Category {
        const category =
            this.categories.find(
                category => category.id === id
            );

        if (!category) {
            throw new AppError(
                "Category not found",
                404
            );
        }

        return category;
    }

    create(
        data: CreateCategoryDto
    ): Category {
        if (
            typeof data.name !== "string" ||
            !data.name.trim()
        ) {
            throw new AppError(
                "Invalid category name",
                400
            );
        }

        if (
            typeof data.description !== "string" ||
            !data.description.trim()
        ) {
            throw new AppError(
                "Invalid description",
                400
            );
        }

        if (
            typeof data.isActive !== "boolean"
        ) {
            throw new AppError(
                "Invalid isActive",
                400
            );
        }

        const existingCategory =
            this.categories.find(
                category =>
                    category.name
                        .trim()
                        .toLowerCase() ===
                    data.name
                        .trim()
                        .toLowerCase()
            );

        if (existingCategory) {
            throw new AppError(
                "Category name already exists",
                400
            );
        }

        const newCategory: Category = {
            id:
                this.categories.length > 0
                    ? Math.max(
                    ...this.categories.map(
                        category => category.id
                    )
                ) + 1
                    : 1,

            name:
                data.name.trim(),

            description:
                data.description.trim(),

            isActive:
            data.isActive,
        };

        this.categories.push(
            newCategory
        );

        return newCategory;
    }

    update(
        id: number,
        data: UpdateCategoryDto
    ): Category {
        const category =
            this.getById(id);

        if (
            data.name !== undefined &&
            (
                typeof data.name !== "string" ||
                !data.name.trim()
            )
        ) {
            throw new AppError(
                "Invalid category name",
                400
            );
        }

        if (
            data.description !== undefined &&
            (
                typeof data.description !== "string" ||
                !data.description.trim()
            )
        ) {
            throw new AppError(
                "Invalid description",
                400
            );
        }

        if (
            data.isActive !== undefined &&
            typeof data.isActive !== "boolean"
        ) {
            throw new AppError(
                "Invalid isActive",
                400
            );
        }

        if (
            data.name !== undefined
        ) {
            const existingCategory =
                this.categories.find(
                    item =>
                        item.id !== id &&
                        item.name
                            .trim()
                            .toLowerCase() ===
                        data.name!
                            .trim()
                            .toLowerCase()
                );

            if (existingCategory) {
                throw new AppError(
                    "Category name already exists",
                    400
                );
            }
        }

        if (
            data.name !== undefined
        ) {
            category.name =
                data.name.trim();
        }

        if (
            data.description !== undefined
        ) {
            category.description =
                data.description.trim();
        }

        if (
            data.isActive !== undefined
        ) {
            category.isActive =
                data.isActive;
        }

        return category;
    }

    delete(
        id: number
    ): void {
        this.getById(id);

        this.categories =
            this.categories.filter(
                category =>
                    category.id !== id
            );
    }
}