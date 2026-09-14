import {
    AppError
} from "../errors/app-error.js";

export const parseId = (
    value:
        | string
        | string[]
        | undefined
): number => {

    if (
        value === undefined ||
        Array.isArray(value)
    ) {
        throw new AppError(
            "Invalid id",
            400
        );
    }

    const id = Number(value);

    if (
        !Number.isInteger(id) ||
        id <= 0
    ) {
        throw new AppError(
            "Invalid id",
            400
        );
    }

    return id;
};