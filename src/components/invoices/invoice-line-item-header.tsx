import { FC, ReactElement } from 'react';

// Base components.
import { Box, Typography } from '../../components/base';

// Hooks.
import { useGenerator } from '../../hooks/useGenerator';

// Styles.
const colStyles = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
};

const InvoiceItemHeader: FC = () => {
  const { editable } = useGenerator();

  const renderDivider: ReactElement = (
    <Box style={{ width: '1px', height: 12, backgroundColor: '#dfe5ec', position: 'absolute', left: 0 }} />
  );

  return (
    <Box
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        justifyContent: 'flex-start',
        backgroundColor: '#EEF6FE',
        padding: '6px 16px',
        minHeight: editable ? '48px' : '34px',
      }}
    >
      <>
        <Box style={{ width: '40%', ...colStyles }}>
          <Typography
            style={{
              fontWeight: 600,
            }}
          >
            {'Apontamentos do Serviço'}
          </Typography>
        </Box>
        <Box style={{ width: '30%', ...colStyles }}>
          {renderDivider}
          <Typography style={{ fontWeight: 600, marginLeft: '12px' }}>{'Início'}</Typography>
        </Box>
        <Box style={{ width: '30%', ...colStyles }}>
          {renderDivider}
          <Typography style={{ fontWeight: 600, marginLeft: '12px' }}>{'Fim'}</Typography>
        </Box>
      </>
    </Box>
  );
};

export default InvoiceItemHeader;
