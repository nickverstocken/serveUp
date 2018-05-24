import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Service} from '../../models/Service';
import {ServupService} from '../../services/servup.service';

declare var $: any;

@Component({
  selector: 'app-service-select',
  templateUrl: './service-select.component.html',
  styleUrls: ['./service-select.component.scss']
})
export class ServiceSelectComponent implements OnInit {
  @Input() services: Service[];
  @Input() id =  'headerServiceSelect';
  @Output() selectedService: EventEmitter<Service> = new EventEmitter();
  constructor(private serveUpService: ServupService) {
  }

  ngOnInit() {

    this.serveUpService.selectedService.subscribe(
      result => {
        const serviceId = result;
        if(serviceId !== -1){
          const service = this.services.filter(item => item.id === parseInt(serviceId));
          this.selectedService.emit(service[0]);
          if(service.length > 0){
            this.services =  this.services.filter(item => item.id !== parseInt(serviceId));
            this.services.unshift(service[0]);
          }else{
            localStorage.setItem('selectedService', '-1');
          }
        }else{
          this.selectedService.emit(this.services[0]);
        }
      }
    )
  }

  toggleChooseContainer() {
    $('#' + this.id + ' .chooseContainer').slideToggle({'duration': 200});
    $('#' + this.id + ' .fa-caret-down').toggleClass('rotate');
  }

  poptotop(service) {
   this.serveUpService.setSelectedService(service.id);
    $('#' + this.id + ' .chooseContainer').slideUp({'duration': 200});
    $('#' + this.id + ' .fa-caret-down').removeClass('rotate');
  }

/*  move(array, element, delta) {
    const index = array.indexOf(element);
    const newIndex = index + delta;
    if (newIndex < 0 || newIndex == array.length) return; // Already at the top or bottom.
    const indexes = [index, newIndex].sort(); // Sort the indixes
    array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); // Replace from lowest index, two elements, reverting the order
  }*/
}
