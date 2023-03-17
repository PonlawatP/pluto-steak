import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private route: Router) {}

  username: string = '';
  password: string = '';

  ngOnInit(): void {
    // if (localStorage.getItem('auth_data')) {
    //   localStorage.removeItem('auth_data');
    // }
  }

  checkLogin() {
    Swal.fire({
      title: 'รอสักครู่',
      text: 'กำลังตรวจสอบการเข้าสู่ระบบ',
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    let url = 'http://localhost/plutosteak-api/account/login';
    this.http
      .post(url, { username: this.username, password: this.password })
      .subscribe((response: any) => {
        // console.log(response);
        if (response.success) {
          Swal.close();
          localStorage.setItem('auth_data', JSON.stringify(response.data));
          Swal.fire({
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
            timer: 2000,
            timerProgressBar: true,
            didClose: () => {
              this.route.navigate(['']);
            },
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'เข้าสู่ระบบผิดพลาด',
            text: 'โปรดลองใหม่อีกครั้ง',
            timer: 2000,
            timerProgressBar: true,
          });
        }
      });
  }
}
