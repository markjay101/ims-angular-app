import { PaginatedList } from './paginated-list';

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
  status: string;
  internetPlanId: string;
  createdAt: Date | string;
  updatedBy?: string;
  updatedAt: Date | string;
}

export type CreateApplicationDto = Omit<Application, 'id' | 'status'>;

export interface ApplicationListWithStatusCounts extends PaginatedList<Application> {
  pendingTotalCount: number;
  approvedTotalCount: number;
  rejectedTotalCount: number;
}

export const EMPTY_PAGINATED_APPLICATION_LIST = {
  pendingTotalCount: 0,
  approvedTotalCount: 0,
  rejectedTotalCount: 0,
  items: [],
  totalCount: 0,
  pageNumber: 0,
  totalPages: 0,
  hasPreviousPage: false,
  hasNextPage: false,
};
