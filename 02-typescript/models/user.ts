export enum Role {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    VENDOR = "VENDOR",
}

export interface User {
    readonly id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}