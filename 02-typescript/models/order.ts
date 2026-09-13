export type OrderStatus =
    | "PENDING"
    | "PAID"
    | "CANCELLED";



export interface Order {
    readonly id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    total: number;
    status: OrderStatus;
}