import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {path: '' , redirectTo : '/auth' , pathMatch: 'full'},
  {path: 'auth' , component: AuthenticationComponent},
  {
    path: "products",
    loadChildren: () => import("./products/products.module").then(m => m.ProductsModule)
  },
  {
    path: 'cart' ,
    loadChildren: () => import("./cart/cart.module").then(m => m.CartModule)
  },
  { path: '**', redirectTo: 'products', canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


