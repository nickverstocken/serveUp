import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ServupService} from '../services/servup.service';
import {Category} from '../models/Category';
import {Subject} from 'rxjs/Subject';
import {SubCategory} from '../models/SubCategory';

@Component({
  selector: 'app-search-service',
  templateUrl: './search-service.component.html',
  styleUrls: ['./search-service.component.scss']
})
export class SearchServiceComponent implements OnInit {
  categories: Category[];
  searchTerm = new Subject<string>();
  searchResult: SubCategory[];
  loading = true;
  constructor(private auth: AuthService, private serveUpService: ServupService) {
    this.searchTerm.distinctUntilChanged().subscribe(
      searchtrm => {
        if(searchtrm){
          this.serveUpService.searchCategories(searchtrm).subscribe(
            result => {
              if(result.success){
                this.searchResult = result.subcategories;
              }
            }
          );
        }else{
          this.searchResult = [];
        }

      }
    );
  }

  ngOnInit() {
    this.auth.currentUser.subscribe(result => {
      if(result.id){
        this.serveUpService.getCategories().subscribe(
          result => {
            this.categories = result.categories;
            this.loading = false;
          },
          error => {
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
      }else{
        this.auth.populate();
      }
    });

  }
  search(event){
    const val = event.target.value;
   this.searchTerm.next(val);
  }
}
