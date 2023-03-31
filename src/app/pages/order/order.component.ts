import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BillItem } from 'src/app/interfaces/bill-item';
import { DataService } from 'src/app/middle/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  constructor(public serv: DataService, private http: HttpClient) {}

  ngOnInit(): void {}
  showDetail(data: BillItem) {
    // Create the description text using template literals
    let description = '<div style="text-align:left" class="relative w-full">';
    description +=
      '<div class="relative w-full flex justify-between pb-4"><p>รายการอาหาร</p><p>จำนวน</p></div>'; // header row
    data.orders.forEach((item) => {
      description += `<div class="relative w-full flex justify-between"><p>${item.name}</p><p class="w-14 text-center">${item.amount}</p></div>`; // data rows
    });
    description += `<div class="pt-8"><p>แก้ไขสถานะ</p></div>`; // data rows
    description += '</div>';
    Swal.fire({
      title: 'ข้อมูลบิลเลขที่ ' + data.bid,
      html: description,
      confirmButtonColor: 'rgb(105 163 59)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      input: 'select',
      inputOptions: {
        1: 'รอยืนยัน',
        2: 'กำลังปรุง',
        3: 'กำลังส่ง',
        4: 'ส่งแล้ว',
        5: 'ยกเลิก',
      },
      inputPlaceholder: 'Select a status',
      showCancelButton: true,
      allowOutsideClick: false,
      inputValue: data.status,
      inputValidator: (value) => {
        if (!value) {
          return 'You must select a status!';
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedValue = result.value;

        Swal.fire({
          title: 'รอสักครู่',
          text: '',
          showConfirmButton: false,
          allowOutsideClick: false,
        });

        let username = JSON.parse(
          localStorage.getItem('auth_data') || '{username:""}'
        ).username;
        let url = 'http://localhost/plutosteak-api/account/order/' + data.bid;
        this.http
          .post(
            url,
            { status: selectedValue },
            {
              headers: { Username: username },
            }
          )
          .subscribe((response: any) => {
            this.serv.reloadCartData();
            Swal.close();
            Swal.fire({
              title: 'แก้ไขข้อมูลสำเร็จ',
              icon: 'success',
            });
            this.serv.reloadOrderData();
          });
      }
    });
  }
}
