import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Response } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http:HttpClient
  ) { }

  getAllUsers(){
    return this.http.get('https://oq20fcr1hg.execute-api.us-east-1.amazonaws.com/default/userList_revs');
  }

  getAllUserWithPrivileges(){
    return this.http.get<Response>('https://oq20fcr1hg.execute-api.us-east-1.amazonaws.com/default/priviliegies/get_priviliegies');
  }


}
