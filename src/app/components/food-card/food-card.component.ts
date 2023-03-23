import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-food-card',
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.scss'],
})
export class FoodCardComponent implements OnInit {
  @Input() data = { id: 0, name: '', type: '', price: 0, img: '' };
  temp_status = 0;

  constructor(private route: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('auth_data')) {
      this.temp_status = JSON.parse(
        localStorage.getItem('auth_data') || '{is_staff:0}'
      ).is_staff;
    }
  }

  handleBtn() {
    if (this.temp_status == 1) {
      this.route.navigate(['admin']);
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'เพิ่มการเตรียมสั่งสินค้าแล้ว',
      text: 'ขอบคุณครับ',
      showCloseButton: false,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  }
}
