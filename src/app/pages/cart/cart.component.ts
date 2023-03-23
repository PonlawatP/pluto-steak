import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/middle/data.service';

import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(public serv: DataService) {}
  faPlus = faPlusCircle;
  faMinus = faMinusCircle;

  ngOnInit(): void {}
}
