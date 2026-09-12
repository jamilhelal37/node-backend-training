import { readFile, writeFile } from "node:fs/promises";

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

const filePath = "products.json";

const getProducts = async (): Promise<Product[]> => {
    const content = await readFile(
        filePath,
        "utf-8"
    );

    return JSON.parse(content);
};

const saveProducts = async (
    products: Product[]
): Promise<void> => {
    const jsonData = JSON.stringify(
        products,
        null,
        2
    );

    await writeFile(
        filePath,
        jsonData
    );
};

const products = await getProducts();

console.log("Before:");
console.log(products);

products.push({
    id: 3,
    name: "Keyboard",
    price: 50,
    stock: 7,
});

await saveProducts(products);

console.log("After:");
console.log(await getProducts());