import { Injectable } from '@angular/core';
import { Enterprise } from '../../model/enterprise/enterprise.model';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService extends BaseService<Enterprise> {

  public constructor(
    _http: HttpClient
  ) {
    super(_http, 'Vacant');
  }

}
