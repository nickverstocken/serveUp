import { Component, OnInit, Input } from '@angular/core';
import {ServupService} from '../../services/servup.service';
import { FormGroup } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-autofill-cities',
  templateUrl: './autofill-cities.component.html',
  styleUrls: ['./autofill-cities.component.scss']
})
export class AutofillCitiesComponent implements OnInit {
  @Input() id;
  @Input() valueToSearch = '';
  @Input() zipSearch = '';
  @Input() citySearch = '';
  @Input('group')
  public adressForm: FormGroup;
  @Input() readonly = true;
  cities;
  showAutoFill = false;
  constructor(private serveUpService: ServupService) {
    document.addEventListener('click', this.offClickHandler.bind(this));

  }
  offClickHandler(event:any) {
        if(!(event.target.classList.contains('zip'))){
          this.showAutoFill = false;
        }
  }
  ngOnInit() {
    this.serveUpService.getCities().subscribe(
      res => {
        this.cities = res.city;
        this.cities.sort();
      });
  }
  fillInCity(event){
    if(this.adressForm.controls.zip.value) {
      if (this.adressForm.controls.zip.value.toString().length > 0) {
        const value = $('#' + this.id + ' .rightAutoFill span')[0];
        const valueId = $('#' + this.id + ' .cityid')[0];
        this.adressForm.controls['id'].setValue(parseInt($(valueId).text()));
        this.adressForm.controls['name'].setValue($(value).text());
      } else {
        this.adressForm.controls['name'].setValue('');
      }
    }

  }
  fillAll(event){
    if(this.adressForm.controls.zip.value){
      if(this.adressForm.controls.zip.value.toString().length > 0 && this.adressForm.controls.name.value.length){
        const valueZip = $('#' + this.id + ' .leftAutoFill span')[0];
        const valueName = $('#' + this.id + ' .rightAutoFill span')[0];
        const valueId = $('#' + this.id + ' .cityid')[0];
        this.adressForm.controls['id'].setValue(parseInt($(valueId).text()));
        this.adressForm.controls['name'].setValue($(valueName).text());
        this.adressForm.controls['zip'].setValue(parseInt($(valueZip).text()));
        this.showAutoFill = false;
      }else{
        event.preventDefault();
      }
    }else{
      event.preventDefault();
    }

  }
  fillIn(city){
    this.adressForm.controls['id'].setValue(city.id);
    this.adressForm.controls['name'].setValue(city.name);
    this.adressForm.controls['zip'].setValue(city.zip);
    this.adressForm.controls['lat'].setValue(city.lat);
    this.adressForm.controls['lng'].setValue(city.lng);
    this.showAutoFill = false;
  }
}
