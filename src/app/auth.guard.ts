import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { GuardsService } from "./guards.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private guardService:GuardsService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
if(!this.guardService.islogin()){
      this.router.navigate(['/login']);
      return false;
    }
    else{
      
      return true;
    }
    
  }
  
}
