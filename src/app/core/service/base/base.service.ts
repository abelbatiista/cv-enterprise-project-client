import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditableEntity } from '../../model/base/auditable-entity.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends AuditableEntity> {

  base_url: string = environment.base_url;

  public constructor(
    protected _http: HttpClient,
    @Inject(String) protected _controlName: string
  ) { }

  public getAll(): Observable<T[]> {
    return this._http.get<T[]>(`${this.base_url}/${this._controlName}`);
  }

  public getByQuery(query: string): Observable<any> {
    return this._http.get<any>(`${this.base_url}/${this._controlName}/Query?${query}`);
  }

  public findbyId(id: number): Observable<T> {
    return this._http.get<T>(`${this.base_url}/${this._controlName}/${id}`);
  }

  public insert(item: T): Observable<T> {
    return this._http.post<T>(`${this.base_url}/${this._controlName}`, item);
  }

  public update(item: T): Observable<T> {
    return this._http.put<T>(`${this.base_url}/${this._controlName}/${item.id}`, item);
  }

  public delete(id: number): Observable<T> {
    return this._http.delete<T>(`${this.base_url}/${this._controlName}/${id}`);
  }
}
