import { FC, ReactNode } from 'react';

// Mui components.
import MuiTypography from '@mui/material/Typography';

// Base components.
import { Typography } from '.';

// Hooks.
import { useGenerator } from '../../hooks/useGenerator';

// Utilities.
import { createSpacing } from '../../utils/theme';

interface Props {
  children: ReactNode;
}

const PDFData: FC<Props> = ({ children }) => {
  const { editable } = useGenerator();
  return editable ? (
    <MuiTypography
      sx={{ letterSpacing: '0.7px', mb: 0.7, fontWeight: 'normal' }}
    >
      {children}
    </MuiTypography>
  ) : (
    <Typography
      style={{
        letterSpacing: '0.7px',
        fontWeight: 'bold',
        marginBottom: editable ? 0.7 : createSpacing(0.7),
      }}
    >
      {children}
    </Typography>
  );
};

export default PDFData;
