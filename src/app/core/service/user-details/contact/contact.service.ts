import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../base/base.service';
import { Contact } from '../../../model/user-details/contact/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService<Contact> {

  public constructor(
    _http: HttpClient
  ) {
    super(_http, 'Contact');
  }

}