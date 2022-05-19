import { Injectable } from '@angular/core';
import { VacantUser } from '../../model/vacant-user/vacant-user.model';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VacantUserService extends BaseService<VacantUser> {

  public constructor(
    _http: HttpClient
  ) {
    super(_http, 'VacantUser');
  }

}
