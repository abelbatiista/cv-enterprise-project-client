import { Component, OnInit } from '@angular/core';
import { Vacant } from '../../../core/model/enterprise/vacant/vacant.model';
import { VacantService } from '../../../core/service/enterprise/vacant/vacant.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/service/auth/auth.service';
import { UserDetails } from '../../../core/model/user-details/user-details.model';
import { Enterprise } from '../../../core/enum/enterprise/enterprise.enum';
import { VacantUserService } from '../../../core/service/vacant-user/vacant-user.service';
import { VacantUser } from '../../../core/model/vacant-user/vacant-user.model';
import { VacantType } from '../../../core/enum/utils/vacant-type.enum';
import { SweetAlertService } from '../../../miscelaneo/service/sweet-alert/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vacant',
  templateUrl: './vacant.component.html',
  styleUrls: ['./vacant.component.scss']
})
export class VacantComponent implements OnInit {

  public loading: boolean = true;
  public vacants: Vacant[] = [];
  public form: FormGroup = new FormGroup({});
  public available: VacantType = VacantType.Available;
  public applied: VacantType = VacantType.Applied;
  public isAvailabled: boolean = true;

  public constructor(
    private _authService: AuthService,
    private _vacantService: VacantService,
    private _vacantUserService: VacantUserService,
    private _sweetAlertService: SweetAlertService
  ) { }

  public ngOnInit(): void {
    this.get(this.available);
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      companyName: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  private loadingSetter(value: boolean): void {
    this.loading = value;
  }

  private availableSetter(value: boolean): void {
    this.isAvailabled = value;
  }

  private getApplied(): void {
    this._vacantUserService.getAll().subscribe(
      (vacantUsers: VacantUser[]): void => {
        const vacantsId: number[] = [];
        const userDetails: UserDetails = this._authService.userDetails!;
        this.vacants = vacantUsers.filter((vacantUser: VacantUser): boolean => {
          if(vacantsId.includes(vacantUser.id!))
            return false;
          else if(!vacantsId.includes(vacantUser.vacant!.id!) && vacantUser.userDetailsId === userDetails.id) {
            vacantsId.push(vacantUser.vacant!.id!);
            return true;
          }
          else 
            return false;
        }).map((vacantUser: VacantUser): Vacant => {
          return vacantUser.vacant!;
        });
      },
      (): void => {
        return;
      },
      (): void => {
        return;
      }
    );
  }

  private getAvailable(): void {
    this._vacantService.getAll().subscribe(
      (vacants: Vacant[]): void => {
        this.vacants = vacants;
      },
      (): void => {
        return;
      },
      (): void => {
        return;
      }
    );
  }

  public setActiveNav(vacantType: VacantType): void {
    const availableButton: HTMLButtonElement = document.querySelector('#available-vacant')!;
    const appliedButton: HTMLButtonElement = document.querySelector('#applied-vacant')!;
    if(vacantType === VacantType.Applied) {
      appliedButton.classList.add('active');
      availableButton.classList.remove('active');
      this.availableSetter(false);
    } else if(vacantType === VacantType.Available) {
      availableButton.classList.add('active');
      appliedButton.classList.remove('active');
      this.availableSetter(true);
    } else {
      return;
    }
  }

  public get(vacantType: VacantType): void {
    this.setActiveNav(vacantType);
    if(vacantType === VacantType.Applied) {
      this.getApplied();
    } else if(vacantType === VacantType.Available) {
      this.getAvailable();
    } else {
      return;
    }
  }

  public submit(): void {

    this.loadingSetter(true);

    if(this.form.invalid) {
      this.form.markAllAsTouched();
      this.loadingSetter(false);
      return;
    }

    const { companyName, title, description }: any = this.form.value;
    const vacant: Vacant = { companyName, title, description, enterpriseId: Enterprise.MegaCV };

    this._vacantService.insert(vacant).subscribe(
      (): void => {
        return;
      }, 
      (): void => { 
        return;
      },
      (): void => {
        debugger;
        this.get(this.available);
        this.form.reset();
        this.loadingSetter(false);
      }
    );

  }

  public delete(vacant: Vacant): void {
    this._sweetAlertService.dialog(
      'Are you sure?',
      'You wont be able to revert this!',
      'warning'
      )
      .then((result: any): void => {
        if(result.isConfirmed)
        this._vacantService.delete(vacant.id!).subscribe(
          (): void => {
            this._sweetAlertService.centerAlert('Successfuly', 'Vacant deleted!', 'success');
            return;
          },
          (): void => {
            return;
          },
          (): void => {
            this.get(this.available);
          }
        );
        else if(result.dismiss === Swal.DismissReason.cancel)
          this._sweetAlertService.centerAlert('Cancelled', 'You have cancelled!', 'error');
        else
          return;
      });
  }

  public discard(): void {
    this.get(this.available);
    this.form.reset();
  }
  public apply(vacant: Vacant): void {

    this.loadingSetter(true);

    const userDetails: UserDetails = this._authService.userDetails!;

    const vacantUser: VacantUser = { vacantId: vacant.id!, userDetailsId: userDetails.id! };

    this._sweetAlertService.dialog(
      'Are you sure?',
      'Are you pretty sure you want to apply?',
      'warning'
      )
      .then((result: any): void => {
        if(result.isConfirmed)
        this._vacantUserService.insert(vacantUser).subscribe(
          (): void => {
            this._sweetAlertService.centerAlert('Successfuly', 'Vacant applied!', 'success');
            return;
          }, 
          (): void => { 
            return;
          },
          (): void => {
            return;
          }
        );
        else if(result.dismiss === Swal.DismissReason.cancel)
          this._sweetAlertService.centerAlert('Cancelled', 'You have cancelled!', 'error');
        else
          return;
      });

  }

}
