import { AuditableEntity } from "../base/auditable-entity.model";

export interface Enterprise extends AuditableEntity {
    title: string;
}