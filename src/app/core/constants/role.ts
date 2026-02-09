export enum UserRole {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
}

export const UserRoleNumberMap: Record<UserRole, number> = {
  SuperAdmin: 0,
  Admin: 1,
};
