import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PageGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  public constructor(
    private _authService: AuthService,
    private _router: Router,
    private _ngZone: NgZone
  ) { }
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.refresh()
    .pipe(
      tap((checker: boolean): void => {
        if(!checker) {
          this._ngZone.run((): void => {
            this._router.navigate(['/auth']);
          });
        }
      })
    );
  }
  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  public canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  public canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.refresh()
    .pipe(
      tap((checker: boolean): void => {
        if(!checker) {
          this._ngZone.run((): void => {
            this._router.navigate(['/auth']);
          });
        }
      })
    );
  }
}
