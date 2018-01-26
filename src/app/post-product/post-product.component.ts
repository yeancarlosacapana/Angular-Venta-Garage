import { Component, OnInit , AfterViewInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ServicioService} from '../servicio.service';
import {AddProduct} from '../clases/add-product';
import {ProductLang} from '../clases/product-lang';
import {Image} from '../clases/image';
import { Customer } from '../clases/customer';

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
  public customer : Customer=new Customer();
  public addProduct : AddProduct = new AddProduct();
  public isFree : boolean = false;
  public image : any[] = [];

  ngAfterViewInit(): void{}
  private urlPost: string;
  constructor(private AppService:ServicioService,private router: Router) { }

  ngOnInit() {
    this.customer = JSON.parse(localStorage.getItem('user')) as Customer;
    if(this.customer == undefined || this.customer == null){
      return ;
    }
    this.urlPost = "/postproduct/"+this.customer.id_customer;
    this.router.navigateByUrl(this.urlPost);
    this.AppService.getAllCategory().subscribe(rest=>{
      //console.log('ejecutando');
      this.listarAllCategory = rest.json();
      //console.log(this.listarAllCategory);
    });
    this.image.push({index:0,class:false});
  }
  grabar(){
    console.log(this.addProduct);
    let imagenesBase46 = [];
    imagenesBase46.push((document.getElementById('img-principal') as HTMLImageElement).src);
    // imagenesBase46.push((document.getElementById('img-secundaria1') as HTMLImageElement).src);
    // imagenesBase46.push((document.getElementById('img-secundaria2') as HTMLImageElement).src);
    this.addProduct.imgData = imagenesBase46;
    this.addProduct.customerProduct.id_customer=this.customer.id_customer;
    this.AppService.postProduct(this.addProduct).subscribe(rest=>{
      console.log(rest);

    });
  }

  showCulqi(valuepago){
    if(valuepago === 1 ){
      this.isFree = false;
      this.image = [];
      this.image.push({index:0,class:false});
    }
    else
      this.isFree= true;
      
  }
  accepted(ischecked){
    return ischecked;
  }
  uploadImage(images,index){
    const ofile = images.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e){
      var result = reader.result;
      $('#img-principal-'+index).attr("src",result);
    };
    if(ofile){
      reader.readAsDataURL(ofile);  
    }
  }
  addImages(photoNumber:number){
    this.image = [];
    for(let i=0 ;i<=photoNumber-1 ;i++){
      if(i===0){
        this.image.push({index:i,class:false});
      }else{
        this.image.push({index:i,class:true});
      }
        
    }
  }
} 
