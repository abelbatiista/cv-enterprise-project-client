import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/service/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../core/model/auth/user.model';
import { AuthenticateResponse } from '../../../core/model/auth/authenticate-response.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public form: FormGroup = new FormGroup({});
  public loading: boolean = false;

  public constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
  }

  private loadingSetter(value: boolean): void {
    this.loading = value;
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public touched(control: string, error: string): boolean{
    return this.form.get(control)!.hasError(error) &&  this.form.get(control)!.touched;
  }

  public dirty(control: string, error: string): boolean{
    return this.form.get(control)!.hasError(error) &&  this.form.get(control)!.dirty;
  }

  public invalid(control: string): boolean {
    return this.form.get(control)!.invalid && this.form.get(control)!.touched;
  }

  public submit(): void {

    this.loadingSetter(true);

    if(this.form.invalid) {
      this.form.markAllAsTouched();
      this.loadingSetter(false);
      return;
    }

    const { email, password }: any = this.form.value;
    const user: User = { email, password };

    this._authService.signIn(user).subscribe(
      (): void => {
        this._router.navigate(['/page']);
      }, 
      (): void => { 
        return;
      },
      (): void => {
        this.loadingSetter(false);
        this.form.reset();
      }
    );

  }

}
