import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { DataService } from './middle/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pluto-steak';
  constructor(private serv: DataService) {}
  routeChange() {
    this.serv.reloadCartData();
    this.serv.reloadOrderData();
  }
}
