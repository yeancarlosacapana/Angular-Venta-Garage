import { Component, OnInit } from '@angular/core';
import { Customer } from '../clases/customer';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';
import { CustomerProduct } from '../clases/customer-product';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass'],
  providers: [ServicioService]
})
export class UserProfileComponent implements OnInit {

  public listProduct: any[] = [];
  public eCustomer: Customer = new Customer();
  public eCustomerProduct = new CustomerProduct();
  public urlProductForm = '/post-product/';

  constructor(private service: ServicioService, private router: Router) { }

  ngOnInit() {
    this.eCustomer = <Customer>JSON.parse(localStorage.getItem('user'));
    console.log(this.eCustomer);
    this.getProductMe(this.eCustomer.id_customer);
  }

  getProductMe(id_customer: number){
    this.eCustomerProduct.id_customer = id_customer;
    this.service.getProductByCustomer(this.eCustomerProduct).subscribe(response => {
      console.log(response);
      this.listProduct = response.json();
    });
  }

  editProduct(product: any){
    console.log(product);
    this.router.navigateByUrl(this.urlProductForm + this.eCustomer.id_customer + '/' + product.id_product);
  }

  deleteProduct(product: any){
    console.log(product)
  }
}
