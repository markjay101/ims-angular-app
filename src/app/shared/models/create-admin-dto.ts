export interface CreateAdminDto {
  userName: string;
  firstName: string;
  lastName: string;
  role: 'Admin' | 'SuperAdmin';
}
