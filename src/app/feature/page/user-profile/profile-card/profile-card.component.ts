import { Component, OnInit } from '@angular/core';
import { GeneralInformationService } from 'src/app/core/service/user-details/general-information/general-information.service';
import { ContactService } from '../../../../core/service/user-details/contact/contact.service';
import { SocialService } from '../../../../core/service/user-details/social/social.service';
import { GeneralInformation } from '../../../../core/model/user-details/general-information/general-information.model';
import { Contact } from '../../../../core/model/user-details/contact/contact.model';
import { Social } from '../../../../core/model/user-details/social/social.model';
import { concatAll } from 'rxjs/operators';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { ODataQueryBuilder } from '../../../../core/model/filter/filter.model';
import { FileService } from '../../../../core/service/file/file.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {

  private userDetails: UserDetails = this._authService.userDetails!;
  public generalInformation: GeneralInformation[] = [];
  public contact: Contact[] = [];
  public social: Social[] = [];
  public url: string = '';

  public constructor(
    private _authService: AuthService,
    private _generalInformationService: GeneralInformationService,
    private _contactService: ContactService,
    private _socialService: SocialService,
    private _fileService: FileService
  ) { }

  public ngOnInit(): void {
    this.get();
  }

  private get(): void {
    this.getGeneralInformation();
    this.getContact();
    this.getSocial();
    this.downloadFile();
  }

  private getGeneralInformation(): void {
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${this.userDetails.id}`;
    this._generalInformationService.getByQuery(oData.getQuery()).subscribe(
      (generalInformation: GeneralInformation[]): void => {
        this.generalInformation = generalInformation;
      },
      (): void => {
        return;
      },
      (): void => {
        return;
      }
    );
  }

  private getContact(): void {
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${this.userDetails.id}`;
    this._contactService.getByQuery(oData.getQuery()).subscribe(
      (contact: Contact[]): void => {
        this.contact = contact;
      },
      (): void => {
        return;
      },
      (): void => {
        return;
      }
    );
  }

  private getSocial(): void {
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${this.userDetails.id}`;
    this._socialService.getByQuery(oData.getQuery()).subscribe(
      (social: Social[]): void => {
        this.social = social;
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
    this._fileService.download(this.userDetails).subscribe(
      (url: string): void => {
        this.url = url;
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
