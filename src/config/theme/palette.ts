// Colors.
import { blueGrey, common } from '@mui/material/colors';

// Interfaces.
import { Palette } from '@mui/material/styles';

// Custom theme palette.
export const palette: Partial<Palette> = {
  background: {
    default: '#7683A3',
    paper: common.white,
  },
  primary: {
    // main: '091E53',
    light: '#dbeeff',
    main: '#4790FF',
    dark: '#2352B7',
    contrastText: '#fbfbfb',
  },
  secondary: {
    light: '#FFDE99',
    main: '#FF8C00',
    dark: '#DB6E00',
    contrastText: '#fbfbfb',
  },
  error: {
    light: '#FEC0AA',
    main: '#fe2c2c',
    dark: '#DA2030',
    contrastText: '#fbfbfb',
  },
  success: {
    light: '#b2ffae',
    main: '#05C031',
    dark: '#03A539',
    contrastText: '#fbfbfb',
  },
  text: {
    primary: blueGrey[900],
    secondary: blueGrey[600],
    disabled: blueGrey[400],
  },
};

export default palette;
