import { InMemoryProductRepository } from "./repositories/product.repository.js";
import { ProductService } from "./services/product.service.js";

const repository = new InMemoryProductRepository();

const service = new ProductService(repository);

const laptop = service.createProduct({
    name: "Laptop",
    price: 800,
    stock: 5,
});

const mouse = service.createProduct({
    name: "Mouse",
    price: 30,
    stock: 10,
});

console.log("All products:");
console.log(service.getAllProducts());

service.updateProduct(
    laptop.id,
    {
        price: 900,
    }
);

console.log("Updated laptop:");
console.log(service.getProductById(laptop.id));

service.deleteProduct(mouse.id);

console.log("After delete:");
console.log(service.getAllProducts());