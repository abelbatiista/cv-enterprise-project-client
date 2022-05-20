import { Component, OnInit } from '@angular/core';
import { ApplicationIdentityUser } from '../../../core/model/auth/application-identity-user.model';
import { AuthService } from '../../../core/service/auth/auth.service';
import { UserDetailsService } from '../../../core/service/user-details/user-details.service';
import { UserDetails } from '../../../core/model/user-details/user-details.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users: ApplicationIdentityUser[] = [];
  public userDetails: UserDetails | undefined;

  public constructor(
    private _authService: AuthService,
    private _userDetailsService: UserDetailsService
  ) { }

  public ngOnInit(): void {
    this.get();
  }

  private get(): void {
    this._authService.users().subscribe({
      next: (applicationIdentityUsers: ApplicationIdentityUser[]): void => {
        this.users = applicationIdentityUsers;
      },
      error: (): void => {
        return;
      },
      complete: (): void => {
        return;
      }
    });
  }

  public details(applicationIdentityUser: ApplicationIdentityUser): void {
    const button: HTMLButtonElement = document.querySelector('#userDetailsButton')!;
    this._userDetailsService.findByApplicationIdentityUserId(applicationIdentityUser.id!).subscribe({
      next: (userDetails: UserDetails): void => {
        this.userDetails = userDetails;
        button.click();
      },
      error: (): void => {
        return;
      },
      complete: (): void => {
        return;
      }
    });
  }

}
