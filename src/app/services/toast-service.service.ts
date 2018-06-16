import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';
@Injectable()
export class ToastServiceService {

  constructor(public snackBar: MatSnackBar) { }
  sendNotification(message, action?){
    const actiontodo = action || '';
   return this.snackBar.open(message, 'ok',{duration: 2000});
  }
}
