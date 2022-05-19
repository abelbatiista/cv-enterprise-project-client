import { AuditableEntity } from "../base/auditable-entity.model";
import { UserDetails } from "../user-details/user-details.model";
import { Vacant } from '../enterprise/vacant/vacant.model';

export interface VacantUser extends AuditableEntity {
    userDetailsId?: number;
    userDetails?: UserDetails;
    vacantId?: number;
    vacant?: Vacant;
}