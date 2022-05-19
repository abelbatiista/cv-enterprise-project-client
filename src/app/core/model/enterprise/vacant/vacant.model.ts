import { AuditableEntity } from "../../base/auditable-entity.model";
import { Enterprise } from '../enterprise.model';

export interface Vacant extends AuditableEntity {
    companyName?: string;
    title?: string;
    description?: string;
    enterpriseId?: number;
    enterprise?: Enterprise;
}