import { Component, OnInit, AfterViewInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServicioService} from '../servicio.service';


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

  ngAfterViewInit(): void {
    jQuery(document).ready(function($) {
          $('#myCarousel').carousel({
                interval: 0
          });
      $('[id^=carousel-selector-]').click(function () {
        var id_selector = $(this).attr("id");
        try {
          var id = /-(\d+)$/.exec(id_selector)[1];
          // console.log(id_selector, id);
          jQuery('#myCarousel').carousel(parseInt(id));
        }catch (e) {
        // console.log('Regex failed!', e);
        } 
      });
    // When the carousel slides, auto update the text
      $('#myCarousel').on('slid.bs.carousel', function (e) {
        var id = $('.item.active').data('slide-number');
          $('#carousel-text').html($('#slide-content-'+id).html());
      });
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
    });
  }
}
