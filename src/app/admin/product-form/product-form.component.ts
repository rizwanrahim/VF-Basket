import { Component } from '@angular/core';
import { DatabaseService } from '../../services/firebase/database.service';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { KeyValue } from '../../models/KeyValue';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  categories$:any
  
  constructor(
    private readonly db: DatabaseService,
    private readonly router: Router) {
    this.db.getCategory().subscribe(res => this.categories$ = res);
  }

  save(product: any) {
    this.db.saveProduct(product);
    this.router.navigate(['/admin/products']);
  }
}
