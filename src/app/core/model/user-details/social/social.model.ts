import { AuditableEntity } from "../../base/auditable-entity.model";
import { UserDetails } from "../user-details.model";

export interface Social extends AuditableEntity {
    linkedIn?: string;
    twitter?: string;
    gitHub?: string;
    facebook?: string;
    userDetailsId?: number;
    userDetails?: UserDetails
}