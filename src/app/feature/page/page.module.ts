import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

import { AccountSettingsModule } from './account-settings/account-settings.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ReactiveFormsModule } from '@angular/forms';

import { 
  PageComponent, DashboardComponent, VacantComponent,
  UserComponent, EnterpriseComponent
} from './page.index';

@NgModule({
  declarations: [
    PageComponent,
    DashboardComponent,
    VacantComponent,
    UserComponent,
    EnterpriseComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageRoutingModule,
    CoreModule,
    SharedModule,
    AccountSettingsModule,
    UserProfileModule
  ],
  exports: [
    PageComponent
  ]
})
export class PageModule { }
