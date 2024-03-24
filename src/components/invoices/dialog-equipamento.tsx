import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

// Base components.
import { BaseDialog } from '../base';

// Hooks.
import { useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { invoice_setDialogEquipamento } from '../../store/invoice/invoice-actions';
import { Grid, recomposeColor, TextField } from '@mui/material';
import { useInvoice } from '../../hooks';
import { IEquipamento } from '@/interfaces/equipamento';


const DialogEquipamento: FC = () => {
  const dispatch = useDispatch();
  const { updateEquipamento, invoice } = useInvoice();
  const { invoice_openDialogEquipamento: open } = useAppSelector((state) => state.invoice);

  const [equipamento, setEquipamento] = useState<IEquipamento>(invoice.equipamento);

  /**
   * Handle close dialog.
   * @return {void} 
   */
  const handleClose = (): void => {
    dispatch(invoice_setDialogEquipamento(false));
  };

  /**
   * Handle input change.
   *
   * @param { ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEquipamento({
      ...equipamento,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle submit
   *
   */
  const handleSubmit = useCallback(() => {
    updateEquipamento(equipamento);
    handleClose();
  }, [equipamento]);

  return (
    <BaseDialog
      maxWidth="md"
      disableCloseButton
      open={open}
      title="Equipamento"
      onClose={handleClose}
      onConfirm={handleSubmit}
      confirmButtonText="Guardar Equipamento"
      paperStyles={{ width: 720 }}
    >
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={equipamento.tipologia}
            onChange={handleChange}
            size="small"
            margin="none"
            name="tipologia"
            label="Tipologia ( CNC / Lixadora / Seccionadora / Outro )"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={equipamento.marca}
            onChange={handleChange}
            size="small"
            margin="none"
            name="marca"
            label="Marca"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={equipamento.modelo}
            onChange={handleChange}
            size="small"
            margin="none"
            name="modelo"
            label="Modelo"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={equipamento.matrícula}
            onChange={handleChange}
            size="small"
            margin="none"
            name="matrícula"
            label="Matrícula"
          />
        </Grid>
      </Grid>
    </BaseDialog>
  );
};

export default DialogEquipamento;
