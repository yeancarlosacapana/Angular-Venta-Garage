import { Component, OnInit , AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ServicioService} from '../servicio.service';
import {AddProduct} from '../clases/add-product';
import {ProductLang} from '../clases/product-lang';
import {Image} from '../clases/image';

// Declaramos las variables para jQuery
declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.sass'],
  providers:[ServicioService]
})
export class PostProductComponent implements OnInit ,AfterViewInit{
  public listarAllCategory:any[]=[];
  public productLang = ProductLang;
  public addProduct : AddProduct = new AddProduct();

  ngAfterViewInit(): void{
    $(window).load(function(){
    
      $(function() {
       $('#file-input').change(function(e) {
           addImage(e); 
          });
     
          function addImage(e){
           var file = e.target.files[0],
           imageType = /image.*/;
         
           if (!file.type.match(imageType))
            return;
           var reader = new FileReader();
           reader.onload = fileOnload;
           reader.readAsDataURL(file);
          }
       
          function fileOnload(e) {
           var result=e.target.result;
           $('#img-principal').attr("src",result);
          }
         });
       });
       $(window).load(function(){
        
        $(function() {
         $('#file-input1').change(function(e) {
             addImage(e); 
            });
       
            function addImage(e){
             var file = e.target.files[0],
             imageType = /image.*/;
           
             if (!file.type.match(imageType))
              return;
             var reader = new FileReader();
             reader.onload = fileOnload;
             reader.readAsDataURL(file);
            }
         
            function fileOnload(e) {
             var result=e.target.result;
             $('#img-secundaria1').attr("src",result);
            }
           });
         });
         $(window).load(function(){
           
            $(function() {
             $('#file-input2').change(function(e) {
                 addImage(e); 
                });
           
                function addImage(e){
                 var file = e.target.files[0],
                 imageType = /image.*/;
               
                 if (!file.type.match(imageType))
                  return;
                 var reader = new FileReader();
                 reader.onload = fileOnload;
                 reader.readAsDataURL(file);
                }
             
                function fileOnload(e) {
                 var result=e.target.result;
                 $('#img-secundaria2').attr("src",result);
                }
               });
             });

  }
  
  constructor(private AppService:ServicioService) { }

  ngOnInit() {
    this.AppService.getAllCategory().subscribe(rest=>{
      //console.log('ejecutando');
      this.listarAllCategory = rest.json();
      console.log(this.listarAllCategory);
    });
  }
  grabar(){
    console.log(this.addProduct);
    let imagenesBase46 = [];
    imagenesBase46.push((document.getElementById('img-principal') as HTMLImageElement).src);
    imagenesBase46.push((document.getElementById('img-secundaria1') as HTMLImageElement).src);
    imagenesBase46.push((document.getElementById('img-secundaria2') as HTMLImageElement).src);
    this.addProduct.imgData = imagenesBase46;
    this.AppService.postProduct(this.addProduct).subscribe(rest=>{
      console.log(rest);

    });
  }
} 
