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
}

interface CustomerPlan {
  name: string;
  speedMbps: number;
  description: string;
  price: number;
  startDate: Date | null;
  NextDueDate: Date | null;
}
