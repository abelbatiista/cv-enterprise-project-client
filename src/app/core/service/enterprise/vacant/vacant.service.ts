import { Injectable } from '@angular/core';
import { Vacant } from '../../../model/enterprise/vacant/vacant.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class VacantService extends BaseService<Vacant> {

  public constructor(
    _http: HttpClient
  ) {
    super(_http, 'Vacant');
  }

}
