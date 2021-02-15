import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '../products/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { CartItem } from '../shared/cart-item.module';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy {

  @ViewChild('form', { static: false }) refForm : NgForm;
  public cartItems :CartItem[];
  private id = 0;
  public isLoading = false;
  public products: Product[] = [];
  public editMode = false;
  private editItemId: number;
  private subscription : Subscription;

  constructor(private cartService: CartService, private notifyService : NotificationService, private productService : ProductService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.cartService.getCartItem().subscribe(resp =>{
        this.cartItems = resp;
        this.isLoading = false;
        for(let i=0;i<this.cartItems.length;i++) {
          let n = this.cartItems[i].products.length;
          let cartItem = this.cartItems[i].products;
          for(let j=0;j<n;j++) {
            const productId = cartItem[j].productId;
            const quantity = cartItem[j].quantity
            this.getProductById(productId,quantity);
          }
        }
      })
    }

    private getProductById(id: number,quantity:number): void {
      this.productService.fetchProductById(id).subscribe(
        response => {
          this.products[this.id] = response;
          this.products[this.id].quantity = quantity;
          this.id++;
        }
      );
    }

    public onDelete():void{
      this.cartService.DeleteItem(this.editItemId).subscribe(() => {
        console.log(`Delete Request for id:${this.editItemId} is successful`);
        for(let i = 0; i < this.products.length; ++i){
          if (+this.products[i].id === this.editItemId) {
              this.products.splice(i,1);
          }
        }
      });
      this.notifyService.showSuccess("Data Deleted successfully from Cart!!", "Success");
      this.onClear();
    }

    public onClear(): void{
      this.refForm.reset();
      this.editMode= false;
    }

    public onAddItem(id:number): void{
      this.editMode=true;
      this.editItemId = id;
      this.refForm.setValue({
        title : this.products[id].title,
        quantity : this.products[id].quantity
      })
    }

    public onSubmit(formData: NgForm): void{
      const value= formData.value;
      if(this.editMode){
        this.cartService.UpdateCartItem(this.editItemId, value.quantity).subscribe();
        this.notifyService.showSuccess("Updated Successfully", "");
      }
      else{
        this.cartService.addCartItem(value).subscribe();
      }
      this.editMode = false;
      formData.reset();
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}
