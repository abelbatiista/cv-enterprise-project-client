import { UserDetails } from "../user-details/user-details.model";
import { ApplicationIdentityUser } from "./application-identity-user.model";
import { User } from "./user.model";

export interface AuthenticateResponse {
    user?: User;
    applicationIdentityUser?: ApplicationIdentityUser;
    userDetails?: UserDetails;
    token?: string;
    error?: string;
}