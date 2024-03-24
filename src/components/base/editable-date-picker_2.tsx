import { FC } from 'react';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

interface Props {
  label?: string;
  name: 'date' | 'due';
  value: string;
  onChange: (property: 'date' | 'due', value: string) => void;
}

const EditableDatePicker2: FC<Props> = ({ label, name, value, onChange }) => {
  const handleChange = (newValue: Date | null): void => {
    onChange(name, String(newValue));
  };

  return (
    <MobileDatePicker
      // label={label} // I don't need to display label
      closeOnSelect
      // inputFormat="MM/dd/yyyy"
      // value={value}
      onChange={handleChange}
      // renderInput={(params) => (
      //   <TextField
      //     size="small"
      //     label={label}
          
      //     {...params}
      //   />
      // )}
    />
    // <div></div>
  );
};

export default EditableDatePicker2;
