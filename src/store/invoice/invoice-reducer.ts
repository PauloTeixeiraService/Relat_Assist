// Invoice action types.
import { InvoiceActionTypes as Types } from './invoice-actions.enum';

// Initial invoice data.
import { initialInvoiceData } from '../../context';

// Union actions type.
import { InvoiceActions } from './invoice-actions';
import { IInvoice } from '../../interfaces/invoice';

// Invoice state definition.
export interface IInvoiceState {
  invoice_isLoadingPreview: boolean;
  invoice_data: IInvoice;
  invoice_openDialogCliente: boolean;
  invoice_openDialogEquipamento: boolean;
  invoice_openDialogMateriais: boolean;
  invoice_openDialogSolicitacaoAssistencia: boolean;
  invoice_openDialogServicosEfetuados: boolean;
  invoice_openDialogValidacoes: boolean;
}

// Init state.
const initialState: IInvoiceState = {
  invoice_isLoadingPreview: false,
  invoice_data: initialInvoiceData,
  invoice_openDialogCliente: false,
  invoice_openDialogEquipamento: false,
  invoice_openDialogMateriais: false,
  invoice_openDialogSolicitacaoAssistencia: false,
  invoice_openDialogServicosEfetuados: false,
  invoice_openDialogValidacoes: false,
};

// Invoice state reducer.
const invoiceReducer = (state: IInvoiceState = initialState, { type, payload }: InvoiceActions): IInvoiceState => {
  switch (type) {
    case Types.invoice_SET_INVOICE:
      return {
        ...state,
        invoice_data: payload,
      };
    case Types.invoice_SET_DIALOG_CLIENTE:
      return {
        ...state,
        invoice_openDialogCliente: payload,
      };
    case Types.invoice_SET_DIALOG_EQUIPAMENTO:
      return {
        ...state,
        invoice_openDialogEquipamento: payload,
      };
    case Types.invoice_SET_DIALOG_MATERIAIS:
      return {
        ...state,
        invoice_openDialogMateriais: payload,
      };
    case Types.invoice_SET_DIALOG_SERVICOS_EFETUADOS:
      return {
        ...state,
        invoice_openDialogServicosEfetuados: payload,
      };
    case Types.invoice_SET_DIALOG_SOLICITACAO_ASSISTENCIA:
      return {
        ...state,
        invoice_openDialogSolicitacaoAssistencia: payload,
      };
    case Types.invoice_SET_DIALOG_VALIDACOES:
      return {
        ...state,
        invoice_openDialogValidacoes: payload,
      };
    default:
      return state;
  }
};

export default invoiceReducer;
