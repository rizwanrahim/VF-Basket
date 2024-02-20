import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AppUser } from '../models/AppUser';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
@Component({
  selector: 'bs-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NgbDropdownModule],
  templateUrl: './bs-navbar.component.html',
  styleUrl: './bs-navbar.component.css'
})
export class BsNavbarComponent {
  user: AppUser| null | undefined;
  constructor(public readonly userService: UserService) {
  }

  login() {
    this.userService.login().then(user => this.user = user)     
  }
 
  logout() {
    this.userService.logout().then(() => this.user = null);
  }

}
