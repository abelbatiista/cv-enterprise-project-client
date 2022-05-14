import { AuditableEntity } from "../../base/auditable-entity.model";
import { UserDetails } from "../user-details.model";

export interface Skills extends AuditableEntity {
    title?: string;
    percent?: number;
    userDetailsId?: number;
    userDetails?: UserDetails
}