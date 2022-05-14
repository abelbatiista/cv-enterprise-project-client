import { AuditableEntity } from "../../base/auditable-entity.model";
import { UserDetails } from "../user-details.model";

export interface WorkExperience extends AuditableEntity {
    companyName?: string;
    jobTitle?: string;
    location?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
    userDetailsId?: number;
    userDetails?: UserDetails
}