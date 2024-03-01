import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AdminLogin, AppLogin } from './services/auth-guard/IsLogin';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductsComponent, canActivate: [AppLogin] },
    { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AppLogin] },
    { path: 'check-out', component: CheckOutComponent, canActivate: [AppLogin] },
    { path: 'order-success', component: OrderSuccessComponent, canActivate: [AppLogin] },
    {
        path: 'admin',
        canActivate: [AppLogin, AdminLogin],
        children: [
          {
            path: 'products',
            component: AdminProductsComponent,
          },
          {
            path: 'products/new',
            component: ProductFormComponent,
          },
          {
            path: 'products/:id',
            component: ProductFormComponent,
          },
          {
            path: 'orders',
            component: AdminOrdersComponent,
          },
        ],
      },
    { path: 'orders', component: MyOrderComponent, canActivate: [AppLogin] },
];
