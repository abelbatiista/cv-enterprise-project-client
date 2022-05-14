import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/service/auth/auth.service';
import { ContactService } from '../../../../core/service/user-details/contact/contact.service';
import { Contact } from '../../../../core/model/user-details/contact/contact.model';
import { UserDetails } from '../../../../core/model/user-details/user-details.model';
import { ODataQueryBuilder } from '../../../../core/model/filter/filter.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public loading: boolean = true;
  public contact: Contact[] = [];
  public form: FormGroup = new FormGroup({});

  public constructor(
    private _authService: AuthService,
    private _contactService: ContactService
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
    this.get();
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      country: new FormControl('', [Validators .required]),
      adress: new FormControl('', [Validators .required]),
      location: new FormControl('', [Validators .required]),
      phone: new FormControl('', [Validators .required]),
      email: new FormControl('', [Validators .required]),
      website: new FormControl('', [Validators .required])
    });
  }

  private loadingSetter(value: boolean): void {
    this.loading = value;
  }

  private get(): void {
    const userDetails: UserDetails = this._authService.userDetails!;
    let oData: ODataQueryBuilder = new ODataQueryBuilder();
    oData.filter = `$filter = userDetailsId eq ${userDetails.id}`;
    this._contactService.getByQuery(oData.getQuery()).subscribe(
      (contact: Contact[]): void => {
        this.contact = contact;
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
    if(this.contact.length > 0) {
      const { country, adress, location, phone, email, website } = this.contact[0]!;
      this.form.patchValue({
        country,
        adress,
        location,
        phone,
        email,
        website,
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

    const { country, adress, location, phone, email, website }: any = this.form.value;
    let contact: Contact = { country, adress, location, phone, email, website, userDetailsId: userDetails.id };

    if(this.contact.length === 0) {
      this._contactService.insert(contact).subscribe(
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
      contact = { ...contact, id: this.contact[0].id }
      this._contactService.update(contact).subscribe(
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
