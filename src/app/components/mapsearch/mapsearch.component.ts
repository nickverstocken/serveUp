import {Component, ElementRef, NgZone, OnInit, ViewChild, OnDestroy, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {  } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import {environment} from '../../../environments/environment';
@Component({
  selector: 'app-mapsearch',
  templateUrl: './mapsearch.component.html',
  styleUrls: ['./mapsearch.component.scss']
})
export class MapsearchComponent implements OnInit, OnDestroy, AfterViewInit {
  latitude: number;
  longitude: number;
  markerlatitude: number;
  markerlongitude: number;
  searchControl: FormControl;
  zoom: number;
  @Output() placeSelected: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('searchlocation')
  public searchElementRef: ElementRef;
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    this.zoom = 7;
    this.latitude = 50.85045;
    this.longitude = 4.34878;
    this.setCurrentPosition();
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address'],
        componentRestrictions: {country: ['be']}
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.markerlatitude = this.latitude;
          this.markerlongitude = this.longitude;
          this.zoom = 12;
          this.placeSelected.emit(
            {
              'image': 'https://maps.googleapis.com/maps/api/staticmap?size=400x400&zoom=14&markers=size:mid|color:red|' + place.formatted_address + '&key=' + environment.googlemaps,
              'lat' : this.latitude,
              'lng' : this.longitude,
              'url' : place.url,
              'address': place.formatted_address
            }
          );
        });
      });
    });

  }
  ngAfterViewInit(){
  }
  ngOnDestroy() {
    let paccontainer = document.querySelector('.pac-container');
    if(paccontainer){
      paccontainer.remove();
    }
  }
  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
