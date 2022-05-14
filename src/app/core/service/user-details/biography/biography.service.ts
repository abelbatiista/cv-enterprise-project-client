import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/base.service';
import { Biography } from '../../../model/user-details/biography/biography.model';

@Injectable({
  providedIn: 'root'
})
export class BiographyService extends BaseService<Biography> {

  public constructor(
    _http: HttpClient
  ) {
    super(_http, 'Biography');
  }

}