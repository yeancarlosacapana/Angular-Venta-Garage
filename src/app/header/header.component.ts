import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../servicio.service';
import { Customer } from '../clases/customer';
import { Address } from '../clases/address';
import {AuthService} from 'angular4-social-login';
import {FacebookLoginProvider,GoogleLoginProvider} from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  providers:[ServicioService]
})
export class HeaderComponent implements OnInit {
  public address :Address = new Address();
  public customer : Customer=new Customer();

  private user : SocialUser = new SocialUser();
  private loggedIn : boolean;
  public responseCustomer:any[] = [];

  email:string= '';
  passwd:string= '';


  constructor(private appService:ServicioService,private authService:AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
    let storage =localStorage.getItem('user');
    if(storage!=null && storage.length > 0){
      this.customer = <Customer>JSON.parse(localStorage.getItem('user'));
      this.customer.address = this.address;
      this.customer.id_customer = this.customer.id_customer;
    }
    console.log(this.customer.id_customer);
  
  }
  grabar(){
    console.log(this.customer.id_customer);
    this.customer.address.lastname=this.customer.lastname;
    this.customer.address.firstname=this.customer.firstname;
    this.customer.address.company=this.customer.company;
    this.customer.id_customer=this.customer.id_customer
    this.appService.registerCustomer(this.customer).subscribe(rest=>{
      console.log(rest);
    });
  }
  sigInWithGoogle():void{
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signInWithFB():void{
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signOut():void{
    this.authService.signOut();
  }

  signCustomer(email,passwd):void{
    console.log(this.customer);
    this.customer.email = email;
    this.customer.passwd = passwd;
    this.appService.loginCustomer(this.customer).subscribe(rest=>{
      if(Object.keys(rest.json()).length ===0){
        console.log('user not found')
      }else{
        this.customer=rest.json();
        this.customer.address = this.address;
        localStorage.setItem('user',JSON.stringify(rest.json()));
        jQuery('#login').modal('hide');
      }
    });
  }

  logout(){
    localStorage.removeItem('user');
    this.customer = new Customer();
  }


}
