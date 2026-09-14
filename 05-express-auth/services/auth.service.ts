import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    env
} from "../config/env.js";
import type {
    User
} from "../models/user.js";

import {
    Role
} from "../models/user.js";

import type {
    RegisterDto
} from "../dto/register.dto.js";

import type {
    LoginDto
} from "../dto/login.dto.js";

import type {
    UserResponseDto
} from "../dto/user-response.dto.js";

import type {
    AuthResponseDto
} from "../dto/auth-response.dto.js";

import {
    AppError
} from "../errors/app-error.js";

export class AuthService {
    private users: User[] = [];

    async register(
        data: RegisterDto
    ): Promise<UserResponseDto> {

        if (
            typeof data.name !== "string" ||
            !data.name.trim()
        ) {
            throw new AppError(
                "Invalid name",
                400
            );
        }

        if (
            typeof data.email !== "string" ||
            !data.email.trim() ||
            !data.email.includes("@")
        ) {
            throw new AppError(
                "Invalid email",
                400
            );
        }


        if (
            typeof data.password !== "string" ||
            data.password.length < 6
        ) {
            throw new AppError(
                "Password must be at least 6 characters",
                400
            );
        }

        const normalizedEmail =
            data.email
                .trim()
                .toLowerCase();


        const existingUser =
            this.users.find(
                user =>
                    user.email === normalizedEmail
            );

        if (existingUser) {
            throw new AppError(
                "Email already exists",
                400
            );
        }


        const hashedPassword =
            await bcrypt.hash(
                data.password,
                10
            );

        const newUser: User = {
            id:
                this.users.length > 0
                    ? Math.max(
                    ...this.users.map(
                        user => user.id
                    )
                ) + 1
                    : 1,

            name:
                data.name.trim(),

            email:
            normalizedEmail,

            password:
            hashedPassword,

            role:
            Role.CUSTOMER,
        };

        this.users.push(
            newUser
        );


        const {
            password,
            ...userWithoutPassword
        } = newUser;

        return userWithoutPassword;
    }

    async login(
        data: LoginDto
    ): Promise<AuthResponseDto> {


        if (
            typeof data.email !== "string" ||
            !data.email.trim()
        ) {
            throw new AppError(
                "Invalid email",
                400
            );
        }


        if (
            typeof data.password !== "string" ||
            !data.password
        ) {
            throw new AppError(
                "Invalid password",
                400
            );
        }

        const normalizedEmail =
            data.email
                .trim()
                .toLowerCase();


        const user =
            this.users.find(
                user =>
                    user.email === normalizedEmail
            );

        if (!user) {
            throw new AppError(
                "Invalid email or password",
                401
            );
        }


        const passwordMatches =
            await bcrypt.compare(
                data.password,
                user.password
            );

        if (!passwordMatches) {
            throw new AppError(
                "Invalid email or password",
                401
            );
        }


        const {
            password,
            ...userWithoutPassword
        } = user;



        const accessToken =
            jwt.sign(
                {
                    sub: user.id,
                    email: user.email,
                    role: user.role,
                },
                env.jwtSecret,
                {
                    expiresIn: "1h",
                }
            );
        return {
            accessToken,
            user: userWithoutPassword,
        };
    }
}