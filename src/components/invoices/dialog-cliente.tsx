import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

// Base components.
import { BaseDialog } from '../base';

// Hooks.
import { useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { invoice_setDialogCliente } from '../../store/invoice/invoice-actions';
import { Grid, recomposeColor, TextField } from '@mui/material';
import { useInvoice } from '../../hooks';
import { ICliente } from '@/interfaces/cliente';


const DialogCliente: FC = () => {
  const dispatch = useDispatch();
  const { updateCliente, invoice } = useInvoice();
  const { invoice_openDialogCliente: open } = useAppSelector((state) => state.invoice);

  const [cliente, setCliente] = useState<ICliente>(invoice.cliente);

  /**
   * Handle close dialog.
   * @return {void}
   */
  const handleClose = (): void => {
    dispatch(invoice_setDialogCliente(false));
  };

  /**
   * Handle input change.
   *
   * @param { ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle submit
   *
   */
  const handleSubmit = useCallback(() => {
    updateCliente(cliente);
    handleClose();
  }, [cliente]);

  return (
    <BaseDialog
      maxWidth="md"
      disableCloseButton
      open={open}
      title="Cliente"
      onClose={handleClose}
      onConfirm={handleSubmit}
      confirmButtonText="Guardar Cliente"
      paperStyles={{ width: 720 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={cliente.nome}
            onChange={handleChange}
            size="small"
            margin="none"
            name="nome"
            label="Nome"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={cliente.morada}
            onChange={handleChange}
            size="small"
            margin="none"
            name="morada"
            label="Morada"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={cliente.NIF}
            onChange={handleChange}
            size="small"
            margin="none"
            name="NIF"
            label="NIF"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={cliente.email}
            onChange={handleChange}
            size="small"
            margin="none"
            name="email"
            label="E-Mail"
          />
        </Grid>
      </Grid>
    </BaseDialog>
  );
};

export default DialogCliente;
