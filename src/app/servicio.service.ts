import { Injectable } from '@angular/core';
import {Response, Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Customer } from './clases/customer';
import { CustomerProduct } from './clases/customer-product';

@Injectable()
export class ServicioService {
  // creando variable
  // private Url = 'http://127.0.0.1:8000/api/';

  private Url:string = "http://apigarage.hogaryspacios.com/api/";

  constructor(private http: Http) { }
  public getSlider() {
    return this.http.get(this.Url + 'slider');
  }
  public getCategory() {
    return this.http.get(this.Url + 'category');
  }
  public getProductByIdCategory(id_category){
    return this.http.get(this.Url + 'itemCategory/' + id_category);
  }
  public getProductName(name){
    return this.http.get(this.Url + 'search/' + name);
  }
  public getProductPriceByCategory(id_category, minPrice, maxPrice, sortBy) {
    return this.http.get(this.Url + 'filterPriceCategory?categoriaId='+ id_category + '&precioMin=' + minPrice + '&precioMax=' + maxPrice + '&_sort=' + sortBy);
  }
  public getProductPriceByName(name,minPrice,maxPrice,sortBy){
    return this.http.get(this.Url+'filterPriceName?name='+name+'&precioMin='+minPrice+'&precioMax='+maxPrice+'&_sort='+sortBy);
  }
  public getDateByProduct(oFilterDate){
    return this.http.get(this.Url+'filtrarFecha?name='+oFilterDate.name+'&id_category='+oFilterDate.id_category+'&typeFilter='+oFilterDate.typeFilter+'&fecha='+oFilterDate.fecha+'&_sort='+oFilterDate.sortBy);
  }
  public getProductById(id_product){
    return this.http.get(this.Url+'itemProduct/'+id_product);
  }
  /*public getAllCategory(){
    return this.http.get(this.Url+'getCategory');
  }*/
  public registerCustomer(oCustomer){
    return this.http.post(this.Url+'register',oCustomer);
  }
  public loginCustomer(oCustomer){
    return this.http.post(this.Url+'loginCustomer',oCustomer);
  }
  public postProduct(oProduct){
    return this.http.post(this.Url+'product',oProduct);
  }
  public putProduct(oProduct: any){
    return this.http.put(this.Url+ 'product/' + oProduct.id_product,oProduct);
  }
  public deleteProduct (id_product: number){
    return this.http.delete(this.Url + "product/"+ id_product);
  }
  public getState(){
    return this.http.get(this.Url+'state');
  }
  public getProvincia(id_state){
    return this.http.get(this.Url+'provincia/'+id_state);
  }
  public getDistrito(id_provincia){
    return this.http.get(this.Url+'distrito/'+id_provincia);
  }
  public getSubCategory(id_category){
    return this.http.get(this.Url+'subcategoria/'+id_category);
  }
  public loginSocial(customer: Customer): any {
    return this.http.post(this.Url + 'loginSocial', customer);
  }

  public culqiPago(data: any): any{
    return this.http.post(this.Url + "culqi/payout", data).map((response: Response) => response.json()).catch((error) =>{
      return Observable.throw(error);
    });
  }

  public getProductByCustomer(oCustomerProduct: CustomerProduct): any {
    return this.http.post(this.Url + "product/customer", oCustomerProduct);
  }
}
