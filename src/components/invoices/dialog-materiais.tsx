import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

// Base components.
import { BaseDialog } from '../base';

// Hooks.
import { useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { invoice_setDialogMateriais } from '../../store/invoice/invoice-actions';
import { Grid, recomposeColor, TextField } from '@mui/material';
import { useInvoice } from '../../hooks';
import { IMateriais } from '@/interfaces/materiais';


const DialogMateriais: FC = () => {
  const dispatch = useDispatch();
  const { updateMateriais, invoice } = useInvoice();
  const { invoice_openDialogMateriais: open } = useAppSelector((state) => state.invoice);

  const [materiais, setMateriais] = useState<IMateriais>(invoice.materiais);

  /**
   * Handle close dialog.
   * @return {void}
   */
  const handleClose = (): void => {
    dispatch(invoice_setDialogMateriais(false));
  };

  /**
   * Handle input change.
   *
   * @param { ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMateriais({
      ...materiais,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle submit
   *
   */
  const handleSubmit = useCallback(() => {
    updateMateriais(materiais);
    handleClose();
  }, [materiais]);

  return (
    <BaseDialog
      maxWidth="md"
      disableCloseButton
      open={open}
      title="Materiais"
      onClose={handleClose}
      onConfirm={handleSubmit}
      confirmButtonText="Guardar Materiais"
      paperStyles={{ width: 720 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={materiais.materialAplicado}
            onChange={handleChange}
            size="small"
            margin="none"
            name="materialAplicado"
            label="Material Aplicado"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={materiais.materialParaOrcamentar}
            onChange={handleChange}
            size="small"
            margin="none"
            name="materialParaOrcamentar"
            label="Material Para Orçamentar"
          />
        </Grid>
      </Grid>
    </BaseDialog>
  );
};

export default DialogMateriais;
