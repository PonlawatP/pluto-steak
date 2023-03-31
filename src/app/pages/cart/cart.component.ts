import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/middle/data.service';

import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from 'src/app/interfaces/cart-item';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    public serv: DataService,
    private http: HttpClient,
    private route: Router
  ) {}
  faPlus = faPlusCircle;
  faMinus = faMinusCircle;

  ngOnInit(): void {}

  incOrder(fid: number) {
    this.serv.cartData?.cart.map((res: CartItem) => {
      if (res.fid == fid) {
        let username = JSON.parse(
          localStorage.getItem('auth_data') || '{username:""}'
        ).username;
        let url = 'http://localhost/plutosteak-api/account/cart';
        this.http
          .post(
            url,
            {
              fid: fid,
              type: '+',
              amount: 1,
            },
            {
              headers: { Username: username },
            }
          )
          .subscribe((res: any) => {});

        res.amount += 1;
        return;
      }
    });
  }
  decOrder(fid: number) {
    this.serv.cartData?.cart.map((res: CartItem) => {
      if (res.fid == fid) {
        if (res.amount <= 1) {
          return;
        }

        let username = JSON.parse(
          localStorage.getItem('auth_data') || '{username:""}'
        ).username;
        let url = 'http://localhost/plutosteak-api/account/cart';
        this.http
          .post(
            url,
            {
              fid: fid,
              type: '-',
              amount: 1,
            },
            {
              headers: { Username: username },
            }
          )
          .subscribe((res: any) => {});
        res.amount -= 1;
        return;
      }
    });
  }
  deleteOrder(fid: number) {
    Swal.fire({
      title: 'ยืนยันการลบรายการสินค้า',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(105 163 59)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'รอสักครู่',
          text: '',
          showConfirmButton: false,
          allowOutsideClick: false,
        });

        let username = JSON.parse(
          localStorage.getItem('auth_data') || '{username:""}'
        ).username;
        let url = 'http://localhost/plutosteak-api/account/cart';
        this.http
          .post(
            url,
            {
              fid: fid,
              type: 'a',
              amount: 1,
            },
            {
              headers: { Username: username },
            }
          )
          .subscribe((response: any) => {
            this.serv.cartData?.cart.map((res: CartItem) => {
              if (res.fid == fid) {
                this.serv.cartData.cart.splice(
                  this.serv.cartData.cart.indexOf(res),
                  1
                );
              }
            });

            Swal.close();
            Swal.fire('ลบรายการสำเร็จ', '', 'success');
          });
      }
    });
  }
  submitOrder() {
    Swal.fire({
      title: 'แสกน Qr Code เพื่อชำระเงิน',
      imageUrl:
        'https://www.avarinshop.com/wp-content/uploads/2018/11/Qr-code-pay-avarin.jpg',
      imageWidth: 400,
      imageHeight: 480,
      imageAlt: 'Custom image',
      showCancelButton: true,
      confirmButtonColor: 'rgb(105 163 59)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'รอสักครู่',
          text: '',
          showConfirmButton: false,
          allowOutsideClick: false,
        });

        let username = JSON.parse(
          localStorage.getItem('auth_data') || '{username:""}'
        ).username;
        let url = 'http://localhost/plutosteak-api/account/cart/submit';
        this.http
          .post(
            url,
            {},
            {
              headers: { Username: username },
            }
          )
          .subscribe((response: any) => {
            this.serv.reloadCartData();
            Swal.close();
            Swal.fire({
              title: 'สั่งซื้อสำเร็จ',
              icon: 'success',
              didClose: () => {
                this.route.navigate(['profile']);
              },
            });
          });
      }
    });
  }
}
