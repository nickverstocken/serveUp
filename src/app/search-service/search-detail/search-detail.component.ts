import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {ServupService} from '../../services/servup.service';
import {SubCategory} from '../../models/SubCategory';
import {FormBuilder,  Validators} from '@angular/forms';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss'],
  providers: [DatePipe]
})
export class SearchDetailComponent implements OnInit {
  user: User;
  subcat: SubCategory;
  formRequest;
  frmCity;
  nearbyCount = 0;
  nearbyIds = [];
  yesterday = ( d => new Date(d.setDate(d.getDate() - 1)) )(new Date)
  dateOptions: INgxMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    showTodayBtn: false,
    sunHighlight: false,
    disableUntil : {year: this.yesterday.getFullYear(), month: this.yesterday.getMonth() + 1, day: this.yesterday.getDate()}
  };
  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, private serveUpService: ServupService,  private fb: FormBuilder, private datePipe: DatePipe) {

  }

  ngOnInit() {
    this.auth.currentUser.subscribe(
      user => {
        if(user.id){
          this.user = user;
          this.buildRequestForm();
        }
      });
    this.route.params.map(params => params['id'])
      .subscribe((id) => {
        this.serveUpService.getSubCategory(id).subscribe(
          result => {
            this.subcat = result.subcategory;

            this.getServicesNearbyCount();
          },
          error => {
            if(error.status === 404){
              this.router.navigate(['']);
            }
          }
        );
      });
  }
  buildRequestForm() {
    this.formRequest = this.fb.group({
      city: this.fb.group({
        id: [this.user.city_id, Validators.required],
        name: [this.user.city.name, Validators.required],
        zip: [this.user.city.zip, [Validators.required, Validators.minLength(4)]],
      }),
      due_date: [null, Validators.required],
      description: [null, Validators.required]
    });
    this.formRequest.controls.city.get('zip').valueChanges.subscribe(value => {
      if(typeof (value) === 'number'){
        this.getServicesNearbyCount();
      }
    });
  }
  getServicesNearbyCount(){
      this.serveUpService.getServicesNearbyCount(this.subcat.id, this.formRequest.controls.city.controls.name.value).subscribe(
        result => {
          this.nearbyCount = result.count;
          this.nearbyIds = result.ids;
        });
  }
  sendRequest(){
    const frmData = this.assignFormData(this.formRequest.value);
    frmData.append('ids', JSON.stringify(this.nearbyIds));
    frmData.append('city_id', this.formRequest.controls.city.controls.id.value);
    frmData.append('due_date',  this.datePipe.transform(this.formRequest.controls.due_date.value.jsdate, 'yyyy-MM-dd'));
    frmData.append('title', this.subcat.name);
    this.serveUpService.saveRequest(frmData).subscribe(
      result => {
        this.router.navigate(['projects']);
      });
  }
  assignFormData(model) {
    const frmData = new FormData();
    for (const key of Object.keys(model)) {
      frmData.append(key, model[key]);
    }
    return frmData;
  }
}
