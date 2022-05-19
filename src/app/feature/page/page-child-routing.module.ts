import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
  DashboardComponent, VacantComponent, EnterpriseComponent,
  UserComponent
} from './page.index';

import { AccountSettingsComponent } from './account-settings/account-settings.index';
import { UserProfileComponent } from './user-profile/user-profile.index';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vacant', component: VacantComponent },
  { path: 'enterprise', component: EnterpriseComponent },
  { path: 'user', component: UserComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'account-settings', component: AccountSettingsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageChildRoutingModule {}