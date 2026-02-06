export enum ApplicationStatus {
  Pending,
  Approved,
  Rejected,
}

enum ApplicationStatusString {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export const ApplicationStatusStringMap: Record<ApplicationStatus, string> = {
  0: ApplicationStatusString.Pending,
  1: ApplicationStatusString.Approved,
  2: ApplicationStatusString.Rejected,
};
