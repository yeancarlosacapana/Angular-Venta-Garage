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
  public productLang = ProductLang;
  public oCustomerProduct = new CustomerProduct();
  public customer = new Customer();
  public addProduct = new AddProduct();
  public isFree = true;
  public image: any[] = [];
  private urlPost: string;
  private errorCulqiMessage: string;
  private successCulqiMessage: string;
  private culqiPagoOk = false;
  private costImage = 0;

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
    this.AppService.getAllCategory().subscribe(rest => {
      // console.log('ejecutando');
      this.listarAllCategory = rest.json();
      // console.log(this.listarAllCategory);
    });
    this.image.push({index: 0, class: false});
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
      data_culqi = window['data_culqi']; // Referencia de metodo culqi en index.html
      if (data_culqi !== undefined && data_culqi !== '' && data_culqi !== null) {
        clearInterval(interval);
        window['data_culqi'] = undefined;
        console.log(data_culqi);
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
    this.addProduct.imgData = [];
    for (let i in this.image) {
      this.addProduct.imgData.push((document.getElementById('img-principal-' + this.image[i].index) as HTMLImageElement).src)
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
    this.AppService.postProduct(this.addProduct).subscribe(response => {
      console.log(response.json());
      if(Object.keys(response.json()).length > 0){
        this.router.navigateByUrl("/user-profile/" + this.customer.id_customer);
      }else
        alert(response.json().resp);
    });
  }

  showCulqi(valuePago){
    if (valuePago === 1 ){
      this.isFree = true;
      this.image = [];
      this.image.push({index: 0, class: false});
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
    this.image = [];
    for(let i = 0 ;i <= photoNumber - 1 ;i++){
      if(i === 0){
        this.image.push({index: i, class: false});
      }else{
        this.image.push({index: i, class: true});
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
    }else if(product.imgData.length === 0){
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
      this.addProduct.orderGarage = new OrderGarage();
      this.addProduct.orderGarage.method_payout = product.method_payout;
      console.log(response.json());
    });
  }
}
