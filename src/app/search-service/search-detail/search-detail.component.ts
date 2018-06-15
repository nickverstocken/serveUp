import {Component, HostListener, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {ServupService} from '../../services/servup.service';
import {SubCategory} from '../../models/SubCategory';
import {FormBuilder,  Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {ToastServiceService} from '../../services/toast-service.service';
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
  nearbyCount = 0;
  nearbyIds = [];
  today = new Date();
  mobile = false;
  innerWidth;
  constructor(private snackbar: ToastServiceService, private router: Router, private route: ActivatedRoute, private auth: AuthService, private serveUpService: ServupService,  private fb: FormBuilder, private datePipe: DatePipe) {

  }
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
    this.auth.currentUser.subscribe(
      user => {
        if(user.id){
          this.user = user;
          this.buildRequestForm();
        }else{
          this.auth.populate();
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
        lat: [this.user.city.lat],
        lng: [this.user.city.lng]
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
    if(this.nearbyCount > 0){
      const frmData = this.assignFormData(this.formRequest.value);
      frmData.append('ids', JSON.stringify(this.nearbyIds));
      frmData.append('city_id', this.formRequest.controls.city.controls.id.value);
      frmData.append('due_date',  this.datePipe.transform(this.formRequest.controls.due_date.value, 'yyyy-MM-dd'));
      frmData.append('title', this.subcat.name);
      this.serveUpService.saveRequest(frmData).subscribe(
        result => {
          this.snackbar.sendNotification('Verzoek succesvol verzonden!', 'Ok');
          this.router.navigate([`project/${result.data.id}`]);
        },(error) => {
          this.snackbar.sendNotification('Er is iets misgelopen!', 'Ok');
        });
    }else{
      this.snackbar.sendNotification('Er zijn geen services in de buurt :(');
    }

  }
  assignFormData(model) {
    const frmData = new FormData();
    for (const key of Object.keys(model)) {
      frmData.append(key, model[key]);
    }
    return frmData;
  }
}
