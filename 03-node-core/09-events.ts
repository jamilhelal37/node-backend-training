import { EventEmitter } from "node:events";

const emitter = new EventEmitter();
emitter.on(
    "productCreated",
    (productName: string) => {
        console.log(
            `Notification sent for ${productName}`
        );
    }
);

emitter.on(
    "productCreated",
    (productName: string) => {
        console.log(
            `Audit log saved for ${productName}`
        );
    }
);

emitter.emit(
    "productCreated",
    "Mouse"
);