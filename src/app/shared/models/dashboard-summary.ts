export type DashboardSummary = {
  earnings: number;
  adminAccounts: number;
  unpaidInvoicesTotalAmount: number;
  unpaidInvoicesCount: number;
  pendingCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  availableModems: number;
  assignedModems: number;
};

export type SuperAdminDashboardSummary = {
  earnings: number;
  adminAccounts: number;
  unpaidInvoicesTotalAmount: number;
};
