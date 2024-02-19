import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  isAdmin: boolean = false;
  constructor(public readonly auth: AuthService, public readonly userService: UserService) { }

  appActivation(): boolean {
    return this.auth.hasUser();
  }

  adminActivation(): boolean {
    return this.auth.isUserAdmin();
  }
}
