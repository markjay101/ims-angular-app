export interface Modem {
  id: string;
  model: string;
  serialNumber: string;
  macAddress: string;
}

export type CreateModemDto = Omit<Modem, 'id'>;
