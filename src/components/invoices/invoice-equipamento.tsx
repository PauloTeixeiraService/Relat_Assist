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
import { IEquipamento } from '@/interfaces/equipamento';

interface Props {
  equipamento: IEquipamento;
  handleOpenDialog?: () => void;
}

const InvoiceEquipamento: FC<Props> = ({ equipamento, handleOpenDialog }) => {
  const { editable } = useGenerator();

  const checkProperties = (obj: Record<string, string>): any => {
    for (const key in obj) {
      if (obj[key] !== null && obj[key] != '') return true;
      else return false;
    }
  };

  const hasEquipamento = (): boolean => {
    return checkProperties(equipamento as unknown as Record<string, string>);
  };

  return (
    <EditableAreaWrapper>
      <Box style={{ position: 'relative', zIndex: 1 }} onClick={handleOpenDialog as () => void}>
        {/* <SectionTitle>:</SectionTitle> */}
        {hasEquipamento() ? (
          <>
            {equipamento.matrícula && (
              <Box>
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: editable ? 1 : createSpacing(1) }}>
                  Equipamento:
                </Typography>
              </Box>
            )}
            <Typography></Typography>
            {equipamento.matrícula && (<Typography>{equipamento.matrícula || null}</Typography>)}
            {equipamento.tipologia && (<Typography>{equipamento.tipologia || null}</Typography>)}
            {equipamento.marca && (<Typography>{equipamento.marca || null}</Typography>)}
            {equipamento.modelo && (<Typography>{equipamento.modelo || null}</Typography>)}
          </>
        ) : editable ? (
          <InvoiceEditableContentNoData
            title="Equipamento"
            subtitle="Adicionar detalhes do equipamento"
            icon={<ContactPageIcon />}
          />
        ) : null}
      </Box>
      {editable && <EditableAreaMarker />}
    </EditableAreaWrapper>
  );
};

export default InvoiceEquipamento;
