export interface CreateAdminDto {
  userName: string;
  firstName: string;
  lastName: string;
  role: 'Admin' | 'SuperAdmin';
}

export interface UpdateAdminDto {
  id: string;
  firstName: string;
  lastName: string;
  role: 'Admin' | 'SuperAdmin';
}

export interface AdminStats {
  totalAdmins: number;
  totalSuperAdmins: number;
}
