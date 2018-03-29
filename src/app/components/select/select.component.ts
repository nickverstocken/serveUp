import {Component, OnInit, Input, Output, HostListener, EventEmitter} from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

export class SelectComponent implements OnInit {
  @Input() options = [];
  @Input() selectedItemInit;
  @Input() placeHolder = 'Kies';
  @Input() disabled = false;
  @Output() selectedValueChange: EventEmitter<any> = new EventEmitter();
  showOption = false;
  selectedItem;
  constructor() {
  }
  @HostListener('document:click', ['$event'])
  offClickHandler(event){
    if(!(event.target.classList.contains('select-styled'))){
      this.showOption = false;
    }
  }
  ngOnInit() {
    this.selectedItemInit ? this.selectedItem = this.selectedItemInit : this.selectedItem;
  }
  selectValue(value, name){
    this.selectedItem = [value, name];
    this.selectedValueChange.emit(this.selectedItem);
    this.showOption = false;
  }
  showOptions(event){
    if(!this.disabled){
      this.showOption ? this.showOption = false : this.showOption = true;
    }

  }
}
