import {IComment} from "./comment";

export interface IReview {
  id: number;
  content: string;
  user: string;
  anime: string;
  comments: IComment[];
}
