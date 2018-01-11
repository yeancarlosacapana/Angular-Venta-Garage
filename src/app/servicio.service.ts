import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
@Injectable()
export class ServicioService {
  //creandp variable
  //private Url:string = "http://127.0.0.1:8000/api/";
  private Url:string = "http://apigarage.hogaryspacios.com/api/";
  
  constructor(private http:Http) { 
    let host = location.hostname+':'+location.port;
    console.log(host);
  }
  public getSlider(){
    return this.http.get(this.Url+'slider');
  }
  public getCategory() {
    return this.http.get(this.Url+"category");
  }
  public getProductByIdCategory(id_category){
    return this.http.get(this.Url+'itemCategory/'+id_category);
  } 
  public getProductName(name){
    return this.http.get(this.Url+'search/'+name);
  }
  public getProductPriceByCategory(id_category,minPrice , maxPrice , sortBy){
    return this.http.get(this.Url+'filterPriceCategory?categoriaId='+id_category+'&precioMin='+minPrice+'&precioMax='+maxPrice+'&_sort='+sortBy);
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
  public getAllCategory(){
    return this.http.get(this.Url+'getCategory');
  }
  public registerCustomer(oCustomer){
    return this.http.post(this.Url+'register/',oCustomer);
  }
  public postProduct(oProduct){
    return this.http.post(this.Url+'product/',oProduct);
  }
}
