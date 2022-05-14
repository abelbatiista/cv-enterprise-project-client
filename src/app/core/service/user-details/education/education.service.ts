import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/base.service';
import { Education } from '../../../model/user-details/education/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService extends BaseService<Education> {

  public constructor(
    _http: HttpClient
  ) {
    super(_http, 'Education');
  }

}