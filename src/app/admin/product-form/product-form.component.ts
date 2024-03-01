import { Component } from '@angular/core';
import { DatabaseService } from '../../services/firebase/database.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  categories$:any
  product: any = {};
  id: any;

  constructor(
    private readonly db: DatabaseService,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {
    
    this.PopulateCategories();
    this.InitializeUpdateForm();
  }

  private PopulateCategories() {
    this.db.getCategory().subscribe(res => this.categories$ = res);
  }

  private InitializeUpdateForm() {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) this.db.getProduct(this.id).pipe(map(item => ({ key: item.payload.key, ...item.payload.val() as any })))
      .subscribe(product$ => this.product = product$);
  }

  save(product: any) {
    if(this.id) this.db.update(this.id, product)
    else this.db.saveProduct(product);
    
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm('Are you sure you want to delete this product?')) return;
    this.db.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  cancel() {
    this.router.navigate(['/admin/products']);
  }
}
