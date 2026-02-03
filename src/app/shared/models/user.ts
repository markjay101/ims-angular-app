export interface User {
  id: string;
  role: string;
  userName?: string;
  firstName: string;
  lastName: string;
  createdBy?: string;
  createdAt: Date | string;
  updatedBy?: string;
  updatedAt: Date | string;
}

export interface UserToken {
  token: string;
  user: User;
}
