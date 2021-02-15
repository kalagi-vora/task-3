import { Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {

  public allProducts : Product[] = [];
  public deletedProduct: any;
  public isLoading = false;
  public p: number = 1;
  public searchedKeyword: string;
  private subscription: Subscription;
  @Output() loadingProperty = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private router: Router,
    private notifyService:NotificationService,
    private cartService : CartService
   ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadingProperty.emit(this.isLoading);
    this.subscription = this.productService.fetchProducts().subscribe(resp=>{
      this.allProducts = resp;
      this.isLoading = false;
      this.loadingProperty.emit(this.isLoading);
    });
  }

  public onAddCart(data): void{

    this.cartService.addCartItem(data).subscribe(
      item =>{
        data= item;
        console.log(data);
      }
    );
    this.notifyService.showInfo("Data Added to cart successfully!!", "Yayyy");
  }

  public onEdit(data: Product):void{
    console.log(data);
    this.productService.passData(data);
    // console.log("Original Data :"+JSON.stringify(this.productService.showData()));
    this.router.navigate([`../products/${data.id}`]);
  }

  public onDelete(id: number): void{
    if (confirm("Are you sure,you want to delete this Product?")){
      this.productService.deleteProduct(id).subscribe(() => {
        console.log(`Delete Request for id:${id} is successful`);

        for(let i = 0; i < this.allProducts.length; ++i){
          if (+this.allProducts[i].id === id) {
              this.allProducts.splice(i,1);
          }
        }
      })
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
