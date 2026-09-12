import { writeFile, readFile } from "node:fs/promises";

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

const jsonData = JSON.stringify(
    products,
    null,
    2
);

await writeFile(
    "products.json",
    jsonData
);

const fileContent = await readFile(
    "products.json",
    "utf-8"
);

const parsedProducts = JSON.parse(fileContent);

console.log(parsedProducts);