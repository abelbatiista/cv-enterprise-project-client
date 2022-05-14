import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../../../core/service/user-details/skills/skills.service';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { Skills } from 'src/app/core/model/user-details/skills/skills.model';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { ODataQueryBuilder } from '../../../../core/model/filter/filter.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  public loading: boolean = true;
  public skills: Skills[] = [];
  public form: FormGroup = new FormGroup({});

  public constructor(
    private _authService: AuthService,
    private _skillsService: SkillsService
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.get();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators .required]),
      percent: new FormControl(0, [Validators .required])
    });
  }

  private loadingSetter(value: boolean): void {
    this.loading = value;
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

  public get percent(): void {
    return this.form.get('percent')!.value;
  }

  public submit(): void {

    this.loadingSetter(true);

    if(this.form.invalid) {
      this.form.markAllAsTouched();
      this.loadingSetter(false);
      return;
    }

    const userDetails: UserDetails = this._authService.userDetails!;

    const { title, percent }: any = this.form.value;
    const skill: Skills = { title, percent, userDetailsId: userDetails.id };

    this._skillsService.insert(skill).subscribe(
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

  public edit(skill: Skills): void {
    skill = { ...skill, userDetails: undefined };
    this._skillsService.update(skill).subscribe(
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

  public delete(skill: Skills): void {
    this._skillsService.delete(skill.id!).subscribe(
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
