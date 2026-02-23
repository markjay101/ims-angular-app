import { Modem } from './modem';
import { PaginatedList } from './paginated-list';

export interface Customer {
  id: string;
  userId: string | null;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  status: string;
  plan: CustomerPlan;
  modem: Modem | null;
}

interface CustomerPlan {
  name: string;
  speedMbps: number;
  description: string;
  price: number;
  startDate: Date | null;
  nextDueDate: Date | null;
}

export type AssignCustomerModem = {
  customerId: string;
  modemId: string;
};

export interface CustomersListWithStatusCounts extends PaginatedList<Customer> {
  pendingTotalCount: number;
  activeTotalCount: number;
  inactiveTotalCount: number;
}

export const EMPTY_PAGINATED_CUSTOMER_LIST = {
  pendingTotalCount: 0,
  activeTotalCount: 0,
  inactiveTotalCount: 0,
  items: [],
  totalCount: 0,
  pageNumber: 0,
  totalPages: 0,
  hasPreviousPage: false,
  hasNextPage: false,
};
