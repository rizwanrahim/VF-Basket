import { Component } from '@angular/core';
import { DatabaseService } from '../../services/firebase/database.service';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { KeyValue } from '../../models/KeyValue';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  categories$:any
  
  constructor(public readonly db: DatabaseService) {
    this.db.getCategory().subscribe(res => this.categories$ = res);
  }
}
