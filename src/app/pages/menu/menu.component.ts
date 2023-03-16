import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuData: any;
  menuContent: any;
  faArrowUp = faArrowUp;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    let url = 'http://localhost/plutosteak-api/menu';
    this.http.get(url).subscribe((data: any) => {
      this.menuData = Object.keys(data);
      this.menuContent = data;
    });
  }

  ngOnInit(): void {}
  upTop() {
    window.document.body.scrollTop = 0;
    window.document.documentElement.scrollTop = 0;
  }
}
