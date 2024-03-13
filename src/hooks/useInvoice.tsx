import { Dispatch, SetStateAction, useContext } from 'react';
import { IInvoiceContext, invoiceContext, initialInvoiceData } from '../context/invoice-context';
import { IInvoice, IInvoiceLineItem2, IInvoiceRecipient, IInvoiceSender } from '../interfaces/invoice';

interface UseInvoiceHookReturn extends IInvoiceContext {
  reset: () => void;
  handleChangeLineItem: (index: number, property: keyof IInvoiceLineItem2, value: string) => void;
  append: (newLineItem: IInvoiceLineItem2) => void;
  remove: (index: number) => void;
  updateRecipient: (recipient: IInvoiceRecipient) => void;
  updateSender: (sender: IInvoiceSender) => void;
  updateTaxRate: (taxRate: number) => void;
  updateLogo: (logo?: string) => void;
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

  /**
   * Handle change invoice item.
   *
   * @param {number} index
   * @param {keyof IInvoiceLineItem2 | string} property
   * @param {string} value
   */
  const handleChangeLineItem = (index: number, property: keyof IInvoiceLineItem2, value: string): void => {
    const { items } = invoice;

    const selectedItem = {
      ...items[index],
      [property]: value,
    };

    const updateInvoiceItems = (
      items: Array<IInvoiceLineItem2>,
      index: number,
      updatedItem: IInvoiceLineItem2,
    ): Array<IInvoiceLineItem2> => {
      return [
        ...items.slice(0, index), // everything before current items
        {
          ...items[index],
          ...updatedItem,
        },
        ...items.slice(index + 1), // everything after current items
      ];
    };

    setInvoice({ ...invoice, items: updateInvoiceItems(invoice.items, index, selectedItem) });
  };

  /**
   * Append new invoice line item
   *
   * @param {IInvoiceLineItem2} newLineItem
   * @return { void }
   */
  const append = (newLineItem: IInvoiceLineItem2): void => {
    const lineItems = invoice.items.concat(newLineItem);
    setInvoice({
      ...invoice,
      items: lineItems,
    });
  };

  /**
   * Remove invoice line item from list items.
   *
   * @param {number} index
   * @return { void }
   */
  const remove = (index: number): void => {
    const filteredItems = invoice.items.filter((item, itemIndex) => itemIndex !== index);
    setInvoice({
      ...invoice,
      items: filteredItems,
    });
  };

  /**
   * Update invoice recipient.
   *
   * @param {IInvoiceRecipient} recipient
   */
  const updateRecipient = (recipient: IInvoiceRecipient): void => {
    setInvoice({ ...invoice, recipient });
  };

  /**
   * Update invoice sender.
   *
   * @param {IInvoiceSender} sender
   */
  const updateSender = (sender: IInvoiceSender): void => {
    setInvoice({ ...invoice, sender });
  };

  /**
   * Update tax rate.
   *
   * @param {number} taxRate
   */
  const updateTaxRate = (taxRate: number): void => {
    setInvoice({ ...invoice, taxRate });
  };

  /**
   * Update invoice logo.
   *
   * @param {string} logo
   */
  const updateLogo = (logo?: string): void => {
    setInvoice({ ...invoice, logo });
  };

  return {
    invoice,
    setInvoice,
    reset,
    handleChangeLineItem,
    append,
    remove,
    updateRecipient,
    updateTaxRate,
    updateSender,

    updateLogo,
  };
};
