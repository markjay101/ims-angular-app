import { ApplicationStatus } from '../../core/constants/application-status';

export interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  status: ApplicationStatus;
  internetPlanId: string;
  createdAt: Date | string;
  updatedBy?: string;
  updatedAt: Date | string;
}

export type CreateApplicationDto = Omit<Application, 'id' | 'status'>;
