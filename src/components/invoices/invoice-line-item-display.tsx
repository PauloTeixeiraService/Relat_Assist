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
      <Box style={{ width: '21%', ...colStyles }}>
          {renderDivider}
          <Typography style={{ fontWeight: 600, marginLeft: '12px' }}>{new Date(item.data).toLocaleDateString()}</Typography>
        </Box>
        <Box style={{ width: '14%', ...colStyles }}>
          {renderDivider}
          <Typography style={{ fontWeight: 600, marginLeft: '12px' }}>{new Date(item.inicio).toLocaleTimeString()}</Typography>
        </Box>
        <Box style={{ width: '14%', ...colStyles }}>
          {renderDivider}
          <Typography style={{ fontWeight: 600, marginLeft: '12px' }}>{new Date(item.fim).toLocaleTimeString()}</Typography>
        </Box>
        <Box style={{ width: '16%', ...colStyles }}>
          {renderDivider}
          <Typography style={{ fontWeight: 600, marginLeft: '12px' }}>{Math.round((new Date(item.fim).valueOf() - new Date(item.inicio).valueOf())/1000/60/60*2)/2}</Typography>
        </Box>
        <Box style={{ width: '17%', ...colStyles }}>
          {renderDivider}
          <Typography style={{ fontWeight: 600, marginLeft: '12px' }}>{item.kmIda}</Typography>
        </Box>
        <Box style={{ width: '18%', ...colStyles }}>
          {renderDivider}
          <Typography style={{ fontWeight: 600, marginLeft: '12px' }}>{item.kmVolta}</Typography>
        </Box>
      </>
    </Box>
  );
};

export default InvoiceItemDisplay;
