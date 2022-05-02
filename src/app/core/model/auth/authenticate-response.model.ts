import { User } from "./user.model";

export interface AuthenticateResponse {
    user: User;
    token: string;
    error: string;
}