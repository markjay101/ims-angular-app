export interface UpdateAdminDto {
  id: string;
  firstName: string;
  lastName: string;
  role: 'Admin' | 'SuperAdmin';
}
