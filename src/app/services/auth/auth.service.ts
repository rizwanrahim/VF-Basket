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
  user: AppUser | undefined | null;
  private user$: Observable<firebase.User | null>;

  constructor(private auth: AngularFireAuth) {
    this.user$ = this.auth.authState;
  }

  logout() {
    return this.auth.signOut().then(() => this.user == undefined);
  }

  hasUser() {
    return this.user ? true : false
  }

  login() {
    this.auth.signInWithPopup(new GoogleAuthProvider()).then(response => {
      this.user = {
        userId: response.user?.uid,
        username: response.user?.displayName,
        isAdmin: false
      }
    });
    return this.user;
  }
}
