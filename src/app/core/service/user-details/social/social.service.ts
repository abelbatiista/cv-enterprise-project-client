import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Social } from '../../../model/user-details/social/social.model';
import { BaseService } from '../../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class SocialService extends BaseService<Social> {

  public constructor(
    _http: HttpClient
  ) {
    super(_http, 'Social');
  }

}