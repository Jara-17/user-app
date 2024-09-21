import { IUser } from "./iuser";

export class User implements IUser {
  id: number = 0;
  name: string = '';
  lastname: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
}