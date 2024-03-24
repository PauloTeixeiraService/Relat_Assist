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
import { IMateriais } from '@/interfaces/materiais';

interface Props {
  materiais: IMateriais;
  handleOpenDialog?: () => void;
}

const InvoiceMateriais: FC<Props> = ({ materiais, handleOpenDialog }) => {
  const { editable } = useGenerator();

  const checkProperties = (obj: Record<string, string>): any => {
    for (const key in obj) {
      if (obj[key] !== null && obj[key] != '') return true;
      else return false;
    }
  };

  const hasMateriais = (): boolean => {
    return checkProperties(materiais as unknown as Record<string, string>);
  };

  return (
    <EditableAreaWrapper>
      <Box style={{ position: 'relative', zIndex: 1 }} onClick={handleOpenDialog as () => void}>
        {hasMateriais() ? (
          <>
              <Box>
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: editable ? 1 : createSpacing(1) }}>
                  Materiais
                </Typography>
              </Box>
            <Typography></Typography>
            <Typography>{materiais.materialAplicado || null}</Typography>
            <Typography>{materiais.materialParaOrcamentar || null}</Typography>
          </>
        ) : editable ? (
          <InvoiceEditableContentNoData
            title="Materiais"
            subtitle="Adicionar detalhes sobre materiais"
            icon={<ContactPageIcon />}
          />
        ) : null}
      </Box>
      {editable && <EditableAreaMarker />}
    </EditableAreaWrapper>
  );
};

export default InvoiceMateriais;
