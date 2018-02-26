import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../servicio.service';
import { Customer } from '../clases/customer';
import { Address } from '../clases/address';
import {AuthService} from 'angular4-social-login';
import {FacebookLoginProvider,GoogleLoginProvider} from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';
import { Router } from '@angular/router';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  providers:[ServicioService]
})
export class HeaderComponent implements OnInit {
  public address: Address = new Address();
  public customer: Customer=new Customer();

  private user: SocialUser = new SocialUser();
  private loggedIn: boolean;
  public responseCustomer: any[] = [];
  public state: any[] = [];
  public provincia: any[] = [];
  public distrito: any[] = [];

  public email = '';
  public passwd = '';
  
  public sMessageSocial = "";
  public registerFarom = "form";
  public sUrlProfile = '/user-profile/';


  constructor(private appService: ServicioService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user)=>{
      this.user = <SocialUser>user;
      if(this.user != null){
        this.customer.email = this.user.email;
        this.appService.loginSocial(this.customer).subscribe(response => {
          this.customer.firstname = this.user.firstName;
          this.customer.lastname = this.user.lastName;
          this.customer.email = this.user.email;
          if (response.json().resp === true){
            this.signCustomer(this.customer.email,'','social');
          }else{
            this.sMessageSocial = "Complete su registro ..";
            this.customer.login_media = "social";
            this.customer.passwd = '*******';
            $("#registrar").modal("show");
          }
        });
      }
    });
    const storage = localStorage.getItem('user');
    if(storage !=null && storage.length > 0){
      this.customer = <Customer>JSON.parse(localStorage.getItem('user'));
      this.customer.address = this.address;
      this.customer.id_customer = this.customer.id_customer;

    }
    this.getAllState();
    //console.log(this.customer.id_customer);
  
  }
  grabar(){
    //console.log(this.customer.id_customer);
    this.customer.address.lastname=this.customer.lastname;
    this.customer.address.firstname=this.customer.firstname;
    this.customer.address.company=this.customer.company;
    this.customer.id_customer=this.customer.id_customer
    this.appService.registerCustomer(this.customer).subscribe(rest=>{
      if(Object.keys(rest.json()).length >0){
        this.signCustomer(this.customer.email,this.customer.passwd,this.customer.login_media);
        jQuery('#registrar').modal('hide');
      }else{
        console.log('.l.')
      }
      //console.log(rest);
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

  signCustomer(email,passwd,login_media):void{
    this.customer.email = email;
    this.customer.passwd = passwd;
    this.customer.login_media = login_media;
    this.appService.loginCustomer(this.customer).subscribe(rest=>{
      if(Object.keys(rest.json()).length ===0){
        alert("Usuario y/o contraseña incorrecto");
      }else{
        console.log(this.customer); 
        this.customer = rest.json();
        this.customer.address = this.address;
        localStorage.setItem('user',JSON.stringify(rest.json()));
        jQuery('#login').modal('hide');
        this.router.navigateByUrl(this.sUrlProfile + this.customer.id_customer.toString());
      }
    });
  }

  logout(){
    localStorage.removeItem('user');
    this.customer = new Customer();
  }
  getAllState(){
    this.appService.getState().subscribe(rest=>{
      this.state= rest.json();
      console.log(rest);
    });
  }
  getAllProvincia(id_state){
    this.appService.getProvincia(id_state).subscribe(rest=>{
      this.provincia = rest.json();
      console.log(rest);
    });
  }
  getAllDistrito(id_provincia){
    this.appService.getDistrito(id_provincia).subscribe(rest=>{
      this.distrito = rest.json();
      console.log(rest);
    });
  }
}
