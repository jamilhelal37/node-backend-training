import {UpdateProductDto} from "../dto/update-product.dto";
import { Product } from "../models/product";

export interface ProductRepository {
    findAll(): Product[];

    findById(
        id: number
    ): Product | undefined;

    save(
        product: Product
    ): void;

    update(
        id: number,
        updates: UpdateProductDto
    ): Product;

    delete(
        id: number
    ): void;
}


export class InMemoryProductRepository
    implements ProductRepository {
    private products: Product[] = [];
    findAll(): Product[]  {
        return this.products;
}

    findById(
        id: number
    ): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    save(
        product: Product
    ): void {
        this.products.push(product);
    }

    update(
        id: number,
        updates: UpdateProductDto
    ): Product {
        const product = this.findById(id);
        if (!product) {
            throw new Error("Product not exists");
        }
        
        let updatedProduct: Product = product;
        this.products = this.products.map(p => {
            if (p.id === id) {
                updatedProduct = { ...p, ...updates };
                return updatedProduct;
            }
            return p;
        });
        
        return updatedProduct;
    }

    delete(
        id: number
    ): void{
        this.products = this.products.filter(p => p.id !== id);

    }
}