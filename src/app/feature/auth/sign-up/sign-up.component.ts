import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/service/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../core/model/auth/user.model';
import { ConfirmPasswordValidator } from '../../../core/validator/confirm-password/confirm-password.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

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
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      terms: new FormControl('', [Validators.required, Validators.requiredTrue])
    }, {
      validators: [
        ConfirmPasswordValidator('password', 'confirmPassword')
      ]
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

    const { name, lastname, email, password }: any = this.form.value;
    const user: User = { name, lastname, email, password };

    this._authService.signUp(user).subscribe(
      (): void => {
        this._router.navigate(['/auth', 'sign-in']);
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
