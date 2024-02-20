import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatabaseService } from '../../services/firebase/database.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {
  products$: any;
  constructor(private readonly db: DatabaseService) {
    this.db.getAllProduct().subscribe(products => {
      this.products$ = products
      console.log(products)
    });
  }
}
