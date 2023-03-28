export interface User {
  email: string;
  password: string;
}

export interface NewUser extends User {
  // email y passwords agregados
  username: string;
}
