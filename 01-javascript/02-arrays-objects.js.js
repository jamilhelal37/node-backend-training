const products = [
    {
        id: 1,
        name: "Laptop",
        price: 800,
        stock: 5
    },
    {
        id: 2,
        name: "Mouse",
        price: 30,
        stock: 0
    },
    {
        id: 3,
        name: "Keyboard",
        price: 50,
        stock: 10
    },
    {
        id: 4,
        name: "Monitor",
        price: 250,
        stock: 3
    }
];

const getProductById =id =>products.find(product=> product.id===id);
console.log(getProductById(3));

const getAvailableProducts = () =>products.filter(product=> product.stock>0) ;
console.log(getAvailableProducts());

const getProductsAbovePrice =price =>products.filter(product=> product.price>price);
console.log(getProductsAbovePrice(100));

const getProductNames = ()=> products.map(product=> product.name);
console.log(getProductNames());

const  hasOutOfStockProducts =()=>products.some(product=> product.stock===0);
console.log(hasOutOfStockProducts());

const areAllProductsAvailable = () =>products.every(product=> product.stock>0);
console.log(areAllProductsAvailable());

const calculateInventoryValue =()=>products.reduce((sum,product)=>{return sum+product.price*product.stock},0);
console.log(calculateInventoryValue());