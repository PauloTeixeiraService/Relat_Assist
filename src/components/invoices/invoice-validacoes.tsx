import { FC } from 'react';

// Mui icons.
import ContactPageIcon from '@mui/icons-material/ContactPage';

// Base components.
import { SectionTitle, Typography, Box, EditableAreaMarker, EditableAreaWrapper } from '../base';

// Hooks.
import { useGenerator } from '../../hooks/useGenerator';

// Utilities.
import { createSpacing } from '../../utils';
import { format } from 'date-fns';

// Interfaces.
import InvoiceEditableContentNoData from './invoice-editable/invoice-editable-content-no-data';
import { IValidacoes } from '@/interfaces/validacoes';

interface Props {
  validacoes: IValidacoes;
  handleOpenDialog?: () => void;
}

const InvoiceValidacoes: FC<Props> = ({ validacoes, handleOpenDialog }) => {
  const { editable } = useGenerator();

  const checkProperties = (obj: Record<string, string>): any => {
    for (const key in obj) {
      if (obj[key] !== null && obj[key] != '') return true;
      else return false;
    }
  };

  const hasValidacoes = (): boolean => {
    return checkProperties(validacoes as unknown as Record<string, string>);
  };

  return (
    <EditableAreaWrapper>
      <Box style={{ position: 'relative', zIndex: 1 }} onClick={handleOpenDialog as () => void}>
        {hasValidacoes() ? (
          <>
            {validacoes.nomePessoa && (
              <Box>
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: editable ? 1 : createSpacing(1) }}>
                  Validações
                </Typography>
              </Box>
            )}
            <Typography></Typography>
            <Typography>{validacoes.nomePessoa}</Typography>
            <Typography>{format(new Date(validacoes.validadoEm), 'dd/MM/yyyy')}</Typography>
          </>
        ) : editable ? (
          <InvoiceEditableContentNoData
            title="Validações"
            subtitle="Adicionar detalhes sobre validações"
            icon={<ContactPageIcon />}
          />
        ) : null}
      </Box>
      {editable && <EditableAreaMarker />}
    </EditableAreaWrapper>
  );
};

export default InvoiceValidacoes;
