import { Component, OnInit , AfterViewInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ServicioService} from '../servicio.service';
import {AddProduct} from '../clases/add-product';
import {ProductLang} from '../clases/product-lang';
import {Image} from '../clases/image';
import { Customer } from '../clases/customer';
import { CustomerProduct } from '../clases/customer-product';
import { OrderGarage } from '../clases/order-garage';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;
declare var Culqi: any;


@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.sass'],
  providers: [ServicioService]
})
export class PostProductComponent implements OnInit, AfterViewInit {

  public listarAllCategory: any[] = [];
  public listSubCategoria: any[];
  public productLang = ProductLang;
  public oCustomerProduct = new CustomerProduct();
  public customer = new Customer();
  public addProduct = new AddProduct();
  public eImage = new Image();

  public isFree = true;
  public listImage: Image[] = [];
  private urlPost: string;
  private errorCulqiMessage: string;
  private successCulqiMessage: string;
  private culqiPagoOk = false;
  private costImage = 0;
  private imageUrlBig = "assets/img/garage-img-big.png";
  private imageUrlSmall = "assets/img/garage-img-small.png";

  constructor(private AppService: ServicioService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.addProduct.id_product = +params['id_product'];
      this.customer.id_customer = +params['id_customer'];
      if (this.addProduct.id_product > 0) {
        this.getProductMeById(this.customer.id_customer, this.addProduct.id_product);
      }
    });
    this.customer = JSON.parse(localStorage.getItem('user')) as Customer;
    if (this.customer === undefined || this.customer == null) {
      return ;
    }
    this.AppService.getCategory().subscribe(rest => {
      // console.log('ejecutando');
      this.listarAllCategory = rest.json();
      // console.log(this.listarAllCategory);
    });
    this.eImage.class = false;
    this.eImage.image = this.imageUrlBig;
    this.listImage.push(this.eImage);
  }

  ngAfterViewInit(): void {
    Culqi.init();
  }
  
  realizarPago(): void {
    let data_culqi = null;
    this.errorCulqiMessage = undefined;
    this.successCulqiMessage = undefined;
    Culqi.createToken();
    const interval = setInterval(() => {
      data_culqi = window['data_culqi']; // se obtiene  desde la Referencia de metodo culqi en index.html
      if (data_culqi !== undefined && data_culqi !== '' && data_culqi !== null) {
        clearInterval(interval);
        window['data_culqi'] = undefined;
        if (data_culqi.error !== null && data_culqi.error !== undefined) {
          this.errorCulqiMessage = data_culqi.error.user_message;
        }else {
          const culquiInfo = { id: data_culqi.token.id, email: data_culqi.token.email, cost: this.costImage };
          this.AppService.culqiPago({ product: this.addProduct, culqi: culquiInfo }).subscribe(response => {
            const culqiSuccess = response;
            if (culqiSuccess.object === 'charge') {
              this.successCulqiMessage = culqiSuccess.outcome.user_message;
              this.culqiPagoOk = true;
            }else{
              this.errorCulqiMessage = culqiSuccess.outcome.user_message;
            }
          }, error => {
            const errorCulqi = JSON.parse(error.json());
            this.errorCulqiMessage = errorCulqi.user_message;
          });
        }
      }
    }, 1000);
  }

  grabarProducto(elemTermCondition: boolean) {
    if (!elemTermCondition) {
      alert('Acepte los terminos y condiciones');
      return;
    }
    this.addProduct.image = [];
    for (let i in this.listImage) {
      const controlImage = (document.getElementById('img-principal-' + this.listImage[i].id_image) as HTMLImageElement);
      const image = this.getImage(parseInt(controlImage.alt),false,controlImage.src);
      this.addProduct.image.push(image);
    }

    if (!this.formValidate(this.addProduct)){
      return;
    }

    if (this.isFree === false && this.culqiPagoOk === false) {
      alert("realiza el pago, para poder publicar su producto");
      return;
    }
    
    this.addProduct.customerProduct.id_customer = this.customer.id_customer;
    this.addProduct.orderGarage.pasarella = this.isFree?'Free':'Culqi';
    this.addProduct.orderGarage.total = this.costImage;
    if(this.addProduct.id_product == 0){
      this.AppService.postProduct(this.addProduct).subscribe(response => {
        this.validateRedirectSaveAndUpdProduct(response)
      });
    }else{
      this.AppService.putProduct(this.addProduct).subscribe(response => {
        this.validateRedirectSaveAndUpdProduct(response);
      });
    }
  }

  validateRedirectSaveAndUpdProduct(response: any): void {
    if(Object.keys(response.json()).length > 0){
      this.router.navigateByUrl("/user-profile/" + this.customer.id_customer);
    }else
      alert(response.json().resp);
  }
  showCulqi(valuePago){
    if (valuePago === 1 ){
      this.isFree = true;
      this.listImage = [];
      const oImage = this.getImage(0,false,this.imageUrlBig);
      this.listImage.push(oImage);
    }
    else
      this.isFree = false;
  }

  accepted(isChecked){
    return isChecked;
  }

  uploadImage(images, index){
    const ofile = images.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e){
      $('#img-principal-' + index).attr("src", reader.result);
    };
    if(ofile){
      reader.readAsDataURL(ofile);  
    }
  }

  addImages(photoNumber: number, costImage: number){
    this.costImage = costImage;
    this.listImage = [];
    for(let i = 0 ;i <= photoNumber - 1 ;i++){
      if(i === 0){
        const oImage = this.getImage(i,false,this.imageUrlBig);
        this.listImage.push(oImage);
      }else{
        const oImage = this.getImage(i,true,this.imageUrlSmall);
        this.listImage.push(oImage);
      }
    }
  }

  formValidate(product: AddProduct): boolean {
    let response = true;
    if (product.id_category_default === undefined || product.id_category_default == 0) {
      alert("Seleccione la categoria");
      response = false;
    } else if (product.productLang.name === '' || Object.keys(product.productLang).length == 0){
      alert("Ingrese el nombre de producto");
      response = false;
    } else if (product.productLang.description === '' || product.productLang.description === undefined){
      alert("Ingresa descripción del producto");
      response = false;
    }else if(product.price === 0){
      alert("Ingresa el precio del producto");
      response = false;
    }else if(product.image.length === 0){
      alert(this.isFree?"Selecciona una imagen":"Selecciona uno o mas imagenes");
      response = false;
    }
    return response;
  }

  getProductMeById(id_customer: number, id_product: number) {
    this.oCustomerProduct.id_customer = id_customer;
    this.oCustomerProduct.id_product = id_product;
    this.AppService.getProductByCustomer(this.oCustomerProduct).subscribe(response => {
      const product = response.json();
      this.addProduct = <AddProduct>product;
      this.addProduct.productLang = new ProductLang();
      this.addProduct.productLang.name = product.name;
      this.addProduct.productLang.description = product.description;
      this.addProduct.customerProduct = new CustomerProduct();
      this.addProduct.customerProduct.id_customer = id_customer;
      this.addProduct.customerProduct.id_product = id_product;
      this.addProduct.orderGarage = new OrderGarage();
      this.addProduct.orderGarage.method_payout = product.method_payout;
      this.listImage = [];
      for(let index in this.addProduct.image){
        if(parseInt(index) === 0){
          const image = this.getImage(this.addProduct.image[index].id_image,false,this.addProduct.image[index].image);
          this.listImage.push(image);
        }else{
          const image = this.getImage(this.addProduct.image[index].id_image,true,this.addProduct.image[index].image);
          this.listImage.push(image);
        }
      }
      this.addProduct.id_category_default = this.addProduct.categoryProduct[0].id_category;
      this.getCategoryChild(this.addProduct.id_category_default);
      if(this.addProduct.categoryProduct[1] !== undefined || this.addProduct.categoryProduct[1] !== null)
        this.addProduct.id_sub_category = this.addProduct.categoryProduct[1].id_category;
    });
  }
  private getImage(id_image: number, className: boolean, image: string): Image{
    this.eImage = new Image();
    this.eImage.id_image = id_image;
    this.eImage.image = image;
    this.eImage.class = className;
    return this.eImage;
  }

  public getCategoryChild(id_category: number): void{
    this.AppService.getSubCategory(id_category).subscribe(response => this.listSubCategoria = response.json());
  }
}
