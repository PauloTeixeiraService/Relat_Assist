import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

// Base components.
import { BaseDialog } from '../base';

// Hooks.
import { useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { invoice_setDialogSolicitacaoAssistencia } from '../../store/invoice/invoice-actions';
import { Grid, InputLabel, MenuItem, recomposeColor, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useInvoice } from '../../hooks';
import { ISolicitaoAssistencia } from '@/interfaces/solicitacaoAssistencia';


const DialogSolicitacaoAssistencia: FC = () => {
  const dispatch = useDispatch();
  const { updateSolicitacaoAssistencia, invoice } = useInvoice();
  const { invoice_openDialogSolicitacaoAssistencia: open } = useAppSelector((state) => state.invoice);

  const [solicitacaoassistencia, setSolicitacaoAssistencia] = useState<ISolicitaoAssistencia>(invoice.solicitacaoAssistencia);

  /**
   * Handle close dialog.
   * @return {void}
   */
  const handleClose = (): void => {
    dispatch(invoice_setDialogSolicitacaoAssistencia(false));
  };

  /**
   * Handle input change.
   *
   * @param { ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSolicitacaoAssistencia({
      ...solicitacaoassistencia,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange1 = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSolicitacaoAssistencia({
      ...solicitacaoassistencia,
      realizadoVia: event.target.value,
    });
  };

  /**
   * Handle submit
   *
   */
  const handleSubmit = useCallback(() => {
    updateSolicitacaoAssistencia(solicitacaoassistencia);
    handleClose();
  }, [solicitacaoassistencia]);

  return (
    <BaseDialog
      maxWidth="md"
      disableCloseButton
      open={open}
      title="Solicitação de Assistência"
      onClose={handleClose}
      onConfirm={handleSubmit}
      confirmButtonText="Guardar Solicitação de Assistência"
      paperStyles={{ width: 720 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={solicitacaoassistencia.nomeRequerente}
            onChange={handleChange}
            size="small"
            margin="none"
            name="nomeRequerente"
            label="Nome do Requerente"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={solicitacaoassistencia.descricaoPedido}
            onChange={handleChange}
            size="small"
            margin="none"
            name="descricaoPedido"
            label="Descrição do Pedido"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
                    
          <TextField
            select 
            fullWidth
            // labelId="realizadoVia"
            id="demo-simple-select"
            value={solicitacaoassistencia.realizadoVia}
            label="Realizado por Via"
            onChange={e => handleChange1(e)}
          >
            <MenuItem value={'Telefone'}>Telefone</MenuItem>
            <MenuItem value={'E-Mail'}>E-Mail</MenuItem>
            <MenuItem value={'Pessoalmente'}>Pessoalmente</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </BaseDialog>
  );
};

export default DialogSolicitacaoAssistencia;
