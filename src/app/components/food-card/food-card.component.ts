import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/middle/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
})
export class FoodCardComponent implements OnInit {
  @Input() data = { id: 0, name: '', type: '', price: 0, img: '' };
  temp_status = 0;

  constructor(
    private route: Router,
    private serv: DataService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('auth_data')) {
      this.temp_status = JSON.parse(
        localStorage.getItem('auth_data') || '{is_staff:0}'
      ).is_staff;
    }
  }

  handleBtn(food_id: number) {
    if (this.temp_status == 1) {
      this.route.navigate(['admin']);
      return;
    }

    let username = JSON.parse(
      localStorage.getItem('auth_data') || '{username:""}'
    ).username;
    let url = 'http://localhost/plutosteak-api/account/cart';
    console.log(food_id, '+', 1, username);

    this.http
      .post(
        url,
        {
          fid: food_id,
          type: '+',
          amount: 1,
        },
        {
          headers: { Username: username },
        }
      )
      .subscribe((res: any) => {
        if (res.success) {
          Swal.fire({
            icon: 'success',
            title: 'เพิ่มสินค้าเตรียมสั่งซื้อแล้ว',
            text: 'ขอบคุณครับ',
            showCloseButton: false,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          this.serv.reloadCartData();
        } else {
        }
      });
  }
}
