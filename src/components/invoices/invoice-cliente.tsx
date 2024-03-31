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
import { ICliente } from '@/interfaces/cliente';

interface Props {
  cliente: ICliente;
  handleOpenDialog?: () => void;
}

const InvoiceCliente: FC<Props> = ({ cliente, handleOpenDialog }) => {
  const { editable } = useGenerator();

  const checkProperties = (obj: Record<string, string>): any => {
    for (const key in obj) {
      if (obj[key] !== null && obj[key] != '') return true;
      else return false;
    }
  };

  const hasCliente = (): boolean => {
    return checkProperties(cliente as unknown as Record<string, string>);
  };

  return (
    <EditableAreaWrapper>
      <Box style={{ position: 'relative', zIndex: 1 }} onClick={handleOpenDialog as () => void}>
        
        {hasCliente() ? (
          <>
            {cliente.nome && (
              <Box>
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: editable ? 1 : createSpacing(1) }}>
                  Cliente:
                </Typography>
              </Box>
            )}
            <Typography></Typography>
            {cliente.nome && (<Typography>{cliente.nome || null}</Typography>)}
            {cliente.morada && (<Typography>{cliente.morada || null}</Typography>)}
            {cliente.NIF && (<Typography>{cliente.NIF || null}</Typography>)}
            {cliente.email && (<Typography>{cliente.email || null}</Typography>)}
          </>
        ) : editable ? (
          <InvoiceEditableContentNoData
            title="Cliente"
            subtitle="Adicionar detalhes cliente"
            icon={<ContactPageIcon />}
          />
        ) : null}
      </Box>
      {editable && <EditableAreaMarker />}
    </EditableAreaWrapper>
  );
};

export default InvoiceCliente;
