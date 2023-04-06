import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  hiddeAsideBar: boolean = true;

  showSideBar(){
    this.hiddeAsideBar = false;
  }

  hideSideBar(){
    this.hiddeAsideBar = true;
  }

  onDocumentClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    if(element.nodeName === 'A'){
      this.hideSideBar();
    }
  }
}
