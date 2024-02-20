import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AppUser } from '../../models/AppUser';
import { AuthService } from '../auth/auth.service';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { environment } from './../../../environments/environment';
import { DatabaseService } from '../firebase/database.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: AppUser | null | undefined;
  constructor(
    public readonly auth: AuthService,
    public readonly db: DatabaseService) {
  }

  save(user: AppUser) {
    if (!user.userId) return;

    this.db.getUser(user.userId).subscribe(res => {
      if (res != null) return;
      this.db.saveUser(user);
    });
  }

  async login(): Promise<AppUser | null | undefined> {
    if (environment.production) return await this.UserFromService();
    
    this.user = {
      email:"iamrizwanrahim@gmail.com",
      isAdmin: true,
      userId: "iamrizwanrahim",
      username:"Rizwan Rahim"
    }
    return this.user;
  }

  private async UserFromService() {
    var authResponse = await this.auth.login();

    if (authResponse.userId == null) throw new Error("User ID is null");
    let user$ = await firstValueFrom(this.db.getUser(authResponse.userId));

    var res = user$ || authResponse;
    this.user = {
      username: res.username,
      email: res.username,
      isAdmin: res.isAdmin || false,
      userId: this.auth.getUserId(res.userId)
    };

    return this.user;
  }

  logout() {
    return this.auth.logout();
  }

  hasUser() {
    return this.user ? true : false
  }

  isUserAdmin() {
    return this.user?.isAdmin || false
  }
}
