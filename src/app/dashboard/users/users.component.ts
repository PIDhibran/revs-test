import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users:any = null;
  public showActionModal:boolean = false;
  public selectedUser:any;

  constructor(
    private userService:UsersService
  ){ }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    })
  }


  openActionModal(user:any){
    this.showActionModal = true;
    this.selectedUser = user;
  }

  closeActionModal(){
    this.showActionModal = false;
    this.selectedUser = null;
  }

}
