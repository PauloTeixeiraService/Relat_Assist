import { createContext, Dispatch, SetStateAction } from 'react';
import { IInvoice } from '../interfaces/invoice';

// Faker.
// import { faker } from '@faker-js/faker';

// Interfaces
export interface IInvoiceContext {
  invoice: IInvoice;
  setInvoice: Dispatch<SetStateAction<IInvoice>>;
}

/** Initial state */
export const initialInvoiceData: IInvoice = {
  fileName: '',
  date: String(new Date()),
  prestador: {
    nome: 'Paulo Teixeira',
    morada:  ' -a preencher- ',
    NIF: ' -a preencher- '
  },
  cliente: {
    nome: '',
    morada:  '',
    NIF: ''
  },  
  equipamento: {    
    tipologia: '',
    marca: '',
    modelo: '',
    matrícula: ''
  },
  solicitacaoAssistencia: {
    realizadoVia: '',
    nomeRequerente: '',
    descricaoPedido: ''
  },
  servicosEfetuados: {
    descricaoServico: '',
    permanecemServicosPendentes: '',
    maquinaOperacional: ''
  },
  materiais: {
    materialAplicado: '',
    materialParaOrcamentar: ''
  },
  temposServico: [],
  observacoes: '',
  validacoes: {
    nomePessoa: '',
    validadoEm: ''
  }


};

/**
 * Invoice context
 */
export const invoiceContext = createContext<IInvoiceContext>({} as IInvoiceContext);
