import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

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

}
