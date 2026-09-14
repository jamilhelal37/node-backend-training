import type {
    User
} from "../models/user.js";

export type UserResponseDto =
    Omit<User, "password">;