import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/model/auth/user.model';
import { AuthService } from '../../../core/service/auth/auth.service';
import { Router } from '@angular/router';
import { FileService } from '../../../core/service/file/file.service';
import { UserDetails } from '../../../core/model/user-details/user-details.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user: User | undefined;
  public url: string = '';
  public title: string = '';

  public constructor(
    private _authService: AuthService,
    private _fileService: FileService,
    private _router: Router
  ) {
    this.title = 'MegaCV';
  }

  public ngOnInit(): void {
    this.user = this._authService.user;
    this.downloadFile();
  }

  private downloadFile(): void {
    const userDetails: UserDetails = this._authService.userDetails!;
    this._fileService.download(userDetails).subscribe(
      (url: string): void => {
        this.url = url;
      },
      (): void => {
        return;
      },
      (): void => {
        return;
      }
    );
  }

  public signOut(): void {
    this._authService.signOut().subscribe((): void => {
      this._router.navigate(['/auth', 'sign-in']);
    }, (): void => {
      return;
    }, (): void => {
      return;
    });
  }

}
