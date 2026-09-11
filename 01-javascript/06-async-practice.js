const users = [
    { id: 1, name: "Omar", active: true },
    { id: 2, name: "Ali", active: false }
];

const products = [
    { id: 1, name: "Laptop", price: 800, stock: 5 },
    { id: 2, name: "Mouse", price: 30, stock: 0 },
    { id: 3, name: "Keyboard", price: 50, stock: 10 }
];

const findUserAsync = userId=>{
    return new Promise((resolve ,reject) => setTimeout(()=>{
        const user = users.find(user => user.id === userId);
        if(user && user.active){
            resolve(user);
        }
        else if (user && !user.active){
            reject(new Error(`User ${userId}  is inactive`));
        }
        else {
            reject(new Error(`User ${userId} not found`));
        }
        }
        , 1000));
}

const findProductAsync = productId => {
    return new Promise((resolve, reject) =>  setTimeout(()=>{
        const product = products.find(product => product.id === productId);
        if(product){
            resolve(product);
        }
        else {
            reject(new Error(`Product ${productId} not found`));
        }
    },1000));
}



const checkStockAsync =(product,quantity)=>{
    return new Promise((resolve,reject) => setTimeout(()=>{
        if (quantity <= 0){
        return   reject(new Error(` Invalid quantity`));
        }
        if(product.stock >= quantity){
           return  resolve(product);
        }
        else {
           return  reject(new Error(`Not enough stock`));
        }
    },1000));
}


const calculateShippingAsync = ()=>{
    return new Promise(resolve => setTimeout(()=>{
        resolve(20);
    },2000));
}


const getDiscountAsync = ()=>{
    return new Promise(resolve => setTimeout(()=>{
        resolve(0.10);
    },2000));
}



const checkout = async (userId, productId, quantity) => {
    console.time("checkout");
    try {
    const user = await findUserAsync(userId);
    const product = await findProductAsync(productId);
     await checkStockAsync(product, quantity);
    const [shipping , discount] = await Promise.all([calculateShippingAsync(),getDiscountAsync()]);
        const subtotal = product.price * quantity;
        const discountAmount = subtotal * discount;
        const total = subtotal - discountAmount + shipping;
     const order = {
                userId: user.id,
                productId: product.id,
                quantity: quantity,
                subtotal: subtotal,
            discount: discount,
            shipping: shipping,
            total: total
    };
     console.log(order);
        product.stock -= quantity;

    }
    catch(error){
        console.log(error.message);
    }
    finally {
        console.timeEnd("checkout");
    }

};


//checkout(1, 1, 2);

checkout(1, 100, 2);
//checkout(1, 2, 1);
//checkout(1, 1, -2);

