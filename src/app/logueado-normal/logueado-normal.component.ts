import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-logueado-normal',
  templateUrl: './logueado-normal.component.html',
  styleUrls: ['./logueado-normal.component.css']
})
export class LogueadoNormalComponent implements OnInit {
  
  constructor() { }
  opened=false;
  ngOnInit() {
  }
  mode = new FormControl('over');
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
