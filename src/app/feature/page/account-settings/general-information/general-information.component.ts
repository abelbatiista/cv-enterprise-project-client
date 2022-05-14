import { Component, OnInit } from '@angular/core';
import { GeneralInformationService } from '../../../../core/service/user-details/general-information/general-information.service';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { GeneralInformation } from '../../../../core/model/user-details/general-information/general-information.model';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { ODataQueryBuilder } from '../../../../core/model/filter/filter.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {

  public loading: boolean = true;
  public generalInformation: GeneralInformation[] = [];
  public form: FormGroup = new FormGroup({});

  public constructor(
    private _authService: AuthService,
    private _generalInformationService: GeneralInformationService
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.get();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      fullName: new FormControl('', [Validators .required]),
      birthDate: new FormControl('', [Validators .required]),
      profession: new FormControl('', [Validators .required])
    });
  }

  private loadingSetter(value: boolean): void {
    this.loading = value;
  }

  private get(): void {
    const userDetails: UserDetails = this._authService.userDetails!;
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${userDetails.id}`;
    this._generalInformationService.getByQuery(oData.getQuery()).subscribe(
      (generalInformation: GeneralInformation[]): void => {
        this.generalInformation = generalInformation;
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
    if(this.generalInformation.length > 0) {
      const { fullName, birthDate, profession } = this.generalInformation[0]!;
      this.form.patchValue({
        fullName,
        birthDate: birthDate!.toLocaleString('sv-SE').split('T')[0],
        profession
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

    const { fullName, birthDate, profession }: any = this.form.value;
    let generalInformation: GeneralInformation = { fullName, birthDate, profession, userDetailsId: userDetails.id };

    if(this.generalInformation.length === 0) {
      this._generalInformationService.insert(generalInformation).subscribe(
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
      generalInformation = { ...generalInformation, id: this.generalInformation[0].id }
      this._generalInformationService.update(generalInformation).subscribe(
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