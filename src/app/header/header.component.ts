import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../servicio.service';
import { Customer } from '../clases/customer';
import { Address } from '../clases/address';
import {AuthService} from 'angular4-social-login';
import {FacebookLoginProvider,GoogleLoginProvider} from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  providers:[ServicioService]
})
export class HeaderComponent implements OnInit {
  public address = Address;
  public customer : Customer=new Customer();

  private user : SocialUser = new SocialUser();
  private loggedIn : boolean;

  constructor(private appService:ServicioService,private authService:AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }
  grabar(){
    console.log(this.customer);
    this.customer.address.lastname=this.customer.lastname;
    this.customer.address.firstname=this.customer.firstname;
    this.customer.address.company=this.customer.company;
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

}
