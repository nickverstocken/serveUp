import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ServupService} from '../services/servup.service';
import {Category} from '../models/Category';

@Component({
  selector: 'app-search-service',
  templateUrl: './search-service.component.html',
  styleUrls: ['./search-service.component.scss']
})
export class SearchServiceComponent implements OnInit {
  categories: Category[];
  constructor(private auth: AuthService, private serveUpService: ServupService) { }

  ngOnInit() {

    this.serveUpService.getCategories().subscribe(
      result => {
        this.categories = result.categories;
      }
    );
  }

}
