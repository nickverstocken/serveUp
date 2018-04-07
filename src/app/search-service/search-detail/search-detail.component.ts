import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {ServupService} from '../../services/servup.service';
import {SubCategory} from '../../models/SubCategory';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss']
})
export class SearchDetailComponent implements OnInit {
  user: User;
  subcat: SubCategory;
  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, private serveUpService: ServupService) {

  }

  ngOnInit() {
    this.auth.currentUser.subscribe(
      user => {
        if(user.id){
          this.user = user;
        }
      }
    )
    this.route.params.map(params => params['id'])
      .subscribe((id) => {
        console.log(id);
        this.serveUpService.getSubCategory(id).subscribe(
          result => {
            console.log(result);
            this.subcat = result.subcategory;
          },
          error => {
            this.router.navigate(['']);
          }
        )
      });
  }

}
