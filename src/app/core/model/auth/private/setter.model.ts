import { User } from "../user.model";
import { ApplicationIdentityUser } from '../application-identity-user.model';
import { UserDetails } from "../../user-details/user-details.model";

export interface Setter {
  token?: string;
  user?: User;
  applicationIdentityUser?: ApplicationIdentityUser;
  userDetails?: UserDetails;
  imageUrl?: string;
}