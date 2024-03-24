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
import { IServicosEfetuados } from '@/interfaces/servicosEfetuados';

interface Props {
  servicosefetuados: IServicosEfetuados;
  handleOpenDialog?: () => void;
}

const InvoiceServicosEfetuados: FC<Props> = ({ servicosefetuados, handleOpenDialog }) => {
  const { editable } = useGenerator();

  const checkProperties = (obj: Record<string, string>): any => {
    for (const key in obj) {
      if (obj[key] !== null && obj[key] != '') return true;
      else return false;
    }
  };

  const hasServicosEfetuados = (): boolean => {
    return checkProperties(servicosefetuados as unknown as Record<string, string>);
  };

  return (
    <EditableAreaWrapper>
      <Box style={{ position: 'relative', zIndex: 1 }} onClick={handleOpenDialog as () => void}>
        {hasServicosEfetuados() ? (
          <>
              <Box>
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: editable ? 1 : createSpacing(1) }}>
                  Serviços Efetuados
                </Typography>
              </Box>
            <Typography></Typography>
            <Typography>{servicosefetuados.descricaoServico || null}</Typography>
            <Typography>{servicosefetuados.maquinaOperacional || null}</Typography>
            <Typography>{servicosefetuados.permanecemServicosPendentes || null}</Typography>
          </>
        ) : editable ? (
          <InvoiceEditableContentNoData
            title="Serviços Efetuados"
            subtitle="Adicionar detalhes sobre serviços efetuados"
            icon={<ContactPageIcon />}
          />
        ) : null}
      </Box>
      {editable && <EditableAreaMarker />}
    </EditableAreaWrapper>
  );
};

export default InvoiceServicosEfetuados;
