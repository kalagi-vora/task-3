import {Injectable} from '@angular/core';
import { Product } from '../products/product.model';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  private updatedData: Product;

  private apiUrl : string = 'https://fakestoreapi.com/products';

  constructor(private http : HttpClient, private cartService : CartService) { }

  public fetchProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl+'/'+id);
  }

  public fetchProducts(): Observable<Product[]>{
    return this.http
      .get<Product[]>(
        this.apiUrl
     );
  }

  public addProduct(product): Observable<Product>{
    const productIs: Product = product;
    return this.http
      .post<Product>(
        this.apiUrl,
        productIs
      )
  }

  public updateProduct(Product): Observable<any>{
    const productIs: Product = Product;
    return this.http
      .patch<{ data: string }>(
        `${this.apiUrl}/${Product.id}`,
        productIs
      )
  }

  public passData(data: Product){
    this.updatedData = data;
  }

  public showData(){
    return this.updatedData;
  }

  public deleteProduct(id:number): Observable<Product>{
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }
}
