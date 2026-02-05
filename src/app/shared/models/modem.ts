export interface Modem {
  id: string;
  model: string;
  serialNumber: string;
  macAddress: string;
}

export type CreateModem = Omit<Modem, 'id'>;
