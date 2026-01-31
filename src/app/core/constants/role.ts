export enum UserRole {
  SuperAdmin = 0,
  Admin = 1,
}

export enum UserRoleString {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
}

export const RoleMap: Record<string, number> = {
  Admin: UserRole.Admin,
  SuperAdmin: UserRole.SuperAdmin,
};
