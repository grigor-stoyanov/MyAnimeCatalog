import {IError} from "../interfaces";

export const NO_POSTS: IError = {
  'detail': 'Be the first to make a Review!'
}
export const NO_MORE_POSTS: IError = {
  'detail':'No more Posts available'
}

export class CustomError {
  error: IError;

  constructor(errorI: IError) {
    this.error = errorI
  }
}
