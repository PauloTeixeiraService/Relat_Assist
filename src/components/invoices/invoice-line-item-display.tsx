import { FC, ReactElement } from 'react';

// Base components.
import { Box, Typography } from '../../components/base';

// Hooks.
import { useGenerator } from '../../hooks/useGenerator';
import { ITempo } from '@/interfaces/tempo';

// Styles.
const colStyles = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

interface Props {
  item: ITempo;
  index: number;
}

const InvoiceItemDisplay: FC<Props> = ({ item, index}) => {
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
        backgroundColor: index % 2 === 0 ? '#fff' : '#F6F9FC',
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
            {item.nota}
          </Typography>
        </Box>
        <Box style={{ width: '30%', ...colStyles }}>
          {renderDivider}
          <Typography style={{ fontWeight: 600, marginLeft: '12px' }}>{new Date(item.inicio.toString()).toLocaleString()}</Typography>
        </Box>
        <Box style={{ width: '30%', ...colStyles }}>
          {renderDivider}
          <Typography style={{ fontWeight: 600, marginLeft: '12px' }}>{new Date(item.fim.toString()).toLocaleString()}</Typography>
        </Box>
      </>
    </Box>
  );
};

export default InvoiceItemDisplay;
