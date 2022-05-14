import { AuditableEntity } from "../../base/auditable-entity.model";
import { UserDetails } from "../user-details.model";

export interface WorkPlataform extends AuditableEntity {
    title?: string;
    description?: string;
    userDetailsId?: number;
    userDetails?: UserDetails
}