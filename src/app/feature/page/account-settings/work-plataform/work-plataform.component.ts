import { Component, OnInit } from '@angular/core';
import { WorkPlataformService } from '../../../../core/service/user-details/work-plataform/work-plataform.service';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { WorkPlataform } from 'src/app/core/model/user-details/work-plataform/work-plataform.model';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { ODataQueryBuilder } from '../../../../core/model/filter/filter.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-plataform',
  templateUrl: './work-plataform.component.html',
  styleUrls: ['./work-plataform.component.scss']
})
export class WorkPlataformComponent implements OnInit {

  public loading: boolean = true;
  public workPlataforms: WorkPlataform[] = [];
  public form: FormGroup = new FormGroup({});

  public constructor(
    private _authService: AuthService,
    private _workPlataformService: WorkPlataformService
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.get();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  private loadingSetter(value: boolean): void {
    this.loading = value;
  }

  private get(): void {
    const userDetails: UserDetails = this._authService.userDetails!;
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${userDetails.id}`;
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

  public submit(): void {

    this.loadingSetter(true);

    if(this.form.invalid) {
      this.form.markAllAsTouched();
      this.loadingSetter(false);
      return;
    }

    const userDetails: UserDetails = this._authService.userDetails!;

    const { title, description }: any = this.form.value;
    const workPlataform: WorkPlataform = { title, description, userDetailsId: userDetails.id };

    this._workPlataformService.insert(workPlataform).subscribe(
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

  public edit(workPlataform: WorkPlataform): void {
    workPlataform = { ...workPlataform, userDetails: undefined };
    this._workPlataformService.update(workPlataform).subscribe(
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

  public delete(workPlataform: WorkPlataform): void {
    this._workPlataformService.delete(workPlataform.id!).subscribe(
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
