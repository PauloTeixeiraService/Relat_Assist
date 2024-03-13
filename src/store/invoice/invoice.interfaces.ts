import { IInvoiceLineItem2 } from '../../interfaces/invoice';

export interface IPayloadSetInvoiceLineItem {
  index: number;
  property: keyof IInvoiceLineItem2;
  value: string;
}
