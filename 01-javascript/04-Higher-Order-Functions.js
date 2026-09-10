const products = [
    { id: 1, name: "Laptop", price: 800, stock: 5 },
    { id: 2, name: "Mouse", price: 30, stock: 0 },
    { id: 3, name: "Keyboard", price: 50, stock: 10 }
];

const getProducts= (minPrice=0)=>products.filter(product => product.price>= minPrice);

const processProduct = (product ,callback) => {
    callback(product);
}

const printProductName= product=>console.log(product.name);

processProduct(products[0],printProductName);


const filterProducts=(products,condition) =>
    products.filter(condition);

const availableProducts = filterProducts(products,product=>product.stock>0);
console.log(availableProducts);

