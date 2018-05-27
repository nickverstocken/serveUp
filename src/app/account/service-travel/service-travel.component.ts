import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Service} from '../../models/Service';
import {  } from 'googlemaps';
import {AgmCircle, AgmMap, MapsAPILoader} from '@agm/core';
import {MatSlider} from '@angular/material';
@Component({
  selector: 'app-service-travel',
  templateUrl: './service-travel.component.html',
  styleUrls: ['./service-travel.component.scss']
})
export class ServiceTravelComponent implements OnInit {
  @Input() service: Service;
  @Input() formservice;
  @Input() editting = false;
  @Input() showActions = true;
  @Output() saveService: EventEmitter<any> = new EventEmitter<any>();
  latitude: number;
  longitude: number;
  radius = 0;
  zoom: number;
  @ViewChild('map') map: AgmMap;
  @ViewChild('circle') circle: AgmCircle;
  @ViewChild('travelslider') travelslider: MatSlider;
  constructor() { }

  ngOnInit() {
    this.formservice.valueChanges.subscribe(result => {
      this.latitude = result.city.lat;
      this.longitude = result.city.lng;
      this.radius = result.max_km * 1000;
      this.travelslider.value = this.radius / 1000;
      this.checkbounds();
    });

    this.checkbounds();
    this.latitude = this.formservice.controls.city.controls.lat.value;
    this.longitude = this.formservice.controls.city.controls.lng.value;
    this.radius = this.formservice.controls.max_km.value * 1000;
  }
  cancelEdit(){
    this.editting = false;
    this.rebuildForm();
  }
  save(){
    this.editting = false;
    this.saveService.emit();
  }
  rebuildForm() {
    this.formservice.reset(this.service);
  }
  setLatLng(lat, lng) {
    this.latitude = lat;
    this.longitude = lng;
  }
  changeRadius(radius){
    this.formservice.controls.max_km.setValue(radius.value);
  }
  checkbounds(){
    const val = this.formservice.controls.max_km.value;
    if(val >= 5 && val <= 10){
      this.zoom = 10;
    }else{
      if(val > 10 && val <= 23){
        this.zoom = 9;
      }else{
        if(val > 23 && val <= 50){
          this.zoom = 8;
        }else{
          if(val > 50 && val <= 100){
            this.zoom = 7;
          }else{
            if(val > 100 && val <= 200){
              this.zoom = 6;
            }
          }
        }
      }
    }
  }
  changeBounds(event){
    this.checkbounds();
  }
}
