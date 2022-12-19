import { IComment } from './comment';
import { IFeedback } from './feedback';
import { IUser } from './user';

export interface ICommentList {
  customer: IUser;
  comment: IComment;
  feedback: IFeedback | null;
  admin: IUser | null;
}
