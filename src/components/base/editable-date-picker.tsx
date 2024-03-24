import { FC } from 'react';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers';

interface Props {
  label?: string;
  name: 'date' | 'due';
  value: string;
  onChange: (property: 'date' | 'due', value: string) => void;
}

const EditableDatePicker: FC<Props> = ({ label, name, value, onChange }) => {
  const handleChange = (newValue: Date | null): void => {
    onChange(name, String(newValue));
  };

  return (
    <DesktopDatePicker
      // label={label} // I don't need to display label
      value={new Date(value)}
      onChange={handleChange}
      // renderInput={(e) => (
      //   <TextField
      //     size="small"
      //     sx={{
      //       '& .MuiInputBase-input.MuiInputBase-inputSizeSmall': {
      //         padding: '2.4px 8px!important',
      //       },
      //       '& .MuiInputBase-sizeSmall.MuiInputBase-multiline': {
      //         padding: '2.4px 8px!important',
      //       },
      //       '& .MuiOutlinedInput-notchedOutline': {
      //         border: '1px solid transparent !important',
      //       },
      //       '&:hover': {
      //         backgroundColor: (theme) => theme.palette.primary.light,
      //         '& .MuiOutlinedInput-notchedOutline': {
      //           border: '1px solid #bed1e4 !important',
      //         },
      //       },
      //       '&.Mui-focused': {
      //         backgroundColor: (theme) => theme.palette.primary.light,
      //         '& .MuiOutlinedInput-notchedOutline': {
      //           border: '1px solid #bed1e4 !important',
      //         },
      //       },
      //     }}
      //     {...params}
      //   />
      // )}
    />
  );
};

export default EditableDatePicker;
