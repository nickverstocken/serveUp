import {Directive, Output, EventEmitter} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[formControlName][numbermask]',
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(keydown.backspace)':'onInputChange($event.target.value, true)'
  }
})
export class NumbermaskDirective {
  constructor(public model: NgControl) {}

  @Output() rawChange:EventEmitter<string> = new EventEmitter<string>();

  onInputChange(event, backspace) {
    // remove all mask characters (keep only numeric)
    try{
      let newVal = event.replace(/\D/g, '');
      let rawValue = newVal;

      if (newVal.length < 5) {
        newVal = newVal.substring(0, newVal.length);
      }
      // newVal = this.maskValue(newVal);

      this.model.valueAccessor.writeValue(newVal);
      this.rawChange.emit(rawValue);
    }catch(ex){

    }

  }

  private maskValue(val: string): string {
    // don't show braces for empty value
    if(val.length == 0) {
      val = '';
    }
    // don't show braces for empty groups at the end
    else if(val.length <= 3) {
      val = val.replace(/^(\d{0,3})(.*)/, '$1');
    }
    return val;
  }
}
