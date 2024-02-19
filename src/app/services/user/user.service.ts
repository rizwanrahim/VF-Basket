import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AppUser } from '../../models/AppUser';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public readonly db: AngularFireDatabase) {

  }

  private readonly base = '/users/';

  save(user: AppUser) {
    this.db.object(this.base + user.userId).update({
      name: user.username,
      email: user.email,
      isAdmin: false
    });
  }

  get(id: string) {
    return this.db.object<AppUser>(this.base + + id).valueChanges();
  }
}
