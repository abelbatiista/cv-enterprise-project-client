import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../model/auth/user.model';
import { AuthenticateResponse } from '../../model/auth/authenticate-response.model';
import { ApplicationIdentityUser } from '../../model/auth/application-identity-user.model';
import { Setter } from '../../model/auth/private/setter.model';
import { UserDetails } from '../../model/user-details/user-details.model';
import { ProfilePicture } from '../../abstract/profile-picture/profile-picture.class';

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
  
  private setUser(user: User): void {
    const jsonUser: string = JSON.stringify(user);
    localStorage.setItem('AUTH_USER', jsonUser);
  }

  private setApplicationIdentityUser(applicationIdentityUser: ApplicationIdentityUser): void {
    const jsonapplicationIdentityUser: string = JSON.stringify(applicationIdentityUser);
    localStorage.setItem('AUTH_APPLICATION_IDENTITY_USER', jsonapplicationIdentityUser);
  }

  private setUserDetails(userDetails: UserDetails): void {
    const jsonUserDetails: string = JSON.stringify(userDetails);
    localStorage.setItem('AUTH_USER_DETAILS', jsonUserDetails);
  }

  private setImageUrl(imageUrl: string): void {
    localStorage.setItem('AUTH_IMAGE_URL', imageUrl);
  }
  
  private setters(setter: Setter): void {
    this.setToken(setter.token!);
    this.setUser(setter.user!);
    this.setApplicationIdentityUser(setter.applicationIdentityUser!);
    this.setUserDetails(setter.userDetails!);
    this.setImageUrl(setter.imageUrl!);
  }

  public get token(): string {
    return localStorage.getItem('AUTH_TOKEN')! || '';
  }
  
  public get user(): User | undefined {
    if(localStorage.getItem('AUTH_USER')) {
      const user: User = JSON.parse(localStorage.getItem('AUTH_USER')!);
      return user;
    }
    return;
  }

  public get applicationIdentityUser(): ApplicationIdentityUser | undefined {
    if(localStorage.getItem('AUTH_APPLICATION_IDENTITY_USER')) {
      const applicationIdentityUser: ApplicationIdentityUser = JSON.parse(localStorage.getItem('AUTH_APPLICATION_IDENTITY_USER')!);
      return applicationIdentityUser;
    }
    return;
  }

  public get userDetails(): UserDetails | undefined {
    if(localStorage.getItem('AUTH_USER_DETAILS')) {
      const userDetails: UserDetails = JSON.parse(localStorage.getItem('AUTH_USER_DETAILS')!);
      return userDetails;
    }
    return;
  }

  public get imageUrl(): string {
    return localStorage.getItem('AUTH_IMAGE_URL')! || '';
  }

  public users(): Observable<ApplicationIdentityUser[]> {
    return this._http.get<ApplicationIdentityUser[]>(`${this.base_url}/${this.controller}/Users`);
  }

  public signUp(user: User): Observable<AuthenticateResponse> {
    return this._http.post<AuthenticateResponse>(`${this.base_url}/${this.controller}/SignUp`, user);
  }

  public signIn(user: User): Observable<AuthenticateResponse> {
    return this._http.post<AuthenticateResponse>(`${this.base_url}/${this.controller}/SignIn`, user)
      .pipe(
        tap((authenticateResponse: AuthenticateResponse): void => {
          const { token, user, applicationIdentityUser, userDetails }: any = authenticateResponse;
          const imageUrl: string = `${this.base_url}/File/Download?userDetailsId=${userDetails.id}`;
          this.setters({token, user, applicationIdentityUser, userDetails, imageUrl});
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
          const { token, user, applicationIdentityUser, userDetails }: any = authenticateResponse;
          const imageUrl: string = `${this.base_url}/File/Download?userDetailsId=${userDetails.id}`;
          this.setters({token, user, applicationIdentityUser, userDetails, imageUrl});
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