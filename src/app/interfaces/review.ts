import {IComment} from "./comment";
import { IUser } from "./user";

export interface IReview {
  id: number;
  content: string;
  user: {'username':string,'user_tag':string,'avatar':string};
  anime: string;
  comments: IComment[];
}
