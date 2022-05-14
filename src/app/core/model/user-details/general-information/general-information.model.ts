import { AuditableEntity } from "../../base/auditable-entity.model";
import { UserDetails } from "../user-details.model";

export interface GeneralInformation extends AuditableEntity {
    fullName?: string;
    birthDate?: Date;
    profession?: string;
    userDetailsId?: number;
    userDetails?: UserDetails
}