import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuData: any;

  constructor(private http: HttpClient) {
    let url = 'http://localhost/plutosteak-api/menu';
    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      this.menuData = Object.keys(data);
    });
  }

  ngOnInit(): void {}
}
