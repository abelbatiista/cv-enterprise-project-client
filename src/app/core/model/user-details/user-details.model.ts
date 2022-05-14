import { AuditableEntity } from "../base/auditable-entity.model";
import { Biography } from "./biography/biography.model";
import { Contact } from "./contact/contact.model";
import { Education } from "./education/education.model";
import { GeneralInformation } from "./general-information/general-information.model";
import { Skills } from "./skills/skills.model";
import { Social } from "./social/social.model";
import { WorkExperience } from "./work-experience/work-experience.model";
import { WorkPlataform } from "./work-plataform/work-plataform.model";
import { ApplicationIdentityUser } from '../auth/application-identity-user.model';

export interface UserDetails extends AuditableEntity {
    generalInformation: GeneralInformation;
    biography: Biography;
    workPlataforms: WorkPlataform[];
    contact: Contact;
    social: Social;
    skills: Skills[];
    educations: Education[];
    workExperiences: WorkExperience[];
    applicationIdentityUserId: number;
    applicationIdentityUser: ApplicationIdentityUser
}