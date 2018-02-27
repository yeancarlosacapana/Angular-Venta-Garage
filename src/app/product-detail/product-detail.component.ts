import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServicioService} from '../servicio.service';
import { Customer } from '../clases/customer';


// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass'],
  providers:[ServicioService]
})
export class ProductDetailComponent implements OnInit,AfterViewInit {

  public supplierContactInfo = false;
  public eCustomer = new Customer();

  ngAfterViewInit(): void {
    jQuery(document).ready(function($) {
      $('#myCarousel').carousel({interval: 0});
    });
  }


  public id_product:number = 0;
  public detailProduct:any[]=[];
  constructor(private route:ActivatedRoute , private AppService:ServicioService) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id_product = +params['value'];
      this.get(this.id_product);
    });
  }
  public get(id_product):void{
    this.AppService.getProductById(id_product).subscribe(rest=>{
      
      this.detailProduct= rest.json();
      this.eCustomer = <Customer>this.detailProduct["customer"];
      console.log(this.detailProduct);
    });
  }

  cambiarVistaCarousel(control){
      var id_selector = $(control).attr("id");
      try {
        var id = /-(\d+)$/.exec(id_selector)[1];
        jQuery('#myCarousel').carousel(parseInt(id));
      }catch (e) {
      // console.log('Regex failed!', e);
      } 
    $('#myCarousel').on('slid.bs.carousel', function (e) {
      var id = $('.item.active').data('slide-number');
        $('#carousel-text').html($('#slide-content-'+id).html());
    });
  }
  contactSupplier(isVisible: boolean){
    this.supplierContactInfo = (this.supplierContactInfo != isVisible);
  }
}
