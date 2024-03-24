// Enum action types.
import { IInvoice } from '../../interfaces/invoice';
import { InvoiceActionTypes as Types } from './invoice-actions.enum';
import type { IPayloadSetInvoiceTempo } from './invoice.interfaces';

// Actions definitions.
export interface ISetInvoice {
  type: typeof Types.invoice_SET_INVOICE;
  payload: IInvoice;
}

interface ISetIInvoiceTempo {
  type: typeof Types.invoice_SET_TEMPO;
  payload: IPayloadSetInvoiceTempo;
}

interface ISetDialogEditCliente {
  type: typeof Types.invoice_SET_DIALOG_CLIENTE;
  payload: boolean;
}

interface ISetDialogEditEquipamento {
  type: typeof Types.invoice_SET_DIALOG_EQUIPAMENTO;
  payload: boolean;
}

interface ISetDialogEditMateriais {
  type: typeof Types.invoice_SET_DIALOG_MATERIAIS;
  payload: boolean;
}

interface ISetDialogEditServicosEfetuados {
  type: typeof Types.invoice_SET_DIALOG_SERVICOS_EFETUADOS;
  payload: boolean;
}

interface ISetDialogEditSolicitacaoAssistencia {
  type: typeof Types.invoice_SET_DIALOG_SOLICITACAO_ASSISTENCIA;
  payload: boolean;
}

interface ISetDialogEditValidacoes {
  type: typeof Types.invoice_SET_DIALOG_VALIDACOES;
  payload: boolean;
}

// Union actions type.
export type InvoiceActions = ISetInvoice | ISetIInvoiceTempo | ISetDialogEditCliente | ISetDialogEditEquipamento | ISetDialogEditMateriais | ISetDialogEditServicosEfetuados | ISetDialogEditSolicitacaoAssistencia | ISetDialogEditValidacoes;

// Actions creator.
export const invoice_setInvoice = (payload: IInvoice): ISetInvoice => ({
  type: Types.invoice_SET_INVOICE,
  payload,
});

export const ISetIInvoiceTempo = (payload: IPayloadSetInvoiceTempo): ISetIInvoiceTempo => ({
  type: Types.invoice_SET_TEMPO,
  payload,
});

export const invoice_setDialogCliente = (payload: boolean): ISetDialogEditCliente => ({
  type: Types.invoice_SET_DIALOG_CLIENTE,
  payload,
});

export const invoice_setDialogEquipamento = (payload: boolean): ISetDialogEditEquipamento => ({
  type: Types.invoice_SET_DIALOG_EQUIPAMENTO,
  payload,
});

export const invoice_setDialogMateriais = (payload: boolean): ISetDialogEditMateriais => ({
  type: Types.invoice_SET_DIALOG_MATERIAIS,
  payload,
});

export const invoice_setDialogServicosEfetuados = (payload: boolean): ISetDialogEditServicosEfetuados => ({
  type: Types.invoice_SET_DIALOG_SERVICOS_EFETUADOS,
  payload,
});

export const invoice_setDialogSolicitacaoAssistencia = (payload: boolean): ISetDialogEditSolicitacaoAssistencia => ({
  type: Types.invoice_SET_DIALOG_SOLICITACAO_ASSISTENCIA,
  payload,
});

export const invoice_setDialogValidacoes = (payload: boolean): ISetDialogEditValidacoes => ({
  type: Types.invoice_SET_DIALOG_VALIDACOES,
  payload,
});



