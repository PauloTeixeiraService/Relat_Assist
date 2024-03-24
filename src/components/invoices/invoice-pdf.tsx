import { FC, useMemo } from 'react';

// React Pdf.
import { Font } from '@react-pdf/renderer';

// Mui components.
import { Box, SectionTitle } from '../../components/base';

// Base components.
import { Document, Page, Container } from '../../components/base';

// Invoice components.
import InvoiceInfo from './invoice-info';
import InvoiceFooter from './invoice-footer';
// import InvoiceSender from './invoice-sender';
// import InvoiceSummary from './invoice-summary';
import InvoiceLineItem from './invoice-line-item';
import InvoiceTitle from '../invoices/invoice-title';
// import InvoicePaymentInfo from './invoice-payment-info';
import InvoiceItemHeader from './invoice-line-item-header';
import InvoiceCompanyLogo from '../invoices/invoice-company-logo';
// import InvoiceTermAndConditions from './invoice-term-and-condition';
import InvoiceRecipient from './invoice-cliente';

// Hooks.
// import { useGenerator } from '../../hooks/useGenerator';

// Interfaces.
import { IInvoice } from '../../interfaces/invoice';
import InvoiceCliente from './invoice-cliente';
import InvoiceEquipamento from './invoice-equipamento';
import InvoiceSolicitacaoAssistencia from './invoice-solicitacaoAssistencia';
import InvoiceServicosEfetuados from './invoice-servicosEfetuados';
import InvoiceMateriais from './invoice-materiais';
import InvoiceValidacoes from './invoice-validacoes';
import { TextField } from '@mui/material';

interface Props {
  invoice: IInvoice;
}

/**
 * Register fonts.
 */
const baseUrlFont = true
  // ? 'https://invoice.riski.me/assets/fonts/Be_Vietnam_Pro'
  // : 'http://local-cdn.test/fonts/Be_Vietnam_Pro';

// Font.register({
//   family: 'Be Vietnam Pro',
//   fonts: [
//     {
//       src: baseUrlFont + '/BeVietnamPro-Regular.ttf',
//     }, // font-style: normal, font-weight: normal
//     {
//       src: baseUrlFont + '/BeVietnamPro-Italic.ttf',
//       fontStyle: 'italic',
//     },
//     {
//       src: baseUrlFont + '/BeVietnamPro-Medium.ttf',
//       fontStyle: 'normal',
//       fontWeight: 500,
//     },
//     {
//       src: baseUrlFont + '/BeVietnamPro-MediumItalic.ttf',
//       fontStyle: 'italic',
//       fontWeight: 500,
//     },
//     {
//       src: baseUrlFont + '/BeVietnamPro-SemiBold.ttf',
//       fontStyle: 'normal',
//       fontWeight: 700,
//     },
//     {
//       src: baseUrlFont + '/BeVietnamPro-SemiBoldItalic.ttf',
//       fontStyle: 'italic',
//       fontWeight: 700,
//     },
//   ],
// });

/**
 * Main Invoice Component.
 */
const InvoicePdf: FC<Props> = ({ invoice }) => {
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


  return (
    <Document>
      <Page>
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
              <InvoiceCliente cliente={invoice.cliente}/>
              <InvoiceEquipamento equipamento={invoice.equipamento} />
              <InvoiceValidacoes validacoes={invoice.validacoes}/>
            
            </Box>
            
            <Box style={{ display: 'flex', flex: 1, flexDirection: 'column', marginLeft: '20px' }}>
              
              <InvoiceSolicitacaoAssistencia solicitacaoassistencia={invoice.solicitacaoAssistencia} />
              <InvoiceMateriais materiais={invoice.materiais} />
              <InvoiceServicosEfetuados servicosefetuados={invoice.servicosEfetuados} />
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
                  key={String(index)}
                  index={index}
                  item={tempo}
                  lastItem={invoice.temposServico.length - 1 === index}
                />
                // <a></a>
              ))}
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
            <SectionTitle>Observações: {invoice.observacoes}</SectionTitle>
            <br></br>
            </Box>
          </Container> 

        {/* Footer messages */}
        {/* <InvoiceFooter message={invoice.footerMessages} /> */}
      </Page>
    </Document>
  );
};
export default InvoicePdf;
