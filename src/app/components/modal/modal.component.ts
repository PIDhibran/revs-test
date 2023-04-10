import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() visible:boolean = false;
  @Input() data:any = null;

  closeModal(){
    this.visible = false;
  }

}
