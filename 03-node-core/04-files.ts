import { writeFile, readFile } from "node:fs/promises";

await writeFile(
    "products.txt",
    "Laptop\nMouse\nKeyboard"
);

const content = await readFile(
    "products.txt",
    "utf-8"
);

console.log(content);