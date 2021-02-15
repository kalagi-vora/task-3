import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AuthGuard } from '../guards/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from '../cart/cart.component';

@NgModule({
    declarations: [
      CartComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      SharedModule,
      RouterModule.forChild([
        {path: '' , component: CartComponent, canActivate: [AuthGuard]},
      ])
    ]
  })
  export class CartModule {}
