import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateProductDto} from "./dto/create-product.dto.js";
import {UpdateProductDto} from "./dto/update-product.dto.js";

export interface Product {
    id: number;
    name: string;
    price: number;
}

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: 1,
            name: 'Laptop',
            price: 1200,
        },
        {
            id: 2,
            name: 'Phone',
            price: 800,
        },
    ];

    findAll(): Product[] {
        return this.products;
    }

    findOne(id: number): Product {
        const product =
            this.products.find(
                (product) => product.id === id,
            );

        if (!product) {
            throw new NotFoundException(
                'Product not found',
            );
        }

        return product;
    }
    create(
        data: CreateProductDto,
    ): Product {
        const newProduct: Product = {
            id:
                this.products.length > 0
                    ? Math.max(
                    ...this.products.map(
                        (product) => product.id,
                    ),
                ) + 1
                    : 1,

            name: data.name,
            price: data.price,
        };

        this.products.push(
            newProduct,
        );

        return newProduct;
    }


    update(
        id: number,
        data: UpdateProductDto,
    ): Product {
        const product =
            this.findOne(id);

        if (
            data.name !== undefined
        ) {
            product.name =
                data.name;
        }

        if (
            data.price !== undefined
        ) {
            product.price =
                data.price;
        }

        return product;
    }
    delete(id: number) {
        this.findOne(id);
         this.products = this.products.filter(product => product.id !== id);
    }
}