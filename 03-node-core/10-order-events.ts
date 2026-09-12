import { EventEmitter } from "node:events";

const emitter = new EventEmitter();

emitter.on(
    "orderCreated",
    (orderId: number) => {
        console.log(
            `Notification sent for order ${orderId}`
        );
    }
);

emitter.on(
    "orderCreated",
    (orderId: number) => {
        console.log(
            `Audit log saved for order ${orderId}`
        );
    }
);

const createOrder = (
    orderId: number
): void => {
    console.log(
        `Order ${orderId} created`
    );

    emitter.emit(
        "orderCreated",
        orderId
    );
};

createOrder(101);
createOrder(1500);