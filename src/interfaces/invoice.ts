import { ICliente } from './cliente';
import { IEquipamento } from './equipamento';
import { ISolicitaoAssistencia } from './solicitacaoAssistencia';
import { IServicosEfetuados } from './servicosEfetuados';
import { IMateriais } from './materiais';
import { ITemposServico } from './temposServico';
import { IValidacoes } from './validacoes';


export interface IInvoice {
  fileName?: string;
  logo?: string;
  prestador: ICliente;
  cliente: ICliente;
  date: string;
  equipamento: IEquipamento;
  solicitacaoAssistencia: ISolicitaoAssistencia;
  servicosEfetuados: IServicosEfetuados;
  materiais: IMateriais;
  temposServico: ITemposServico;
  observacoes: string;
  validacoes: IValidacoes;
}
