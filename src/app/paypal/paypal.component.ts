import { Component, OnInit,Input } from '@angular/core';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import {saveAs as importedSaveAs} from "file-saver";
import {ObtenerBalanceService} from '../servicios/obtener-balance.service'
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
  
})

export class PaypalComponent implements OnInit {
  
  public payPalConfig?: PayPalConfig;
  precioAlbum1;
  ngOnInit(): void {
    this.initConfig();
  }
  constructor(
    private balance1:ObtenerBalanceService,
    private cookie:CookieService,
  ){
    let i=0;
    let usuario=this.cookie.get("nombre");
    this.balance1.getBalance()
      .subscribe(balancess =>{
        Object.keys(balancess).forEach(function(key) {
          if (balancess[i].usuario==usuario) {
            alert("ENTRO");
          }
        });
    });
  }

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'asd',
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
        //AQUI ESTA EL PRECIO DEL ALBUM, FALTA SIMULAR
        this.precioAlbum1=localStorage.getItem("precioAlbum");

        
      },
      transactions: [{
        amount: {
          currency: 'MXN',
          total: 0
        }
      }]
    });
  }

}
