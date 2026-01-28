import { User } from './user';

export interface UserToken {
  token: string;
  user: User;
}
