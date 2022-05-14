import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/base.service';
import { Skills } from 'src/app/core/model/user-details/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService extends BaseService<Skills> {

  public constructor(
    _http: HttpClient
  ) {
    super(_http, 'Skills');
  }

}