import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AppUser } from '../../models/AppUser';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly users = '/users/';
  private readonly category = '/categories'
  constructor(public readonly db: AngularFireDatabase) { }
  
  saveUser(user: AppUser) {
    this.db.object(this.users + user.userId).update({
      username: user.username,
      email: user.email,
      isAdmin: false
    });
  }

  getUser(id: string) {
    return this.db.object<AppUser>(this.users + id).valueChanges();
  }

  getCategory() {
    return this.db.list(this.category).valueChanges()
  }
}
