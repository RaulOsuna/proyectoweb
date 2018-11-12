import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-logueado-musico',
  templateUrl: './logueado-musico.component.html',
  styleUrls: ['./logueado-musico.component.css']
})
export class LogueadoMusicoComponent implements OnInit {

  constructor(
    private cookie:CookieService
  ) { }

  ngOnInit() {
    
  }

}
