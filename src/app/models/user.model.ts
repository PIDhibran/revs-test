export interface User {
  username:string;
  email?: string;

}

export interface LoggedUser extends User {
  token:string;
}

// export interface newUser {
//   username: string;
// }
