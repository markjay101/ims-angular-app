export enum ApplicationStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export const ApplicationStatusNumberMap: Record<ApplicationStatus, number> = {
  Pending: 0,
  Approved: 1,
  Rejected: 2,
};
