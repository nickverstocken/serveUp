import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentId = 0;
  constructor(private router: Router, private route: ActivatedRoute) { }
  ngAfterViewInit(){
    //var position = $(".profileEdit").offset();

    $(window).scroll(function () {
      //var position = $(".profileEdit").offset();
    });
  }
  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.currentId = id;
        console.log(this.currentId);
      });
  }
  toggleAccOpened(id){
    if($('.acBody').is(':visible')){
      $('.acBody').slideUp(250, 'swing');
    }
    if($('#' + id).is(':hidden')){
      $('#' + id).slideDown(250, 'swing');
    }

  }
  editMode(id){
    $('#' + id + ' .edit').hide();
    $('#' + id + ' .editting').show();
    $('#' + id + ' .editable').removeClass('disabled');
    $('#' + id + ' .editable').attr('readonly', false);
  }
  cancelEditMode(id){
    $('#' + id + ' .edit').show();
    $('#' + id + ' .editting').hide();
    $('#' + id + ' .editable').addClass('disabled');
    $('#' + id + ' .editable').attr('readonly', false);
  }
}
