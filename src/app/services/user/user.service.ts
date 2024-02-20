import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AppUser } from '../../models/AppUser';
import { AuthService } from '../auth/auth.service';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: AppUser | null | undefined;
  constructor(
    public readonly db: AngularFireDatabase,
    public readonly auth: AuthService) {
  }

  private readonly base = '/users/';

  save(user: AppUser) {
    if (!user.userId) return;

    this.get(user.userId).subscribe(res => {
      if (res != null) return;
      this.saveToFirebase(user);
    });
  }

  private saveToFirebase(user: AppUser) {
    this.db.object(this.base + user.userId).update({
      username: user.username,
      email: user.email,
      isAdmin: false
    });
  }

  get(id: string) {
    return this.db.object<AppUser>(this.base + id).valueChanges();
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
    let user$ = await firstValueFrom(this.get(authResponse.userId));

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
