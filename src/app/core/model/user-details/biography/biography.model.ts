import { AuditableEntity } from "../../base/auditable-entity.model";
import { UserDetails } from "../user-details.model";

export interface Biography extends AuditableEntity {
    bio?: string;
    userDetailsId?: number;
    userDetails?: UserDetails
}