import { AuditableEntity } from "../../base/auditable-entity.model";
import { UserDetails } from "../user-details.model";

export interface Contact extends AuditableEntity {
    country?: string;
    adress?: string;
    location?: string;
    phone?: string;
    email?: string;
    website?: string;
    userDetailsId?: number;
    userDetails?: UserDetails
}