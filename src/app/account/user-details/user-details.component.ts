import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../models/User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User;
  @Input() formuser;
  @Input() editting = false;
  @Input() showActions = true;
  @Output() saveUser: EventEmitter<any> = new EventEmitter<any>();
  @Output() changePassword: EventEmitter<any> = new EventEmitter<any>();
  @Output() goToUserReviews: EventEmitter<any> = new EventEmitter<any>();
  @Input() passform;
  ratingvalues = [
    'Slecht',
    'Kan beter',
    'Gemiddeld',
    'Goed',
    'Zeer goed'
  ];
  showChangePass = false;
  constructor() { }

  ngOnInit() {
  }
  cancelEdit(){
    this.editting = false;

    this.rebuildForm();
  }
  save(){
    this.editting = false;
    this.saveUser.emit();
  }
  rebuildForm() {
    this.formuser.reset(this.user);
    this.formuser.controls.picture.setValue(this.user.picture);
  }
  userPictureLoad(file) {
    this.formuser.controls.picture.setValue(file.file);
  }
  closeChangePass(){
    this.showChangePass = false;
    this.passform.reset();
  }
  changePass(){
    this.changePassword.emit();
  }
  goToReviews(){
    this.goToUserReviews.emit();
  }
}
