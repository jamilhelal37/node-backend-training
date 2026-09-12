class Product {
    constructor(
        public readonly id: number,
        public name: string,
        public price: number,
        private stock: number
    ) {}

    getStock(): number {
        return this.stock;
    }

    isAvailable(): boolean {
        return this.stock > 0;
    }

    reduceStock(quantity: number): void {
        if (quantity <= 0) {
            throw new Error("The quantity must be greater than 0");
        }

        if (this.stock < quantity) {
            throw new Error("Not enough stock");
        }

        this.stock -= quantity;
    }
}

const product = new Product(
    1,
    "Laptop",
    800,
    5
);

console.log(product.getStock());
console.log(product.isAvailable());

product.reduceStock(2);

console.log(product.getStock());







interface ProductRepository {
    findById(id: number): Product | undefined;
    save(product: Product): void;
}


class InMemoryProductRepository implements ProductRepository {
    private products: Product[] = [];
    findById(id: number): Product | undefined {
        return this.products.find((product) => product.id === id);
    }
    save(product: Product): void {
        this.products.push(product);
    }
}
const repository = new InMemoryProductRepository();

repository.save(
    new Product(
        1,
        "Laptop",
        800,
        5
    )
);

console.log(repository.findById(1));


/*
abstract class User {
    constructor(public readonly id: number, public name: string)
    {}
abstract getRole(): string
    printInfo(): void {
        console.log(`id=${this.id}, name=${this.name},role=${this.getRole()}`);
    }
}


class Admin extends User{
    getRole(): string {
        return "Admin";
    }
}

class CustomerUser extends User{
    getRole(): string {
        return "Customer";
    }
}

const admin = new Admin(
    5,"asd"
);
const customer = new CustomerUser(4,"asddd");
admin.printInfo();
customer.printInfo();

*/

enum Role {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    VENDOR = "VENDOR",
}

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}

type CreateUserDto = Omit<User, "id">;

type UpdateUserDto = Partial<CreateUserDto>;

type UserResponse = Omit<User, "password">;

const createUserData: CreateUserDto = {
    name: "Ahmad",
    email: "ahmad@example.com",
    password: "12345678",
    role: Role.ADMIN,
};

const updateUserData: UpdateUserDto = {
    name: "Ahmad Updated",
};

const userResponse: UserResponse = {
    id: 1,
    name: "Ahmad",
    email: "ahmad@example.com",
    role: Role.ADMIN,
};