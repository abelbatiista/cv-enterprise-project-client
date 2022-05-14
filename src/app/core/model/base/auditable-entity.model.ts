import { BaseEntity } from "./base-entity.model";
import { CreatebleEntity } from "./createble-entity.model";
import { UpdatableEntity } from "./updatable-entity.model";
import { DeletableEntity } from './deletable-entity.model';

export interface AuditableEntity extends BaseEntity, CreatebleEntity, UpdatableEntity, DeletableEntity { }