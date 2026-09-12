// ==============================
// Basic Types
// ==============================

const productName: string = "Laptop";
const price: number = 800;
const stock: number = 5;
const available: boolean = true;

const prices: number[] = [100, 200, 300];


// ==============================
// Functions
// ==============================

const calculateTotal = (
    price: number,
    quantity: number
): number => {
    return price * quantity;
};

const isAvailable = (stock: number): boolean => {
    return stock > 0;
};

const printProduct = (productName: string): void => {
    console.log(productName);
};

const createProduct = (
    productName: string,
    price: number,
    stock: number = 0
): Product => {
    return {
        id: 1,
        name: productName,
        price,
        stock,
        available: stock > 0,
    };
};


// ==============================
// Union Types + Type Narrowing
// ==============================

const printUserId = (id: number | string): void => {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id * 2);
    }
};

type ProductStatus =
    | "AVAILABLE"
    | "OUT_OF_STOCK";

const getProductStatus = (
    stock: number
): ProductStatus => {
    return stock > 0
        ? "AVAILABLE"
        : "OUT_OF_STOCK";
};


// ==============================
// Unknown
// ==============================

const printValue = (value: unknown): void => {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    } else if (typeof value === "number") {
        console.log(value * 10);
    } else {
        console.log("Unknown value");
    }
};


// ==============================
// Interfaces + Types
// ==============================

interface Product {
    readonly id: number;
    name: string;
    price: number;
    stock: number;
    available: boolean;
}

interface CustomerSummary {
    readonly id: number;
    name: string;
}

interface Customer {
    readonly id: number;
    name: string;
    email: string;
    phone?: string;
    active: boolean;
}

type OrderStatus =
    | "PENDING"
    | "PAID"
    | "CANCELLED";

interface Order {
    readonly id: number;
    customer: CustomerSummary;
    total: number;
    status: OrderStatus;
}


// ==============================
// Interface Examples
// ==============================

const customer: Customer = {
    id: 1,
    name: "Ahmad",
    email: "ahmad@gmail.com",
    active: true,
};

const order: Order = {
    id: 1,
    customer: {
        id: 1,
        name: "Ahmad",
    },
    total: 500,
    status: "PENDING",
};

const orders: Order[] = [
    {
        id: 1,
        customer: {
            id: 1,
            name: "Ahmad",
        },
        total: 500,
        status: "PENDING",
    },
    {
        id: 2,
        customer: {
            id: 2,
            name: "Saad Aldin",
        },
        total: 5000,
        status: "PAID",
    },
];


// ==============================
// Generics
// ==============================

const getFirst = <T>(
    items: T[]
): T | undefined => {
    return items[0];
};

const firstNumber = getFirst([10, 20, 30]);
const firstName = getFirst(["Omar", "Ali"]);


// ==============================
// Generic API Response
// ==============================

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

const response: ApiResponse<Product> = {
    success: true,
    data: {
        id: 1,
        name: "Laptop",
        price: 1000,
        stock: 5,
        available: true,
    },
};


// ==============================
// Generic Constraints
// ==============================

const findById = <T extends { id: number }>(
    items: T[],
    id: number
): T | undefined => {
    return items.find(
        (item) => item.id === id
    );
};


// ==============================
// Tests
// ==============================

console.log(calculateTotal(800, 2));
console.log(isAvailable(5));

printUserId("abc");
printUserId(10);

console.log(getProductStatus(5));
console.log(getProductStatus(0));

printValue("hello");
printValue(5);
printValue(true);

console.log(customer);
console.log(order);
console.log(orders);

console.log(firstNumber);
console.log(firstName);

console.log(response);
console.log(findById(orders, 1));








