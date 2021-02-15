import { CartItem } from '../shared/cart-item.module';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../products/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService{

  private apiUrl = "https://fakestoreapi.com/carts";

  constructor(private http: HttpClient){}

  public getCartItem(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(
      this.apiUrl
    )
  }

  public getCartItemById(index:number): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(
      this.apiUrl+'/'+index
    )
  }

  public addCartItem(item : Product): Observable<CartItem>{
    const date = new Date();
    const cartItemIs: CartItem = {userId: 1, date: date, products: [{productId: +item.id, quantity:1}]};
    return this.http
      .post<CartItem>(
        this.apiUrl,
        cartItemIs
      )
 	}

   public UpdateCartItem(index:number ,quantity: number): Observable<CartItem>{
    const date = new Date();
    const cartItemIs: CartItem = {userId: 1, date: date, products: [{productId: index, quantity:quantity}]};
    return this.http
      .patch<CartItem>(
        this.apiUrl+'/'+index,
        cartItemIs
      )
 	}

   public DeleteItem(index: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${index}`);
  }
}
