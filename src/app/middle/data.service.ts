import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  cartData: any;
  reloadCartData() {
    if (localStorage.getItem('auth_data')) {
      let username = JSON.parse(
        localStorage.getItem('auth_data') || '{username:""}'
      ).username;
      let url = 'http://localhost/plutosteak-api/account/cart';
      this.http
        .get(url, { headers: { Username: username } })
        .subscribe((res: any) => {
          console.log(res);
          this.cartData = res;
        });
    }
  }
  cartFunctionHandle(food_id: number, type: string = '+', amount: number = 1) {
    if (localStorage.getItem('auth_data')) {
      let username = JSON.parse(
        localStorage.getItem('auth_data') || '{username:""}'
      ).username;
      let url = 'http://localhost/plutosteak-api/account/cart';
      this.http
        .post(
          url,
          {
            fid: food_id,
            type: type,
            amount: amount,
          },
          {
            headers: { Username: username },
          }
        )
        .subscribe((res: any) => {
          if (res.success) {
            Swal.fire({
              icon: 'success',
              title: 'เพิ่มการเตรียมสั่งสินค้าแล้ว',
              text: 'ขอบคุณครับ',
              showCloseButton: false,
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
          } else {
          }
        });
    }
  }
}
