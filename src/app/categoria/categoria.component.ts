import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../servicio.service';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.sass'],
  providers:[ServicioService]
})
export class CategoriaComponent implements OnInit {
  public listaCategoria: any[] = [];
  constructor(private AppService: ServicioService) { }

  ngOnInit() {
    this.AppService.getCategory().subscribe(rest => {
      this.listaCategoria = rest.json();
      console.log(this.listaCategoria);
    });
  }

}
