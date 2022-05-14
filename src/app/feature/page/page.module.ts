import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';

import { SharedModule } from '../../shared/shared.module';

import { AccountSettingsModule } from './account-settings/account-settings.module';
import { UserProfileModule } from './user-profile/user-profile.module';

import { 
  PageComponent, DashboardComponent
} from './page.index';

@NgModule({
  declarations: [
    PageComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule,
    AccountSettingsModule,
    UserProfileModule
  ],
  exports: [
    PageComponent
  ]
})
export class PageModule { }
