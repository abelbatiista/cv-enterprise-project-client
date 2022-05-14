import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/base.service';
import { WorkPlataform } from '../../../model/user-details/work-plataform/work-plataform.model';

@Injectable({
  providedIn: 'root'
})
export class WorkPlataformService extends BaseService<WorkPlataform> {

  public constructor(
    _http: HttpClient
  ) {
    super(_http, 'WorkPlataform');
  }

}