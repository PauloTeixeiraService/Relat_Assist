import { FC, useEffect, useState } from 'react';

// Mui components.
import { AppBar as MuiAppBar, Container, IconButton, Typography, Box } from '@mui/material';

// Config.
import { AppConfig } from '../../config';
import { grey } from '@mui/material/colors';
import PATEKNIKA_logo_vertical_fundo_branco from '../../assets/images/PATEKNIKA_logo_vertical_fundo_branco.png';
import InvoiceCompanyLogo from '../invoices/invoice-company-logo';

const AppBar: FC = () => {
  const [zIndex, setZIndex] = useState<number>(3);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const scrollCheck = window.scrollY;
      if (scrollCheck > 60) {
        setZIndex(1);
      } else {
        setZIndex(3);
      }
    });
  }, []);

  return (
    <MuiAppBar elevation={0} color="transparent" sx={{ py: 5, zIndex }}>
      <Container sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h2" component="h1" color="primary.contrastText" sx={{ mb: 1 }}>
            {AppConfig.appName}
          </Typography>
          <Typography sx={{ color: grey[100] }}>{AppConfig.appDescription}</Typography>
          <InvoiceCompanyLogo logo={PATEKNIKA_logo_vertical_fundo_branco} onUploadImage={() => null} />

        </Box>
        <Box sx={{ ml: 'auto' }}>          
          <InvoiceCompanyLogo logo={PATEKNIKA_logo_vertical_fundo_branco} onUploadImage={() => null} />
        </Box>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;
