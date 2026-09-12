import fs from "node:fs";

const stream = fs.createReadStream(
    "products.txt",
    {
        encoding: "utf-8",
    }
);

stream.on(
    "data",
    (chunk) => {
        console.log("Chunk:");
        console.log(chunk);
    }
);

stream.on(
    "end",
    () => {
        console.log("Finished reading file");
    }
);

stream.on(
    "error",
    (error) => {
        console.error("Error:", error.message);
    }
);