import { ChangeEvent, FC, useMemo, useState } from 'react';

// Mui components.
import { Box, SectionTitle } from '../../components/base';

// Base components.
import { Document, Page, Container } from '../../components/base';

// Invoice components.
import InvoiceInfo from './invoice-info';
import InvoiceFooter from './invoice-footer';
// import InvoiceSender from './invoice-sender';
// import InvoiceSummary from './invoice-summary';
import AddInvoiceItem from './add-invoice-item';
import DialogRecipient from './dialog-cliente';
import InvoiceLineItem from './invoice-line-item';
import InvoiceTitle from '../invoices/invoice-title';
// import InvoicePaymentInfo from './invoice-payment-info';
import InvoiceItemHeader from './invoice-line-item-header';
import InvoiceCompanyLogo from '../invoices/invoice-company-logo';
// import InvoiceTermAndConditions from './invoice-term-and-condition';
import InvoiceRecipient from './invoice-cliente';

// Hooks.
import { useGenerator } from '../../hooks/useGenerator';

// Interfaces.
import { useInvoice } from '../../hooks';
import { useDispatch } from 'react-redux';
import { app_setAlert } from '../../store/app/app-actions';
import { ITempo } from '@/interfaces/tempo';
import { invoice_setDialogCliente, invoice_setDialogEquipamento, invoice_setDialogMateriais, invoice_setDialogServicosEfetuados, invoice_setDialogSolicitacaoAssistencia, invoice_setDialogValidacoes } from '../../store/invoice/invoice-actions';
import DialogCliente from './dialog-cliente';
import DialogEquipamento from './dialog-equipamento';
import DialogSolicitacaoAssistencia from './dialog-solicitacaoAssistencia';
import DialogServicosEfetuados from './dialog-servicosEfetuados';
import DialogMateriais from './dialog-materiais';
import InvoiceCliente from './invoice-cliente';
import InvoiceEquipamento from './invoice-equipamento';
import InvoiceSolicitacaoAssistencia from './invoice-solicitacaoAssistencia';
import InvoiceServicosEfetuados from './invoice-servicosEfetuados';
import InvoiceMateriais from './invoice-materiais';
import InvoiceValidacoes from './invoice-validacoes';
import DialogValidacoes from './dialog-validacoes';
import { TextField } from '@mui/material';
import { IInvoice } from '@/interfaces/invoice';

