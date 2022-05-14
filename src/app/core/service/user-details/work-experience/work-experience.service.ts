import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/base.service';
import { WorkExperience } from '../../../model/user-details/work-experience/work-experience.model';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService extends BaseService<WorkExperience> {

  public constructor(
    _http: HttpClient
  ) {
    super(_http, 'WorkExperience');
  }

}