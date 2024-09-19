import { IUser } from "./iuser";

export class User implements IUser {
  id: string = '';
  name: string = '';
  lastname: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
}