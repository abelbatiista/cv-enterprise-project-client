import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/base.service';
import { GeneralInformation } from '../../../model/user-details/general-information/general-information.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralInformationService extends BaseService<GeneralInformation> {

  public constructor(
    _http: HttpClient
  ) {
    super(_http, 'GeneralInformation');
  }

}