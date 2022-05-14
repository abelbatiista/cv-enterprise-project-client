import { AuditableEntity } from "../../base/auditable-entity.model";
import { UserDetails } from "../user-details.model";

export interface Education extends AuditableEntity {
    institutionName?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    userDetailsId?: number;
    userDetails?: UserDetails
}