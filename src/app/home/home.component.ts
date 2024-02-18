import { Component } from '@angular/core';
import { environment } from '../../env/env';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor() {
    console.log(environment.firebase);
  }
}
