import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Service} from '../../models/Service';
import {ServupService} from '../../services/servup.service';

declare var $: any;

@Component({
  selector: 'app-service-select',
  templateUrl: './service-select.component.html',
  styleUrls: ['./service-select.component.scss']
})
export class ServiceSelectComponent implements OnInit, OnDestroy {
  @Input() services: Service[];
  @Input() id =  'headerServiceSelect';
  @Output() selectedService: EventEmitter<Service> = new EventEmitter();
  sub;
  constructor(private serveUpService: ServupService) {
  }
  ngOnDestroy(){
    this.services = [];
    this.sub.unsubscribe();
  }
  ngOnInit() {
    this.sub = this.serveUpService.selectedService.subscribe(
      result => {
        const serviceId: Number = parseInt(result);
        if(serviceId !== -1){
          const service = this.services.filter(item => item.id === serviceId);
          this.selectedService.emit(service[0]);
          if(service.length > 0){
            this.services =  this.services.filter(item => item.id !== serviceId);
            this.services.unshift(service[0]);
          }else{
            localStorage.setItem('selectedService', '-1');
          }
        }else{
          if(this.services.length > 0){
            this.serveUpService.setSelectedService(this.services[0].id);
            this.selectedService.emit(this.services[0]);
          }
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
}
