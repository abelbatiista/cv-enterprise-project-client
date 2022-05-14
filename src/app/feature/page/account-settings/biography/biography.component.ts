import { Component, OnInit } from '@angular/core';
import { BiographyService } from '../../../../core/service/user-details/biography/biography.service';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { Biography } from '../../../../core/model/user-details/biography/biography.model';
import { ODataQueryBuilder } from '../../../../core/model/filter/filter.model';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss']
})
export class BiographyComponent implements OnInit {

  public loading: boolean = true;
  public biography: Biography[] = [];
  public form: FormGroup = new FormGroup({});

  public constructor(
    private _authService: AuthService,
    private _biographyService: BiographyService
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.get();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      bio: new FormControl('', [Validators.required])
    });
  }

  private loadingSetter(value: boolean): void {
    this.loading = value;
  }

  private get(): void {
    const userDetails: UserDetails = this._authService.userDetails!;
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${userDetails.id}`;
    this._biographyService.getByQuery(oData.getQuery()).subscribe(
      (biography: Biography[]): void => {
        this.biography = biography;
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
    if(this.biography.length > 0) {
      const { bio } = this.biography[0]!;
      this.form.patchValue({
        bio
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

    const { bio }: any = this.form.value;
    let biography: Biography = { bio, userDetailsId: userDetails.id };

    if(this.biography.length === 0) {
      this._biographyService.insert(biography).subscribe(
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
      biography = { ...biography, id: this.biography[0].id }
      this._biographyService.update(biography).subscribe(
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