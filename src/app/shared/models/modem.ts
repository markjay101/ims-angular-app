import { Customer } from './customer';

export interface Modem {
  id: string;
  model: string;
  serialNumber: string;
  macAddress: string;
  customer: Customer | null;
}

export type CreateModemDto = Omit<Modem, 'id'>;
