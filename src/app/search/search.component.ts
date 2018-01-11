import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ServicioService} from '../servicio.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
  providers:[ServicioService]
})
export class SearchComponent implements OnInit {
  private searchName : string;
  private urlProduct: string;
  constructor(private route:ActivatedRoute ,private router: Router, private AppService:ServicioService) { }
  public prueba :any; 
  ngOnInit() {
  }

  buscar(productName):void{
    ///this.urlProduct = this.route.snapshot.queryParams['returnUrl'] || '/';oduct
    if(productName =="" || productName == undefined){
      return ;
    }
    this.urlProduct = "/category-product/name/"+productName;
    this.router.navigateByUrl(this.urlProduct);

  }

  verificarEnter(eEvent):boolean{
    eEvent.preventDefault();
    return false;
  }
}
