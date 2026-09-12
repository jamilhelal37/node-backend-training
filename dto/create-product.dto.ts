
import {Product} from "../models/product.js";
export type CreateProductDto = Omit<Product, "id">;