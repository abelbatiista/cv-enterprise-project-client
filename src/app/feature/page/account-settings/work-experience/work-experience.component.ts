import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { WorkExperience } from '../../../../core/model/user-details/work-experience/work-experience.model';
import { WorkExperienceService } from '../../../../core/service/user-details/work-experience/work-experience.service';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { ODataQueryBuilder } from '../../../../core/model/filter/filter.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {

  public loading: boolean = true;
  public workExperiences: WorkExperience[] = [];
  public form: FormGroup = new FormGroup({});

  public constructor(
    private _authService: AuthService,
    private _workExperienceService: WorkExperienceService
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.get();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      companyName: new FormControl('', [Validators.required]),
      jobTitle: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  private loadingSetter(value: boolean): void {
    this.loading = value;
  }

  private get(): void {
    const userDetails: UserDetails = this._authService.userDetails!;
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${userDetails.id}`;
    this._workExperienceService.getByQuery(oData.getQuery()).subscribe(
      (workExperiences: WorkExperience[]): void => {
        this.workExperiences = workExperiences;
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

    const { companyName, jobTitle, location, startDate, endDate, description }: any = this.form.value;
    const workExperience: WorkExperience = { companyName, jobTitle, location, startDate, endDate, description, userDetailsId: userDetails.id };

    this._workExperienceService.insert(workExperience).subscribe(
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

  public edit(workExperience: WorkExperience): void {
    workExperience = { ...workExperience, userDetails: undefined };
    this._workExperienceService.update(workExperience).subscribe(
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

  public delete(workExperience: WorkExperience): void {
    this._workExperienceService.delete(workExperience.id!).subscribe(
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
