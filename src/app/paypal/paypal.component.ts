import { Component, OnInit } from '@angular/core';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})

export class PaypalComponent implements OnInit {

  public payPalConfig?: PayPalConfig;

  ngOnInit(): void {
    this.initConfig();
  }
  constructor(){}

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'AXZtaVxPPJxoy2PvgQBE4ZXk2sLaJ8-YrpEGrI4QXytvL5mZ4Vje6qUIKVE2mjz0oGFiMoViQ7iI1axp',
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
        
      },
      transactions: [{
        amount: {
          currency: 'MXN',
          total: 9
        }
      }]
    });
  }

}
