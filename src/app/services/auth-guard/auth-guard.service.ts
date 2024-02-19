import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {
  constructor(public readonly auth: AuthService) { }

   canActivate() {
      return this.auth.hasUser();
   }
}
