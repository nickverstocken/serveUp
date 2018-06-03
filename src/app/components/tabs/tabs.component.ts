import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, OnInit} from '@angular/core';
import {TabComponent} from './tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit, OnInit {
  @Output() tabClicked: EventEmitter<any> = new EventEmitter<any>();
  @ContentChildren(TabComponent) tabList: QueryList<TabComponent>;
  currentTab: TabComponent;
  @Input() current;
  constructor() { }
  ngAfterContentInit() {
    console.log(this.current);
    if(this.current){
      this.currentTab = this.tabList.filter(tab => tab.value === this.current)[0];
      if(!this.currentTab){
        this.currentTab = this.tabList.first;
      }
    }else{
      this.currentTab = this.tabList.first;
    }
  }
  setActiveTab(name){
    console.log(name);
  }
  ngOnInit(){
  }
  onTabClick(tab: TabComponent) {
    this.currentTab = tab;
    this.tabClicked.emit(tab.value);
  }

  isSelected(tab: TabComponent) {
    return this.currentTab.name === tab.name;
  }
}
