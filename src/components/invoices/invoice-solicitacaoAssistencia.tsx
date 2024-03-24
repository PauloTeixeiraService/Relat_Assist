import { FC } from 'react';

// Mui icons.
import ContactPageIcon from '@mui/icons-material/ContactPage';

// Base components.
import { SectionTitle, Typography, Box, EditableAreaMarker, EditableAreaWrapper } from '../base';

// Hooks.
import { useGenerator } from '../../hooks/useGenerator';

// Utilities.
import { createSpacing } from '../../utils';

// Interfaces.
import InvoiceEditableContentNoData from './invoice-editable/invoice-editable-content-no-data';
import { ISolicitaoAssistencia } from '@/interfaces/solicitacaoAssistencia';

interface Props {
  solicitacaoassistencia: ISolicitaoAssistencia;
  handleOpenDialog?: () => void;
}

const InvoiceSolicitacaoAssistencia: FC<Props> = ({ solicitacaoassistencia, handleOpenDialog }) => {
  const { editable } = useGenerator();

  const checkProperties = (obj: Record<string, string>): any => {
    for (const key in obj) {
      if (obj[key] !== null && obj[key] != '') return true;
      else return false;
    }
  };

  const hasSolicitacaoAssistencia = (): boolean => {
    return checkProperties(solicitacaoassistencia as unknown as Record<string, string>);
  };

  return (
    <EditableAreaWrapper>
      <Box style={{ position: 'relative', zIndex: 1 }} onClick={handleOpenDialog as () => void}>
        <SectionTitle> <br></br> </SectionTitle>
        {hasSolicitacaoAssistencia() ? (
          <>
            {solicitacaoassistencia.nomeRequerente && (
              <Box>
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: editable ? 1 : createSpacing(1) }}>
                  Solicitação de Assistência
                </Typography>
              </Box>
            )}
            <Typography></Typography>
            {solicitacaoassistencia.nomeRequerente && (<Typography>{solicitacaoassistencia.nomeRequerente || null}</Typography>)}
            {solicitacaoassistencia.descricaoPedido && (<Typography>{solicitacaoassistencia.descricaoPedido || null}</Typography>)}
            {solicitacaoassistencia.realizadoVia && (<Typography>{solicitacaoassistencia.realizadoVia || null}</Typography>)}
          </>
        ) : editable ? (
          <InvoiceEditableContentNoData
            title="Solicitação de Assistência"
            subtitle="Adicionar detalhes sobre solicitações"
            icon={<ContactPageIcon />}
          />
        ) : null}
      </Box>
      {editable && <EditableAreaMarker />}
    </EditableAreaWrapper>
  );
};

export default InvoiceSolicitacaoAssistencia;
