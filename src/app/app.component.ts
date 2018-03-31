import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ApiService} from './services/api.service';
import {ServupService} from './services/servup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Serve-Up';

  constructor(private auth: AuthService, private serveUpService: ServupService) {

  }

  ngOnInit() {
    console.log('populate');
    this.auth.populate();
    if (localStorage.getItem('selectedService')) {
      // this.partsOrderApi.setOrderPerPage(localStorage.getItem('ordersperpage'))

      const currService = localStorage.getItem('selectedService');
      this.serveUpService.setSelectedService(currService);
    }
  }
}
