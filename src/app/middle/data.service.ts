import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { CartInterface } from '../interfaces/cart-interface';
import { BillItem } from '../interfaces/bill-item';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  cartData = <CartInterface>{};
  orderData: Array<BillItem> = [];
  getStatusText(status: number): string {
    if (status == 0) {
      return '';
    } else if (status == 1) {
      return 'รอยืนยัน';
    } else if (status == 2) {
      return 'กำลังปรุง';
    } else if (status == 3) {
      return 'กำลังส่ง';
    } else if (status == 4) {
      return 'ส่งแล้ว';
    } else {
      return 'ยกเลิก';
    }
  }
  isStaff(): boolean {
    if (localStorage.getItem('auth_data')) {
      return (
        JSON.parse(localStorage.getItem('auth_data') || '{is_staff:0}')
          .is_staff == 1
      );
    }
    return false;
  }
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
  reloadOrderData() {
    if (localStorage.getItem('auth_data')) {
      let username = JSON.parse(
        localStorage.getItem('auth_data') || '{username:""}'
      ).username;
      if (this.isStaff()) {
        username = '_admin';
      }
      let url = 'http://localhost/plutosteak-api/account/order';
      this.http
        .get(url, { headers: { Username: username } })
        .subscribe((res: any) => {
          console.log(res);
          this.orderData = res.data;
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
