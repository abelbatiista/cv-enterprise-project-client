import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { UserDetails } from '../../model/user-details/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService extends BaseService<UserDetails> {

  public constructor(
    _http: HttpClient
  ) {
    super(_http, 'UserDetails');
  }

  public findByApplicationIdentityUserId(applicationIdentityUserId: string){
    return this._http.get<UserDetails>(`${this.base_url}/${this._controlName}/GetByApplicationIdentityUserId/${applicationIdentityUserId}`);
  }

}