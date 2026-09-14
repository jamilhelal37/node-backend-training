import type {
    UserResponseDto
} from "./user-response.dto.js";

export interface AuthResponseDto {
    accessToken: string;
    user: UserResponseDto;
}