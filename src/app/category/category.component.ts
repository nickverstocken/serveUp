import {Component, HostListener, OnInit} from '@angular/core';
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
  mobile;
  innerWidth;
  loading = true;
  constructor(private route: ActivatedRoute, private location: Location, private serveUpService: ServupService) { }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 800) {
      this.mobile = true;
    }else{
      this.mobile = false;
    }
  }
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 800) {
      this.mobile = true;
    }
    this.route.params.subscribe(
      params => {
        this.catId = params['id'];
        this.serveUpService.getCategory(this.catId).subscribe(result => {
          this.category = result.category.data;
          this.category.subcategories = result.category.data.subcategories.data;

          },
          error => {
          this.loading = false;
          if(error.status === 404){
            this.location.back();
          }

          },
          () => {
          this.loading = false;
          });
      });
  }
  goBack(){
    this.location.back();
  }
}
