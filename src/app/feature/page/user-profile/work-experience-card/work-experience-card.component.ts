import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { WorkExperienceService } from '../../../../core/service/user-details/work-experience/work-experience.service';
import { WorkExperience } from '../../../../core/model/user-details/work-experience/work-experience.model';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { ODataQueryBuilder } from '../../../../core/model/filter/filter.model';

@Component({
  selector: 'app-work-experience-card',
  templateUrl: './work-experience-card.component.html',
  styleUrls: ['./work-experience-card.component.scss']
})
export class WorkExperienceCardComponent implements OnInit {

  public workExperiences: WorkExperience[] = [];

  public constructor(
    private _authService: AuthService,
    private _workExperienceService: WorkExperienceService
  ) { }

  public ngOnInit(): void {
    this.get();
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

}