const InvoiceEditable: FC = () => {
  const dispatch = useDispatch();
  const { editable } = useGenerator();
  //updateLogo removed
  const { invoice, handleChangeTempo, setInvoice } = useInvoice();

  const subTotal = useMemo(() => {
    let subTotal = 0;
    if(invoice.temposServico != undefined) {
    invoice.temposServico.forEach((i) => {
      
      const one_hour = 1000*60*60;
      const amount = (new Date(i.fim).getTime() - new Date(i.inicio).getTime())/(one_hour);

      subTotal += amount;
    });
  }

    return subTotal;
  }, [invoice.temposServico]);

  // const saleTax = useMemo(() => {
  //   const taxRate = parseFloat(String(invoice.taxRate)) || 0;
  //   return subTotal ? (subTotal * taxRate) / 100 : 0;
  // }, [invoice.items, invoice.taxRate]);

  /**
   *  I can't use it in child components.
   */
  const handleShowAlert = (item: ITempo): void => {
    dispatch(
      app_setAlert({
        show: true,
        messages: `Tempo removido com sucesso!`,
        severity: 'success',
      }),
    );
  };

  const onOpenDialogEditCliente = (): void => {
    dispatch(invoice_setDialogCliente(true));
  };

  const onOpenDialogEditEquipamento = (): void => {
    dispatch(invoice_setDialogEquipamento(true));
  };

  
  const onOpenDialogEditMateriais = (): void => {
    dispatch(invoice_setDialogMateriais(true));
  };

  const onOpenDialogEditServicosEfetuados = (): void => {
    dispatch(invoice_setDialogServicosEfetuados(true));
  };

  
  const onOpenDialogEditSolicitacaoAssistencia = (): void => {
    dispatch(invoice_setDialogSolicitacaoAssistencia(true));
  };

  const onOpenDialogEditValidacoes = (): void => {
    dispatch(invoice_setDialogValidacoes(true));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInvoice({
      ...invoice,
      observacoes: e.target.value,
    });
  };

  return (
    <Document>
      <Page>
        <DialogCliente />
        <DialogEquipamento />
        <DialogSolicitacaoAssistencia />
        <DialogServicosEfetuados />
        <DialogMateriais />
        <DialogValidacoes />
        <Container>
          <InvoiceTitle title="COMPROVATIVO" />
          
          <InvoiceInfo invoiceNumber='' date={invoice.date} />
          <br></br>
          <Box style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
            {/* <Box style={{ display: 'flex', flex: 1, flexDirection: 'column', marginRight: '20px' }}>
              <InvoiceCompanyLogo logo={invoice.logo} onUploadImage={updateLogo} />
              <InvoiceSender from={invoice.sender} handleOpenDialog={onOpenDialogEditSender} />
            </Box> */}
            <Box style={{ display: 'flex', flex: 1, flexDirection: 'column', marginLeft: '20px' }}>
            <SectionTitle>A preencher:</SectionTitle>
              <InvoiceCliente cliente={invoice.cliente} handleOpenDialog={onOpenDialogEditCliente} />
              <InvoiceEquipamento equipamento={invoice.equipamento} handleOpenDialog={onOpenDialogEditEquipamento} />
              <InvoiceValidacoes validacoes={invoice.validacoes} handleOpenDialog={onOpenDialogEditValidacoes} />
            
            </Box>
            
            <Box style={{ display: 'flex', flex: 1, flexDirection: 'column', marginLeft: '20px' }}>
              
              <InvoiceSolicitacaoAssistencia solicitacaoassistencia={invoice.solicitacaoAssistencia} handleOpenDialog={onOpenDialogEditSolicitacaoAssistencia} />
              <InvoiceMateriais materiais={invoice.materiais} handleOpenDialog={onOpenDialogEditMateriais} />
              <InvoiceServicosEfetuados servicosefetuados={invoice.servicosEfetuados} handleOpenDialog={onOpenDialogEditServicosEfetuados} />
            </Box>
            
            <br></br>

          </Box>
          <Box style={{ marginBottom: '16px' }}>
            <hr></hr>
            <br></br>
            <SectionTitle>Horas de Serviço a Registar:</SectionTitle>
            <br></br>
            <InvoiceItemHeader />
            {Array.isArray(invoice.temposServico) &&
              invoice.temposServico.length > 0 &&
              // Render invoice items
              invoice.temposServico.map((tempo, index) => (
                <InvoiceLineItem
                  dispatchAlert={handleShowAlert}
                  onChange={handleChangeTempo}
                  key={String(index)}
                  index={index}
                  item={tempo}
                  lastItem={invoice.temposServico.length - 1 === index}
                />
              ))}

            {editable && <AddInvoiceItem />}
          </Box>

           {/* Invoice Summary & Payment Info */}
          {/* <Box style={{ display: 'flex', flexDirection: 'row', marginBottom: '30px' }}>
            <Box style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
              <InvoicePaymentInfo paymentInfo={invoice.paymentInfo as IInvoicePaymentInfo} />
            </Box>
            <Box style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
              <InvoiceSummary subTotal={subTotal} taxRate={invoice.taxRate} saleTax={saleTax} />
            </Box>
          </Box> */}

          {/* Invoice Term & Conditions */}
          {/* <Box style={{ display: 'flex', flexDirection: 'row', width: '70%', marginBottom: '20px' }}>
            <InvoiceTermAndConditions terms={String(invoice.terms)} />
          </Box> */}
          <br></br>

          <Box style={{ marginBottom: '16px' }}>
            <hr></hr>
            <br></br>
            <SectionTitle>Outro:</SectionTitle>
            <br></br>
            <TextField
                fullWidth
                value={invoice.observacoes}
                onChange={handleChange}
                size="medium"
                margin="none"
                name="observacoes"
                label="Observações"
                multiline={true}
                rows={7}
              />
            </Box>
          </Container>

        {/* Footer messages */}
        {/* <InvoiceFooter message={invoice.footerMessages} /> */}
      </Page>
    </Document>
  );
};
export default InvoiceEditable;
