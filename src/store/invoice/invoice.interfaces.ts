import { ITempo } from "@/interfaces/tempo";

export interface IPayloadSetInvoiceTempo {
  index: number;
  property: keyof ITempo;
  value: string;
}
