import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserDetails } from '../../model/user-details/user-details.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private base_url: string = environment.base_url;

  private constructor(
    private _http: HttpClient
  ) { }

  public upload(file: File, userDetails: UserDetails): Observable<void> {
    const params: HttpParams = new HttpParams().set('userDetailsId', userDetails.id!);
    const options: any = {
      params
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this._http.post<void>(`${this.base_url}/File/Upload`, formData, options)
      .pipe(
        map((): void => {
          return;
        })
      );
  }

  public download(userDetails: UserDetails): Observable<any> {
    const params: HttpParams = new HttpParams().set('userDetailsId', userDetails.id!);
    const options: any = {
      params,
      responseType: 'blob'
    };
    return this._http.get<any>(`${this.base_url}/File/Download`, options)
      .pipe(
        map((): string => {
          return `${this.base_url}/File/Download?${params.toString()}`;
        }),
        catchError((): string => {
          return '';
        })
      );
  }

}
