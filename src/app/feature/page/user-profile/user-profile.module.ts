import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  UserProfileComponent, ProfileCardComponent, EducationCardComponent,
  WorkExperienceCardComponent, SkillsCardComponent, BioCardComponent
} from './user-profile.index';

@NgModule({
  declarations: [
    UserProfileComponent,
    ProfileCardComponent,
    EducationCardComponent,
    WorkExperienceCardComponent,
    SkillsCardComponent,
    BioCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    UserProfileComponent
  ]
})
export class UserProfileModule { }
