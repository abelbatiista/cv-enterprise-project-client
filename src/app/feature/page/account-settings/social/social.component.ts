import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { SocialService } from '../../../../core/service/user-details/social/social.service';
import { Social } from 'src/app/core/model/user-details/social/social.model';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { ODataQueryBuilder } from '../../../../core/model/filter/filter.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  public loading: boolean = true;
  private social: Social[] = [];
  public form: FormGroup = new FormGroup({});

  public constructor(
    private _authService: AuthService,
    private _socialService: SocialService
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.get();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      linkedIn: new FormControl('', [Validators .required]),
      twitter: new FormControl('', [Validators .required]),
      gitHub: new FormControl('', [Validators .required]),
      facebook: new FormControl('', [Validators .required])
    });
  }

  private loadingSetter(value: boolean): void {
    this.loading = value;
  }

  private get(): void {
    const userDetails: UserDetails = this._authService.userDetails!;
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${userDetails.id}`;
    this._socialService.getByQuery(oData.getQuery()).subscribe(
      (social: Social[]): void => {
        this.social = social;
        this.fillForm();
      },
      (): void => {
        return;
      },
      (): void => {
        return;
      }
    );
  }

  private fillForm(): void {
    if(this.social.length > 0) {
      const { linkedIn, twitter, gitHub, facebook } = this.social[0]!;
      this.form.patchValue({
        linkedIn,
        twitter,
        gitHub,
        facebook
      });
    }
  }

  public submit(): void {

    this.loadingSetter(true);

    if(this.form.invalid) {
      this.form.markAllAsTouched();
      this.loadingSetter(false);
      return;
    }
    
    const userDetails: UserDetails = this._authService.userDetails!;

    const { linkedIn, twitter, gitHub, facebook }: any = this.form.value;
    let social: Social = { linkedIn, twitter, gitHub, facebook, userDetailsId: userDetails.id };

    if(this.social.length === 0) {
      this._socialService.insert(social).subscribe(
        (): void => {
          return;
        }, 
        (): void => { 
          return;
        },
        (): void => {
          this.loadingSetter(false);
        }
      );
    }
    else {
      social = { ...social, id: this.social[0].id }
      this._socialService.update(social).subscribe(
        (): void => {
          return;
        }, 
        (): void => { 
          return;
        },
        (): void => {
          this.loadingSetter(false);
        }
      );
    }

  }

}
