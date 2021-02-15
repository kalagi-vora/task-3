import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  form : FormGroup;
  public productData : Product;
  public urlId: string;

  constructor(private productService: ProductService ,
              private route: ActivatedRoute,
              private router: Router ,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.productData = this.productService.showData();
    this.route.params.subscribe(
      (params : Params)=>{
        this.urlId = params['id'];
        this.InitForm();
      }
    )
  }

  private InitForm(): void{
    let title :string ='';
    let price : number = 0;
    let description :string ='';
    let category :string ='';
    let image :string ='';

    if(this.urlId!=="new")
    {
      title = this.productData.title;
      price = this.productData.price;
      description = this.productData.description;
      category = this.productData.category;
      image = this.productData.image;
    }

    this.form = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'price': new FormControl(price, Validators.required),
      'category': new FormControl(category, Validators.required),
      'description': new FormControl(description, Validators.required),
      'image': new FormControl(image, Validators.required),
    })
  }

  public onSubmit(formData: Product): void{
    if(this.urlId==="new")
    {
      this.productService.addProduct(formData.title, formData.price, formData.description, formData.image, formData.category).subscribe(response =>{
        console.log("created record is: " +JSON.stringify(response));
      });
    }
    else{
      this.productService.updateProduct(formData.title, formData.price, formData.description, formData.image, formData.category, formData.id = this.productData.id).subscribe(response => {
        console.log("Updated record is: " +JSON.stringify(response));
      });
    }
    this.router.navigate(['../recordlist']);
  }

}
