import {ServupService} from '../services/servup.service';
import {AbstractControl, FormControl} from '@angular/forms';
import 'rxjs/add/observable/timer';
import {Observable} from 'rxjs/Observable';


export class EmailValidator {

  static createValidator(serveUpService: ServupService) {
    return (control: AbstractControl) => {
      return Observable.timer(500).distinctUntilChanged().switchMap(() => {
        return serveUpService.checkEmail({email: control.value}).map(res => {
          return res.success ? null : {emailTaken: true};
        }
          );
      });
    };
  }
}
