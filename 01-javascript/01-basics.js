const product = {
    id: 1,
    name: "Laptop",
    price: 800,
    stock: 5
};

function buyProduct(product, quantity) {
    if (product.stock < quantity)
        console.log("Not enough stock");
    else {
        const total = product.price * quantity;
        product.stock -= quantity;
        console.log(`total = ${total}`);
        console.log(`stock = ${product.stock}`);
    }
}

    buyProduct(product, 2);
