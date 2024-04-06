import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

// Base components.
import { BaseDialog } from '../base';

// Hooks.
import { useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { invoice_setDialogServicosEfetuados } from '../../store/invoice/invoice-actions';
import { Grid, MenuItem, recomposeColor, TextField } from '@mui/material';
import { useInvoice } from '../../hooks';
import { IServicosEfetuados } from '@/interfaces/servicosEfetuados';


const DialogServicosEfetuados: FC = () => {
  const dispatch = useDispatch();
  const { updateServicosEfetuados, invoice } = useInvoice();
  const { invoice_openDialogServicosEfetuados: open } = useAppSelector((state) => state.invoice);

  const [servicosefetuados, setServicosEfetuados] = useState<IServicosEfetuados>(invoice.servicosEfetuados);

  /**
   * Handle close dialog.
   * @return {void}
   */
  const handleClose = (): void => {
    dispatch(invoice_setDialogServicosEfetuados(false));
  };

  /**
   * Handle input change.
   *
   * @param { ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setServicosEfetuados({
      ...servicosefetuados,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange1 = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setServicosEfetuados({
      ...servicosefetuados,
      maquinaOperacional: event.target.value,
    });
  };

  const handleChange2 = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setServicosEfetuados({
      ...servicosefetuados,
      permanecemServicosPendentes: event.target.value,
    });
  };

  /**
   * Handle submit
   *
   */
  const handleSubmit = useCallback(() => {
    updateServicosEfetuados(servicosefetuados);
    handleClose();
  }, [servicosefetuados]);

  return (
    <BaseDialog
      maxWidth="md"
      disableCloseButton
      open={open}
      title="Serviços Efetuados"
      onClose={handleClose}
      onConfirm={handleSubmit}
      confirmButtonText="Guardar Serviços Efetuados"
      paperStyles={{ width: 720 }}
    >
      <Grid container spacing={3}>
        <Grid item xs={24} sm={12}>
          <TextField
            fullWidth
            multiline            
            value={servicosefetuados.descricaoServico}
            onChange={handleChange}
            size="small"
            margin="none"
            name="descricaoServico"
            label="Descrição do Serviço"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select 
            fullWidth
            value={servicosefetuados.maquinaOperacional}
            label="Máquina Operacional"
            onChange={e => handleChange1(e)}
          >
            <MenuItem value={'Sim'}>Sim</MenuItem>
            <MenuItem value={'Não'}>Não</MenuItem>
            <MenuItem value={'Condicionalmente'}>Condicionalmente</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select 
            fullWidth
            value={servicosefetuados.permanecemServicosPendentes}
            label="Permanecem Servicos Pendentes?"
            onChange={e => handleChange2(e)}
          >
          <MenuItem value={'Sim'}>Sim</MenuItem>
          <MenuItem value={'Não'}>Não</MenuItem>
          <MenuItem value={'Outro'}>Outro</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </BaseDialog>
  );
};

export default DialogServicosEfetuados;
