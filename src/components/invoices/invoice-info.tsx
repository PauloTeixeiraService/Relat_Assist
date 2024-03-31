import { ChangeEvent, FC, memo } from 'react';

// Base components.
import { Box, EditableText, Typography } from '../../components/base';

// Hooks
import { useGenerator } from '../../hooks/useGenerator';
import EditableDatePicker from '../base/editable-date-picker';
import { useInvoice } from '../../hooks';

// Date fns
import { format } from 'date-fns';
import { DateField, DesktopDatePicker, DesktopDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import 'dayjs/locale/en-gb';

// Styles.
const lineStyle = { display: 'flex', flexDirection: 'row', alignItems: 'center' };
const textStyle = { fontWeight: 600 };

interface Props {
  invoiceNumber: string | null;
}

const InvoiceInfo: FC<Props> = ({ invoiceNumber }) => {
  const { editable } = useGenerator();

  const { invoice, setInvoice } = useInvoice();

  const onChangeInvoiceNumber = (e: ChangeEvent<HTMLInputElement>): void => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  return (
    <Box style={{ backgroundColor: '#F7FBFF', borderRadius: 3, padding: editable ? '16px 20px' : '12px 16px' }}>
      
      <Box style={{ height: editable ? 26 : 20, ...lineStyle }}>
        {invoiceNumber!='' ? (<Typography style={{ minWidth: editable ? '110px' : '80px', ...textStyle }}>Nº de identificação do comprovativo: {invoiceNumber}</Typography> 
        ): (
        <Typography style={{ minWidth: editable ? '110px' : '80px', ...textStyle }}></Typography>
        )}
      </Box>
    </Box>
  );
};

const MemoizedInvoiceInfo = memo(InvoiceInfo);
export default MemoizedInvoiceInfo;
