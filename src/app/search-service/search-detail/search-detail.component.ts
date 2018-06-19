import {Component, HostListener, NgZone, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {ServupService} from '../../services/servup.service';
import {SubCategory} from '../../models/SubCategory';
import {FormBuilder, Validators} from '@angular/forms';
import {DatePipe, Location} from '@angular/common';
import {ToastServiceService} from '../../services/toast-service.service';
import {MapsAPILoader} from '@agm/core';
import {} from 'googlemaps';

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
  loading = true;

  constructor(private ngZone: NgZone, private mapsAPILoader: MapsAPILoader, private snackbar: ToastServiceService, private router: Router, private route: ActivatedRoute, private auth: AuthService, private serveUpService: ServupService, private fb: FormBuilder, private datePipe: DatePipe, private location: Location) {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 800) {
      this.mobile = true;
    } else {
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
        if (user.id) {
          this.user = user;
          this.buildRequestForm();
        } else {
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
            this.loading = false;
            if (error.status === 404) {
              this.router.navigate(['']);
            }
          },
          () => {
            this.loading = false;
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
      if (typeof (value) === 'number') {
        this.getServicesNearbyCount();
      }
    });
  }

  getServicesNearbyCount() {
    this.serveUpService.getServicesNearbyCount(this.subcat.id, this.formRequest.controls.city.controls.name.value).subscribe(
      result => {
        this.nearbyCount = result.count;
        this.nearbyIds = result.ids;
      });
  }

  sendRequest() {
    if (this.nearbyCount > 0) {
      const frmData = this.assignFormData(this.formRequest.value);
      frmData.append('ids', JSON.stringify(this.nearbyIds));
      frmData.append('city_id', this.formRequest.controls.city.controls.id.value);
      frmData.append('due_date', this.datePipe.transform(this.formRequest.controls.due_date.value, 'yyyy-MM-dd'));
      frmData.append('title', this.subcat.name);
      this.serveUpService.saveRequest(frmData).subscribe(
        result => {
          this.snackbar.sendNotification('Verzoek succesvol verzonden!', 'Ok');
          this.router.navigate([`projects/${result.data.id}`]);
        }, (error) => {
          this.snackbar.sendNotification('Er is iets misgelopen!', 'Ok');
        });
    } else {
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

  goBack() {
    this.location.back();
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(this.formRequest.value);
      this.mapsAPILoader.load().then(() => {
        let geocoder = new google.maps.Geocoder;
        this.ngZone.run(() => {
          let autocomplete = geocoder.geocode({
            'location': {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }, (results, status) => {
            if (status.toString() === 'OK') {
              if (results[0]) {
                if (results[0].address_components) {
                  const zip = results[0].address_components[6].long_name;
                  const name = results[0].address_components[2].long_name;
                  console.log(results[0].address_components);
                  this.formRequest.controls.city.controls.name.setValue(name);
                  this.formRequest.controls.city.controls.zip.setValue(zip);
                }
              }else{
                this.snackbar.sendNotification('We kunnen je locatie niet terug vinden...');
              }
            }else{
              this.snackbar.sendNotification('We kunnen je locatie niet terug vinden...');
            }
          });
        });
      });
    });
  }
}
