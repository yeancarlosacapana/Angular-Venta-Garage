import { Component, OnInit , AfterViewInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServicioService} from '../servicio.service';
import { Product } from '../clases/product';
import { FilterProduct } from '../clases/filter-product';

// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass'],
  providers:[ServicioService]
})
export class ProductComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    let iPrecio1 = $("#amount").val();
    let iPrecio2 = $("#amount1").val();
    
    $("#slider-range" ).slider({
      range: true,
      min: 0,
      max: 50000,
      values: [ parseInt(iPrecio1), parseInt(iPrecio2) ],
      slide: function( event, ui ) {
        $("#amount").val(ui.values[0]);
        $("#amount1").val(ui.values[1]);
      },
      change:  function( event, ui ) {
        console.log(ui);
        $("#amount").val(ui.values[0]);
        $("#amount1").val(ui.values[1]);
      }
    });
  }

  private oFilterProduct:FilterProduct=new FilterProduct();
  private categoryName : string;
  private id_category   : number = 0;
  private name  : string;
  private filtertype : string;
  private sortBy : string;
  public listarProduct:Product[]=[];
  public eProduct:Product = new Product();
  public getSubCategory:any[]=[];

  constructor(private route:ActivatedRoute , private AppService:ServicioService) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.filtertype = params['type'];
      if(this.filtertype == 'cat'){
        this.id_category = +params['value'];
        this.get(this.id_category);
        this.filterSubCategory(this.id_category);
      }else{
        this.name = (params['value']);
        this.getByName(this.name);
      }

        
    })
    
  }

  ejecutarMetodo(){
    console.log("aqui");
  }
  public get(id_category):void{
    this.AppService.getProductByIdCategory(id_category).subscribe(rest=>{
      this.setProduct(rest.json());
      console.log(this.listarProduct);
    });
  }

  public getByName(productName: string): void {
    this.AppService.getProductName(productName).subscribe(rest=>{
      this.setProduct(rest.json());
    });
  }
  setProduct(data: any): any {
    this.listarProduct = <Product[]>data;
    if(this.listarProduct){
      if(this.listarProduct.length > 0)
        this.categoryName = this.listarProduct[0].category;
    }

  }
  getfiltePrice(){
    //console.log(this.oFilterProduct)
    if(this.filtertype == 'cat'){
        //this.oFilterProduct.sortBy = this.sortBy;
        this.oFilterProduct.id_category = this.id_category; 
        this.oFilterProduct.priceMin = +(<HTMLInputElement>document.getElementById('amount')).value;
        this.oFilterProduct.priceMax = +(<HTMLInputElement>document.getElementById('amount1')).value;
        this.AppService.getProductPriceByCategory(this.oFilterProduct.id_category,this.oFilterProduct.priceMin,this.oFilterProduct.priceMax,this.oFilterProduct.sortBy).subscribe(rest=>{
          this.setProduct(rest.json());
      }); 
    }
    if(this.filtertype =='name'){
      //this.oFilterProduct.sortBy = this.sortBy;
      this.oFilterProduct.name = this.name;
      this.oFilterProduct.priceMin = +(<HTMLInputElement>document.getElementById('amount')).value;
      this.oFilterProduct.priceMax = +(<HTMLInputElement>document.getElementById('amount1')).value;
      this.AppService.getProductPriceByName(this.oFilterProduct.name,this.oFilterProduct.priceMin,this.oFilterProduct.priceMax,this.oFilterProduct.sortBy).subscribe(rest=>{
        this.setProduct(rest.json());
      }); 
    }
  }

  busquedaporFecha(oFilterProduct:FilterProduct){
    oFilterProduct.name = this.name;
    oFilterProduct.id_category = this.id_category;
    oFilterProduct.typeFilter = this.filtertype;
    this.AppService.getDateByProduct(oFilterProduct).subscribe(rest=>{
      this.setProduct(rest.json());
    });
  }
  filterSubCategory(id_category){
    this.AppService.getSubCategory(id_category).subscribe(rest=>{
      this.getSubCategory= rest.json();
      console.log(rest);
    });
  }

}
