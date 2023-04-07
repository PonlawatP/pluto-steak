import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  usr = {
    username: "",
    password: "",
    phone: "",
    firstname: "",
    lastname: ""
  }
  // <input class="text-box" type="text" placeholder="ชื่อผู้ใช้(Username)" name="username"require>
  // <input class="text-box" type="password" placeholder="รหัสผ่าน(Password)" name="password" require>
  // <input class="text-box" type="text" placeholder="เบอร์โทร(phone)" name="phone" require>
  // <input class="text-box" type="text" placeholder="ชื่อ(Firstname)" name="firstname"require>
  // <input class="text-box" type="text" placeholder="นามสกุล(Lastname)" name="lastname"require>
  constructor(private http: HttpClient, private route:Router) { }

  ngOnInit(): void {
  }

  
  submit() {
    Swal.fire({
      title: 'รอสักครู่',
      text: 'กำลังตรวจสอบการลงทะเบียน',
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    let url = 'http://localhost/plutosteak-api/account';
    this.http
      .post(url, { 
        "username": this.usr.username,
        "name": this.usr.firstname + " " + this.usr.lastname,
        "phone_number": this.usr.phone,
        "password": this.usr.password,
       })
      .subscribe((response: any) => {
        // console.log(response);
        if (response.success) {
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'ลงทะเบียนสำเร็จ',
              timer: 2000,
              timerProgressBar: true,
              didClose: () => {
                this.route.navigate(['login']);
              },
            });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ลงทะเบียนผิดพลาด',
            text: 'มีชื่อผู้ใช้นี้อยู่แล้ว',
            timer: 2000,
            timerProgressBar: true,
          });
        }
      });
  }

}
