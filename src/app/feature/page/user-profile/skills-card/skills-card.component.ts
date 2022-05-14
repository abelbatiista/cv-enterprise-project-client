import { Component, OnInit } from '@angular/core';
import { Skills } from '../../../../core/model/user-details/skills/skills.model';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { SkillsService } from '../../../../core/service/user-details/skills/skills.service';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { ODataQueryBuilder } from '../../../../core/model/filter/filter.model';

@Component({
  selector: 'app-skills-card',
  templateUrl: './skills-card.component.html',
  styleUrls: ['./skills-card.component.scss']
})
export class SkillsCardComponent implements OnInit {

  public skills: Skills[] = [];

  public constructor(
    private _authService: AuthService,
    private _skillsService: SkillsService
  ) { }

  public ngOnInit(): void {
    this.get();
  }

  private get(): void {
    const userDetails: UserDetails = this._authService.userDetails!;
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${userDetails.id}`;
    this._skillsService.getByQuery(oData.getQuery()).subscribe(
      (skills: Skills[]): void => {
        this.skills = skills;
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
