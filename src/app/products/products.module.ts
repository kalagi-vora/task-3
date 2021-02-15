import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { AuthGuard } from '../guards/auth.guard';
import { AddProductComponent } from '../products/add-product/add-product.component';
import { ProductsComponent } from '../products/products.component';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
      ProductsComponent,
      AddProductComponent,
      ProductListComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      Ng2SearchPipeModule,
      NgxPaginationModule,
      SharedModule,
      RouterModule.forChild([
        {path: '' , component: ProductsComponent, canActivate: [AuthGuard]},
        {path: ':id', component: AddProductComponent, canActivate: [AuthGuard]}
      ])
    ]
  })
  export class ProductsModule {}
