import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {ServupService} from './services/servup.service';
import {SwUpdate} from '@angular/service-worker';

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
    this.auth.populate();
    if (localStorage.getItem('selectedService')) {
      const currService = localStorage.getItem('selectedService');
      this.serveUpService.setSelectedService(currService);
    }
  }
}
