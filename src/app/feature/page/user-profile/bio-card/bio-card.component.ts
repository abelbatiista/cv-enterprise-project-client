import { Component, OnInit } from '@angular/core';
import { Biography } from '../../../../core/model/user-details/biography/biography.model';
import { WorkPlataform } from '../../../../core/model/user-details/work-plataform/work-plataform.model';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { BiographyService } from '../../../../core/service/user-details/biography/biography.service';
import { WorkPlataformService } from '../../../../core/service/user-details/work-plataform/work-plataform.service';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { ODataQueryBuilder } from '../../../../core/model/filter/filter.model';

@Component({
  selector: 'app-bio-card',
  templateUrl: './bio-card.component.html',
  styleUrls: ['./bio-card.component.scss']
})
export class BioCardComponent implements OnInit {

  public userDetails: UserDetails = this._authService.userDetails!;
  public biography: Biography[] = [];
  public workPlataforms: WorkPlataform[] = [];

  public constructor(
    private _authService: AuthService,
    private _biographyService: BiographyService,
    private _workPlataformService: WorkPlataformService
  ) { }

  public ngOnInit(): void {
    this.get();
  }

  private get(): void {
    this.getBiography();
    this.getWorkPlataforms();
  }

  private getBiography(): void {
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${this.userDetails.id}`;
    this._biographyService.getByQuery(oData.getQuery()).subscribe(
      (biography: Biography[]): void => {
        this.biography = biography;
      },
      (): void => {
        return;
      },
      (): void => {
        return;
      }
    );
  }

  private getWorkPlataforms(): void {
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${this.userDetails.id}`;
    this._workPlataformService.getByQuery(oData.getQuery()).subscribe(
      (workPlataforms: WorkPlataform[]): void => {
        this.workPlataforms = workPlataforms;
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
