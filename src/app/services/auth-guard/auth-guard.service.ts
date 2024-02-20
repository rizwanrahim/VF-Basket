import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  isAdmin: boolean = false;
  constructor(private readonly userService: UserService) { }

  appActivation(): boolean {
    return this.userService.hasUser();
  }

  adminActivation(): boolean {
    return this.userService.isUserAdmin();
  }
}
