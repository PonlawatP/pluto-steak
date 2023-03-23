import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/middle/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private serv: DataService) {}

  ngOnInit(): void {}
  upTop() {
    window.document.body.scrollTop = 0;
    window.document.documentElement.scrollTop = 0;
  }
}
