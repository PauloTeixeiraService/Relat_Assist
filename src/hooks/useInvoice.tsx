import { Dispatch, SetStateAction, useContext } from 'react';
import { IInvoiceContext, invoiceContext, initialInvoiceData } from '../context/invoice-context';
import { IInvoice } from '../interfaces/invoice';
import { ITempo } from '@/interfaces/tempo';
import { ICliente } from '@/interfaces/cliente';
import { IEquipamento } from '@/interfaces/equipamento';
import { IMateriais } from '@/interfaces/materiais';
import { IServicosEfetuados } from '@/interfaces/servicosEfetuados';
import { ISolicitaoAssistencia } from '@/interfaces/solicitacaoAssistencia';
import { ITemposServico } from '@/interfaces/temposServico';
import { IValidacoes } from '@/interfaces/validacoes';

interface UseInvoiceHookReturn extends IInvoiceContext {
  reset: () => void;
  replace: (newInvoice: SetStateAction<IInvoice>) => void;
  handleChangeTempo: (index: number, property: keyof ITempo, value: Date|string|number ) => void;
  append: (newTempo: ITempo) => void;
  remove: (index: number) => void;
  updateCliente: (recipient: ICliente) => void;
  updateEquipamento: (equipamento: IEquipamento) => void;
  updateMateriais: (materiais: IMateriais) => void;
  updateServicosEfetuados: (servicosEfetuados: IServicosEfetuados) => void;
  updateSolicitacaoAssistencia: (solicitacaoAssistencia: ISolicitaoAssistencia) => void;
  updateValidacoes: (validacoes: IValidacoes) => void;
  updateObservacoes: (observacoes: string) => void;
}

/** 
 * useInvoice hook.
 *
 */
export const useInvoice = (): UseInvoiceHookReturn => {
  const { invoice, setInvoice } = useContext<IInvoiceContext>(invoiceContext);

  /**
   * Reset invoice state.
   *
   * @return {void}
   */
  const reset = (): void => setInvoice(initialInvoiceData);
  
  const replace = (newInvoice: SetStateAction<IInvoice>): void => setInvoice(newInvoice);

  /**
   * Handle change invoice item.
   *
   * @param {number} index
   * @param {keyof ITempo | string} tempo
   * @param {Date} value
   */
  const handleChangeTempo = (index: number, tempo: keyof ITempo, value: Date|string|number): void => {
    const { temposServico } = invoice;

    const selectedTempo = {
      ...temposServico[index],
      [tempo]: value,
    };

    const updateInvoiceItems = (
      items: Array<ITempo>,
      index: number,
      updatedItem: ITempo,
    ): Array<ITempo> => {
      return [
        ...items.slice(0, index), // everything before current items
        {
          ...items[index],
          ...updatedItem,
        },
        ...items.slice(index + 1), // everything after current items
      ];
    };

    setInvoice({ ...invoice, temposServico: updateInvoiceItems(invoice.temposServico, index, selectedTempo) });
  };

  /**
   * Append new invoice line item
   *
   * @param {ITempo} newLineItem
   * @return { void }
   */
  const append = (newLineItem: ITempo): void => {
    const lineItems = invoice.temposServico.concat(newLineItem);
    setInvoice({
      ...invoice,
      temposServico: lineItems,
    });
  };

  /**
   * Remove invoice line item from list items.
   *
   * @param {number} index
   * @return { void }
   */
  const remove = (index: number): void => {
    const filteredItems = invoice.temposServico.filter((item, itemIndex) => itemIndex !== index);
    setInvoice({
      ...invoice,
      temposServico: filteredItems,
    });
  };

  /**
   * Update invoice recipient.
   *
   * @param {ICliente} cliente
   */
  const updateCliente = (cliente: ICliente): void => {
    setInvoice({ ...invoice, cliente });
  };

  const updateEquipamento = (equipamento: IEquipamento): void => {
    setInvoice({ ...invoice, equipamento });
  };

  const updateMateriais = (materiais: IMateriais): void => {
    setInvoice({ ...invoice, materiais });
  };

  const updateServicosEfetuados = (servicosEfetuados: IServicosEfetuados): void => {
    setInvoice({ ...invoice, servicosEfetuados });
  };

  const updateSolicitacaoAssistencia = (solicitacaoAssistencia: ISolicitaoAssistencia): void => {
    setInvoice({ ...invoice, solicitacaoAssistencia });
  };

  const updateValidacoes = (validacoes: IValidacoes): void => {
    setInvoice({ ...invoice, validacoes });
  };

  const updateObservacoes = (observacoes: string): void => {
    setInvoice({ ...invoice, observacoes });
  };



  return {
    invoice,
    setInvoice,
    reset,
    replace,
    handleChangeTempo,
    append,
    remove,
    updateCliente,
    updateEquipamento,
    updateMateriais,
    updateServicosEfetuados,
    updateSolicitacaoAssistencia,
    updateValidacoes,
    updateObservacoes
  };
};
