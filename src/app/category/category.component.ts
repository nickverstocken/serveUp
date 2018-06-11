import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ServupService} from '../services/servup.service';
import {Category} from '../models/Category';
import {SubCategory} from '../models/SubCategory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  catId;
  category: Category;
  constructor(private route: ActivatedRoute, private location: Location, private serveUpService: ServupService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.catId = params['id'];
        this.serveUpService.getCategory(this.catId).subscribe(result => {
          this.category = result.category.data;
          this.category.subcategories = result.category.data.subcategories.data;
          console.log(this.category);
          },
          error => {
            this.location.back();
          });
      });
  }

}
