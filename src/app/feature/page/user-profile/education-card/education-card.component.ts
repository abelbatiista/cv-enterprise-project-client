import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { EducationService } from '../../../../core/service/user-details/education/education.service';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { ODataQueryBuilder } from '../../../../core/model/filter/filter.model';
import { Education } from '../../../../core/model/user-details/education/education.model';

@Component({
  selector: 'app-education-card',
  templateUrl: './education-card.component.html',
  styleUrls: ['./education-card.component.scss']
})
export class EducationCardComponent implements OnInit {

  public educations: Education[] = [];

  public constructor(
    private _authService: AuthService,
    private _educationService: EducationService
  ) { }

  public ngOnInit(): void {
    this.get();
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

}
