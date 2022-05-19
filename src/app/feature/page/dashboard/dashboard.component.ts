import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth/auth.service';
import { FileService } from '../../../core/service/file/file.service';
import { UserDetails } from '../../../core/model/user-details/user-details.model';
import { GeneralInformationService } from '../../../core/service/user-details/general-information/general-information.service';
import { ODataQueryBuilder } from '../../../core/model/filter/filter.model';
import { GeneralInformation } from '../../../core/model/user-details/general-information/general-information.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private userDetails: UserDetails | undefined;
  private generalInformation: GeneralInformation[] = [];
  public userName: string = '';
  public userImage: string = '';
  public todayDate: Date = new Date();

  public constructor(
    private _authService: AuthService,
    private _generalInformationService: GeneralInformationService,
    private _fileService: FileService
  ) { }

  public ngOnInit(): void {
    this.getUser();
    this.getGeneralInformation();
    this.downloadFile();
  }

  private getUser(): void {
    this.userDetails = this._authService.userDetails!;
  }

  private getGeneralInformation(): void {
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${this.userDetails!.id}`;
    this._generalInformationService.getByQuery(oData.getQuery()).subscribe(
      (generalInformation: GeneralInformation[]): void => {
        this.generalInformation = generalInformation;
        this.userName = this.generalInformation[0].fullName!;
      },
      (): void => {
        return;
      },
      (): void => {
        return;
      }
    );
  }

  private downloadFile(): void {
    this._fileService.download(this.userDetails!).subscribe(
      (url: string): void => {
        this.userImage = url;
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
