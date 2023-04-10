import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.scss']
})
export class PrivilegesComponent implements OnInit {
  users:any
  constructor(
    private usersService:UsersService
  ){}

  ngOnInit(): void {
    this.usersService.getAllUserWithPrivileges()
    .subscribe(users => {
      this.users = users.body;
    })
  }

}
