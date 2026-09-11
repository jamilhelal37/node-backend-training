const products = [
    { id: 1, name: "Laptop", price: 800, stock: 5 },
    { id: 2, name: "Mouse", price: 30, stock: 0 }
];

const findProductAsync =id =>{
    return new Promise((resolve, reject)  =>{
        setTimeout(()=>{
            const product = products.find((product) => product.id === id);
            if(product){
                resolve(product);
            }
            else {
                reject(new Error(`Product ${id} not found`));
            }
        },1000)
    });

};



const checkStockAsync =product =>{
    return new Promise((resolve, reject) => {
  setTimeout(()=>{
      if(product.stock > 0){
          resolve(product);
      }
      else
      {
          reject(new Error("Out of stock"));
      }
  },1000)
    });
};




findProductAsync(1)
    .then(product=> checkStockAsync(product))
    .then(product=> console.log(`product available : ${product.name}`))
    .catch(err => console.log(err.message))
    .finally(()=>console.log('finished'));


findProductAsync(2)
    .then(product=> checkStockAsync(product))
    .then(product=> console.log(`product available : ${product.name}`))
    .catch(err => console.log(err.message))
    .finally(()=>console.log('finished'));



findProductAsync(10)
    .then(product=> checkStockAsync(product))
    .then(product=> console.log(`product available : ${product.name}`))
    .catch(err => console.log(err.message))
    .finally(()=>console.log('finished'));





const run =async()=> {
try {
    const product = await findProductAsync(1);
    const available = await checkStockAsync(product);
    console.log(`product available : ${available.name}`);
}
catch(err){
    console.log(` ${err.message}`);

}
finally{console.log("finished");}

};

run();



const processProduct = async(id)=> {
    try{
        const product = await findProductAsync(id);
        const available = await checkStockAsync(product);
        console.log(`product available : ${available.name}`);
    }
    catch(err){
        console.log(` ${err.message}`);
    }
    finally{
        console.log("finished");
    }
}

processProduct(1);
processProduct(2);
processProduct(10);




const getUserAsync = () => { return new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve({ id: 1, name: "Omar" });
    },2000)
});
};

const getOrdersAsync = () => { return new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve(["Order1", "Order2"]);
    },2000)
});
};

const getNotificationsAsync = () => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(["Notification1"])
        },2000)
    });

};

const runSequential = async () => {
    console.time("sequential");
    try{
       const user = await getUserAsync();
      const orders= await getOrdersAsync();
       const notifictions = await getNotificationsAsync();
    }
    catch(err){
        console.log(err.message);
    }
    finally {
        console.log("finished sequential");
    }
    console.timeEnd("sequential");

}

const runParallel = async()=>{
    console.time("Parallel ");
    try {

        const [user, orders, notifictions] = await Promise.all([
                getUserAsync(), getOrdersAsync(), getNotificationsAsync()
            ]
        );
    }
    catch (err)
    {
        console.log(err.message);
    }
    finally{
        console.log("parallel");
    }
    console.timeEnd("Parallel ");
}

const test = async () => {
    await runSequential();
    await runParallel();
};

test();



const sendEmail = ()=>{
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve("email sent");
        },1000);
    });
}
const sendPush = ()=>{
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve("push sent");
        },2000);
    });
}
const sendSms = () =>{
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            reject(new Error("Sms"));
        },1500);
    });
}

const runsend1 = async()=>{
    try {
        const [email, push, sms] = await Promise.all([
            sendEmail(),
            sendPush(),
            sendSms()
        ]);
        console.log(email);
        console.log(push);
        console.log(sms);
    }
    catch(err){
        console.log(err.message);
    }
}



const runsend2 = async()=>{
    try {
        const [email, push, sms] = await Promise.allSettled([
            sendEmail(),
            sendPush(),
            sendSms()
        ]);
        console.log(email);
        console.log(push);
        console.log(sms);
    }
    catch(err){
        console.log(err.message);
    }
}

const test2 = async () => {
    await runsend1();
    await runsend2();
};

test2();
