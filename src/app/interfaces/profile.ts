import {IUser} from "./index";

export interface IProfile {
  user_id: IUser;
  email: string;
  avatar: File;
  created: Date;
  description: string;

}
