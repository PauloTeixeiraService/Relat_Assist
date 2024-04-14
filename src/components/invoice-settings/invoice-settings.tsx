import { FC } from 'react';

// Mui components.
import { Paper, SxProps, Typography } from '@mui/material';

// Mui icons.
import ConstructionIcon from '@mui/icons-material/Construction';
interface Props {
  sx?: SxProps;
}

const InvoiceSettings: FC<Props> = ({ sx }) => {
  return (
    <Paper
      sx={{
        flex: 1,
        width: '95%',
        minHeight: 490,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        flexDirection: 'column',
        ...sx,
      }}
    >
      <br></br>
      <br></br>
      <ConstructionIcon sx={{ color: 'text.disabled', fontSize: 42, mb: 2 }} />
      <Typography sx={{ color: 'text.disabled', fontSize: 16 }}>Opções</Typography>
    </Paper>
  );
};

export default InvoiceSettings;
