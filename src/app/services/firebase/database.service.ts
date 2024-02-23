import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AppUser } from '../../models/AppUser';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly users = '/users/';
  private readonly categories = '/categories'
  private readonly products = '/products'
  constructor(private readonly db: AngularFireDatabase) { }
  
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

  saveProduct(product: any) {
    return this.db.list(this.products).push(product)
  }

  getCategory() {
    return this.db.list(this.categories).valueChanges()
  }

  getAllProduct() {
    return this.db.list(this.products).valueChanges();
  }

}
