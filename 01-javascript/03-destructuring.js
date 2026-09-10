const user = {
    id: 1,
    name: "Omar",
    email: "omar@example.com",
    password: "secret123",
    role: "CUSTOMER",
    active: true
};

const product = {
    id: 1,
    name: "Laptop",
    price: 800,
    stock: 5
};

const {name, email} = user;
console.log(name, email);

const {role:userRole }=user;
console.log(userRole);

const {password,...safeUser} = user;
console.log(safeUser);

const updatedProduct= {
    ...product,price :900,
    stock :10};
console.log(updatedProduct);


const newProduct={...product,id : 2,
    name :"Gaming Laptop"};
console.log(newProduct);


const updateProduct = (product, updates) =>( {...product,...updates });
const result = updateProduct(product, {
    price: 1000
});


console.log(result);

