export interface IUser {
  id:number;
  username:string;
  password:string;
  last_login:Date;
  is_superuser:boolean;
  is_staff:boolean;
}
