
import {Product} from "../models/product";
export type CreateProductDto = Omit<Product, "id">;