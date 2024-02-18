import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleAuthProvider, User } from 'firebase/auth';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'bs-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NgbDropdownModule],
  templateUrl: './bs-navbar.component.html',
  styleUrl: './bs-navbar.component.css'
})
export class BsNavbarComponent {
  user:any;

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => this.user = user);
  }

  logout() {
    this.auth.signOut()
  }

  async login() {
    const user = await this.auth.signInWithPopup(new GoogleAuthProvider());
    console.log(user);
  }
}
