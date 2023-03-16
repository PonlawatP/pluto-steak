import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
})
export class FoodCardComponent implements OnInit {
  @Input() data = { id: 0, name: '', type: '', price: 0, img: '' };
  temp_status = 0;

  constructor() {}

  ngOnInit(): void {}
}
