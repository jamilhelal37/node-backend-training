import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

const filePath = path.join(
    process.cwd(),
    "data",
    "products.json"
);

const content = await readFile(
    filePath,
    "utf-8"
);

const products = JSON.parse(content);

console.log("Before:");
console.log(products);

products.push({
    id: 2,
    name: "Mouse",
    price: 30,
    stock: 10,
});

await writeFile(
    filePath,
    JSON.stringify(products, null, 2)
);

console.log("Saved successfully");