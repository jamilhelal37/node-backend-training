import path from "node:path";

const filePath = path.join(
    process.cwd(),
    "data",
    "products.json"
);

console.log(filePath);