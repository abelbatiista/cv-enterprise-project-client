import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  public ngOnInit(): void {
    this.authControl();
  }

  private authControl(): void {
    if(this._authService.token)
      this._router.navigate(['/page']);
  }

}
