import { Component } from '@angular/core';
import { faLocationArrow, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pluto-steak';
  faLocationArrow = faLocationArrow;
  faPhone = faPhone;
}
