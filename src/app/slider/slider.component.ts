import { Component, OnInit } from '@angular/core';
import {ServicioService} from '../servicio.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.sass'],
  providers:[ServicioService]
})
export class SliderComponent implements OnInit {
  public listarSlider:any[]=[];
  constructor(private AppService:ServicioService) { }

  ngOnInit() {
    this.AppService.getSlider().subscribe(rest=>{
      //console.log('ejecutando');
      this.listarSlider = rest.json();
      console.log(this.listarSlider);
    });
  }

}
