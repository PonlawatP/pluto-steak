import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router) {}
  faBars = faBars;
  faUser = faUser;

  ngOnInit(): void {}

  onClick() {}

  checkAuth() {
    return localStorage.getItem('auth_data') ? true : false;
  }

  logout() {
    localStorage.removeItem('auth_data');
    localStorage.removeItem('cart');
    // window.location.reload();
    this.route.navigateByUrl('/');
  }
}
