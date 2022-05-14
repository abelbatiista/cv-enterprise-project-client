import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { EducationService } from '../../../../core/service/user-details/education/education.service';
import { Education } from '../../../../core/model/user-details/education/education.model';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { ODataQueryBuilder } from '../../../../core/model/filter/filter.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  public loading: boolean = true;
  public educations: Education[] = [];
  public form: FormGroup = new FormGroup({});

  public constructor(
    private _authService: AuthService,
    private _educationService: EducationService
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.get();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      institutionName: new FormControl('', [Validators .required]),
      startDate: new FormControl('', [Validators .required]),
      endDate: new FormControl('', [Validators .required]),
      description: new FormControl('', [Validators .required])
    });
  }

  private loadingSetter(value: boolean): void {
    this.loading = value;
  }

  private get(): void {
    const userDetails: UserDetails = this._authService.userDetails!;
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${userDetails.id}`;
    this._educationService.getByQuery(oData.getQuery()).subscribe(
      (educations: Education[]): void => {
        this.educations = educations;
      },
      (): void => {
        return;
      },
      (): void => {
        return;
      }
    );
  }

  public submit(): void {

    this.loadingSetter(true);

    if(this.form.invalid) {
      this.form.markAllAsTouched();
      this.loadingSetter(false);
      return;
    }

    const userDetails: UserDetails = this._authService.userDetails!;

    const { institutionName, startDate, endDate, description }: any = this.form.value;
    const education: Education = { institutionName, startDate, endDate, description, userDetailsId: userDetails.id };

    this._educationService.insert(education).subscribe(
      (): void => {
        return;
      }, 
      (): void => { 
        return;
      },
      (): void => {
        this.get();
        this.form.reset();
        this.loadingSetter(false);
      }
    );

  }

  public edit(education: Education): void {
    education = { ...education, userDetails: undefined };
    this._educationService.update(education).subscribe(
      (): void => {
        return;
      },
      (): void => {
        return;
      },
      (): void => {
        this.get();
      }
    );
  }

  public delete(education: Education): void {
    this._educationService.delete(education.id!).subscribe(
      (): void => {
        return;
      },
      (): void => {
        return;
      },
      (): void => {
        this.get();
      }
    );
  }

  public discard(): void {
    this.get();
    this.form.reset();
  }

}
