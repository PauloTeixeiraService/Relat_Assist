import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

// Base components.
import { BaseDialog } from '../base';

// Hooks.
import { useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { invoice_setDialogValidacoes } from '../../store/invoice/invoice-actions';
import { Grid, recomposeColor, TextField } from '@mui/material';
import { useInvoice } from '../../hooks';
import { IValidacoes } from '@/interfaces/validacoes';
import EditableDatePicker from '../base/editable-date-picker';
import EditableDatePicker2 from '../base/editable-date-picker_2';
import { DesktopDatePicker } from '@mui/x-date-pickers';


const DialogValidacoes: FC = () => {
  const dispatch = useDispatch();
  const { updateValidacoes, invoice } = useInvoice();
  const { invoice_openDialogValidacoes: open } = useAppSelector((state) => state.invoice);

  const [validacoes, setValidacoes] = useState<IValidacoes>(invoice.validacoes);

  /**
   * Handle close dialog.
   * @return {void}
   */
  const handleClose = (): void => {
    dispatch(invoice_setDialogValidacoes(false));
  };

  /**
   * Handle input change.
   *
   * @param { ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValidacoes({
      ...validacoes,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle submit
   *
   */
  const handleSubmit = useCallback(() => {
    updateValidacoes(validacoes);
    handleClose();
  }, [validacoes]);

  const onChangeDate = (d: string | null): void => {
    console.log(d);
    if(d != null) setValidacoes({ ...validacoes, validadoEm: d });
  };


  return (
    <BaseDialog
      maxWidth="md"
      disableCloseButton
      open={open}
      title="Validações"
      onClose={handleClose}
      onConfirm={handleSubmit}
      confirmButtonText="Guardar Validações"
      paperStyles={{ width: 720 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={10} sm={5}>
          <TextField
            fullWidth
            value={validacoes.nomePessoa}
            onChange={handleChange}
            size="small"
            margin="none"
            name="nomePessoa"
            label="Nome da Pessoa"
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <div style={{ height: "30px", lineHeight: "30px" }}>
          Validado em:
          </div>
        </Grid>
        <Grid item xs={11} sm={5}>
          {/* <EditableDatePicker2
            value={validacoes.validadoEm}
            onChange={onChangeDate}
            name="date"
            label="Validado em:"
          />  */}
          <DesktopDatePicker
            value={validacoes.validadoEm}
            format='dd/MM/yyyy'
            slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true },} }}
            onChange={(newValue) => onChangeDate(newValue)}
          />
        </Grid>
      </Grid>
    </BaseDialog>
  );
};

export default DialogValidacoes;
