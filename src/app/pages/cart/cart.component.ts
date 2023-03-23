import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/middle/data.service';

import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from 'src/app/interfaces/cart-item';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(public serv: DataService, private http: HttpClient) {}
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
}
