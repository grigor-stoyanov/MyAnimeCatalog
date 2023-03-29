interface Likes{
  userID:number,
  liked:boolean,
  disliked:boolean
};

export interface IAnime {
  id: number;
  title: string;
  description: string;
  image: string;
  date_begin: string;
  date_ended: string;
  episodes: number;
  genres: string[];
  rating: any;
  total_likes:number;
  total_dislikes:number;
  average_rating:number;
}
