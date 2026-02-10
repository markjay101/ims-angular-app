export enum CustomerStatus {
  Pending = 'Pending',
  Active = 'Active',
  Inactive = 'Inactive',
}

export const CustomerStatusNumberMap: Record<CustomerStatus, number> = {
  Pending: 0,
  Active: 1,
  Inactive: 2,
};
