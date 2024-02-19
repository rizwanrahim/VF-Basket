import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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
  constructor(public readonly auth: AuthService, public readonly userService: UserService) {
    
  }

  async login() {
      this.auth.login().then(() => {
        if(!this.auth.user) return 
        
        this.user = this.auth.user;
        this.userService.save(this.user);
      });
  }
 
  logout() {
    this.auth.logout().then(() => {
      this.user = null;
      
    });
  }

}
