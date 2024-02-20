import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { AppUser } from '../../models/AppUser';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: AppUser | undefined | null;
  private user$: Observable<firebase.User | null>;

  constructor(private auth: AngularFireAuth) {
    this.user$ = this.auth.authState;
  }

  logout() {
    return this.auth.signOut().then(() => this.user == undefined);
  }

  login() {
    return this.auth.signInWithPopup(new GoogleAuthProvider()).then(response => {
      return this.user = {
        username: response.user?.displayName,
        isAdmin: false,
        email: response.user?.email,
        userId: this.getUserId(response.user?.email)
      }
    });
  }

  getUserId(email: string | null | undefined): string | null | undefined {
    return email?.split("@")[0].replace(".", "+");
  }
}
