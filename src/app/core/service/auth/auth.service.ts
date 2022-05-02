import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../model/auth/user.model';
import { AuthenticateResponse } from '../../model/auth/authenticate-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base_url: string = environment.base_url;
  private controller: string = 'User';

  public constructor(
    private _http: HttpClient
  ) { }

  private setToken(token: string): void {
    localStorage.setItem('AUTH_TOKEN', token);
  }

  private get token(): string {
    return localStorage.getItem('AUTH_TOKEN')! || '';
  }

  private setUser(user: User): void {
    const jsonUser: string = JSON.stringify(user);
    localStorage.setItem('AUTH_USER', jsonUser);
  }

  private get user(): User | undefined {
    if(localStorage.getItem('AUTH_USER')) {
      const user: User = JSON.parse(localStorage.getItem('AUTH_USER')!);
      return user;
    }
    return;
  }

  private setters(token: string, user: User): void {
    this.setToken(token);
    this.setUser(user);
  }

  public users(): Observable<User[]> {
    return this._http.get<User[]>(`${this.base_url}/${this.controller}/Users`);
  }

  public signUp(user: User): Observable<AuthenticateResponse> {
    return this._http.post<AuthenticateResponse>(`${this.base_url}/${this.controller}/SignUp`, user);
  }

  public signIn(user: User): Observable<AuthenticateResponse> {
    return this._http.post<AuthenticateResponse>(`${this.base_url}/${this.controller}/SignIn`, user)
      .pipe(
        tap((authenticateResponse: AuthenticateResponse): void => {
          const { token, user }: any = authenticateResponse;
          this.setters(token, user);
        })
      );
  }

  public signOut(): Observable<void> {
    return this._http.get<void>(`${this.base_url}/${this.controller}/SignOut`)
      .pipe(
          tap((): void => {
          localStorage.clear();
        })
      );
  }

  public refresh(): Observable<boolean> {
    return this._http.get<AuthenticateResponse>(`${this.base_url}/${this.controller}/Refresh`)
      .pipe(
        tap((authenticateResponse: AuthenticateResponse): void => {
          const { token, user }: any = authenticateResponse;
          this.setters(token, user);
        }),
        map((): boolean => {
          return true;
        }),
        catchError((): Observable<boolean> => {
          localStorage.clear();
          return of(false);
        })
      );
  }

}
