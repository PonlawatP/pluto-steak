import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-group',
  templateUrl: './food-group.component.html',
  styleUrls: ['./food-group.component.scss'],
})
export class FoodGroupComponent implements OnInit {
  @Input() group_name = '';
  @Input() group_data = [];

  constructor() {}

  ngOnInit(): void {}
}
