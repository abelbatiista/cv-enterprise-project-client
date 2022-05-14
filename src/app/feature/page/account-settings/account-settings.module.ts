import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  BiographyComponent, ContactComponent, EducationComponent,
  GeneralInformationComponent, SkillsComponent, SocialComponent,
  WorkExperienceComponent, WorkPlataformComponent, AccountSettingsComponent,
  ProfilePictureComponent
} from './account-settings.index';

@NgModule({
  declarations: [
    BiographyComponent,
    ContactComponent,
    EducationComponent,
    GeneralInformationComponent,
    SkillsComponent,
    SocialComponent,
    WorkExperienceComponent,
    WorkPlataformComponent,
    AccountSettingsComponent,
    ProfilePictureComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AccountSettingsComponent
  ]
})
export class AccountSettingsModule { }
