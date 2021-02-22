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

  public addProduct(title:string, price:number, description:string, image:string, category:string): Observable<Product>{
    const productIs: Product = {title: title, price: price, description: description, image: image, category: category};
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

  public deleteProduct(id:number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
