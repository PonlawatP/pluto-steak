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
  

  incPrice(numb:number){
    this.serv.cartData.cart_price+=numb
  }

  ngOnInit(): void {
  }

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
        this.incPrice(res.price)
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
        this.incPrice(-res.price)
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
                this.incPrice(-(res.price*res.amount))
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
    let user = JSON.parse(localStorage.getItem('auth_data') || '{}')

    Swal.fire({
      title: 'กรอกรายละเอียดการส่งอาหาร',
      html:
        `
        <form>
          <div class="mb-4 ">
            <label class="block text-left font-bold mb-2 "  for="name">
              ชื่อ-สกุล
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 shadow-md px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name" type="text" placeholder="ชื่อ-สกุล" value="${user.name}" />
          </div>
          <div class="mb-4">
            <label class="block text-left font-bold mb-2" for="address">
              ที่อยู่
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 shadow-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address" type="text" placeholder="ที่อยู่" value="${(user.address != null ? user.address : '')}"/>
          </div>
          <div class="mb-4">
            <label class="block text-left font-bold mb-2" for="tel">
              เบอร์โทร
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 shadow-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tel" type="text" placeholder="เบอร์โทร" value="${user.phone_number}"/>
          </div>
        </form>
        `,
      showCancelButton: true,
      confirmButtonColor: 'rgb(105 163 59)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('name') as HTMLInputElement).value
        const phone = (document.getElementById('tel') as HTMLInputElement).value
        const addr = (document.getElementById('address') as HTMLInputElement).value
        if (!name || !phone || !addr) {
          Swal.showValidationMessage(`โปรดใส่ข้อมูลให้ครบ`)
        }
        return { name, phone, addr }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // send data to the server using Ajax or other methods
        console.log(result.value)

        let username = JSON.parse(localStorage.getItem('auth_data') || '{username:""}').username
        let url = 'http://localhost/plutosteak-api/account/cart';
        this.http
          .put(
            url,
            {
              "customer_name": result.value?.name,
              "phone_number": result.value?.phone,
              "address": result.value?.addr
            },
            {
              headers: { Username: username },
            }
          )
          .subscribe((response: any) => {
            user.name = result.value?.name;
            user.phone_number = result.value?.phone;
            user.address = result.value?.addr;

            localStorage.setItem('auth_data', JSON.stringify(user));
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
          },
          error => {
              Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'โปรดใส่ข้อมูลให้ถูกต้อง',
                timer: 2000,
                timerProgressBar: true,
              });
          });
      }
    })
    
  }
}
