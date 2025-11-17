import { FC, useMemo } from 'react';

// React Pdf.
import { Font, Text } from '@react-pdf/renderer';

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

import MuiBox from '@mui/material/Box';
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
import { TextField, Typography } from '@mui/material';
import PDFData from '../base/pdf-data';
import PDFDataBold from '../base/pdf-data-bold';
import InvoiceLineItemDisplay from './invoice-line-item-display';
import InvoiceItemHeaderDisplay from './invoice-line-item-header-display';


import PATEKNIKA_logo_fundo_branco from '../../assets/images/PATEKNIKA_logo_fundo_branco.png';

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

const getLineCount = (text: string) => {
  // Create a temporary span element
  const span = document.createElement("span");
  span.style.position = "absolute";
  span.style.visibility = "hidden";
  span.style.fontSize = "15px"; // Adjust to your font size
  span.style.lineHeight = "1.5"; // Adjust to your line height
  span.style.width = "6000px"; // Adjust to your desired width
  span.textContent = text;

  document.body.appendChild(span);
  const lineHeight = parseFloat(span.style.lineHeight);
  const height = span.offsetHeight;
  document.body.removeChild(span);

  // Calculate the number of lines
  const lineCount = Math.ceil(height / lineHeight);
  return lineCount;
};

/**
 * Main Invoice Component.
 */
const InvoicePdf: FC<Props> = ({ invoice }) => {

  const descricaoServicoLines = getLineCount(invoice.servicosEfetuados.descricaoServico ?? '');
  
  const getCurrentTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
    
  };
  
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

  const colStyles = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };


  return (
    <Document>
      <Page>
        <Container>
        <SectionTitle> </SectionTitle>

          {/* <Box style={{ display: 'flex', flex: 0.6, flexDirection: 'column', marginRight: '55px' }}> */}
              <InvoiceCompanyLogo logo={PATEKNIKA_logo_fundo_branco} onUploadImage={() => null} />
            {/* </Box> */}
            {/* <SectionTitle> </SectionTitle> */}
             
          <InvoiceTitle title="RELATÓRIO" />
          <SectionTitle> </SectionTitle>
          
          <InvoiceInfo invoiceNumber={getCurrentTimestamp()} />
              <SectionTitle> </SectionTitle>
              <SectionTitle> </SectionTitle>
          <br></br>
          <Box style={{ display: 'flex', flexDirection: 'row', marginBottom: '22px' }}>
            {/* <Box style={{ display: 'flex', flex: 1, flexDirection: 'column', marginRight: '20px' }}>
              <InvoiceCompanyLogo logo={invoice.logo} onUploadImage={updateLogo} />
              <InvoiceSender from={invoice.sender} handleOpenDialog={onOpenDialogEditSender} />
            </Box> */}
            <Box style={{ display: 'flex', flex: 1, flexDirection: 'column', marginLeft: '22px' }}>
              <br></br>
              <SectionTitle>Cliente</SectionTitle>
              <PDFDataBold>Nome: {invoice.cliente.nome}</PDFDataBold>
              <br></br>
              <PDFDataBold>NIF: {invoice.cliente.NIF}</PDFDataBold>
              <br></br>
              <PDFDataBold>Morada: {invoice.cliente.morada}</PDFDataBold>
              <br></br>
              <PDFDataBold>E-Mail: {invoice.cliente.email}</PDFDataBold>
              <br></br>

              
              <SectionTitle> </SectionTitle>
              <SectionTitle>Equipamento</SectionTitle>
              <PDFDataBold>Tipologia: {invoice.equipamento.tipologia}</PDFDataBold>
              <br></br>
              <PDFDataBold>Marca: {invoice.equipamento.marca}</PDFDataBold>
              <br></br>
              <PDFDataBold>Modelo: {invoice.equipamento.modelo}</PDFDataBold>
              <br></br>
              <PDFDataBold>Matrícula: {invoice.equipamento.matrícula}</PDFDataBold>
              <br></br>

              
              <SectionTitle> </SectionTitle>
              <SectionTitle>Solicitação de Assistência</SectionTitle>
              <PDFDataBold>Pedido realizado por via: {invoice.solicitacaoAssistencia.realizadoVia}</PDFDataBold>
              <br></br>
              <PDFDataBold>Nome do Requerente: {invoice.solicitacaoAssistencia.nomeRequerente}</PDFDataBold>
              <br></br>
              <PDFDataBold>Descrição do Pedido: {invoice.solicitacaoAssistencia.descricaoPedido}</PDFDataBold>
              <br></br>

              <PDFDataBold>{descricaoServicoLines}</PDFDataBold>

              {descricaoServicoLines < 13 ? (
      <>
              <SectionTitle> </SectionTitle>
              <SectionTitle>Serviços Efetuados</SectionTitle>
              <PDFDataBold>Descrição do Serviço: {invoice.servicosEfetuados.descricaoServico}</PDFDataBold>
              <br></br>
              <PDFDataBold>Permanecem Serviços Pendentes: {invoice.servicosEfetuados.permanecemServicosPendentes}</PDFDataBold>
              <br></br>
              <PDFDataBold>Máquina Operacional: {invoice.servicosEfetuados.maquinaOperacional}</PDFDataBold>
              <br></br>
        </>
            ):null}
            
            </Box>
            
              <SectionTitle> </SectionTitle>
              <SectionTitle> </SectionTitle>
            <br></br>

            </Box>
            </Container> 

        <InvoiceFooter message={"Pateknika Unipessoal Lda | Rua Chaimite 360 4435-025 Rio Tinto | NIF: 518074633 \n Móvel: 964007744 (Rede Móvel Nacional) | pateknika@outlook.pt | www.Pateknika.pt"} />

            </Page>

     {descricaoServicoLines > 12 ? (
       <>
       <Page>
        <Container>
        <SectionTitle> </SectionTitle>
          <Box style={{ display: 'flex', flexDirection: 'row', marginBottom: '22px' }}>
            <Box style={{ display: 'flex', flex: 1, flexDirection: 'column', marginLeft: '22px' }}>
              <SectionTitle> </SectionTitle>
              <SectionTitle>Serviços Efetuados</SectionTitle>
              <PDFDataBold>Descrição do Serviço: {invoice.servicosEfetuados.descricaoServico}</PDFDataBold>
              <br></br>
              <PDFDataBold>Permanecem Serviços Pendentes: {invoice.servicosEfetuados.permanecemServicosPendentes}</PDFDataBold>
              <br></br>
              <PDFDataBold>Máquina Operacional: {invoice.servicosEfetuados.maquinaOperacional}</PDFDataBold>
              <br></br>
            
            </Box>
            
              <SectionTitle> </SectionTitle>
              <SectionTitle> </SectionTitle>
            <br></br>

            </Box>
            </Container> 

        <InvoiceFooter message={"Pateknika Unipessoal Lda | Rua Chaimite 360 4435-025 Rio Tinto | NIF: 518074633 \n Móvel: 964007744 (Rede Móvel Nacional) | pateknika@outlook.pt | www.Pateknika.pt"} />

            </Page>
              </>
    
    ):null}
  
        <Page>
        <Container>
          <Box style={{ marginBottom: '16px' }}>
            <hr></hr>
              <SectionTitle> </SectionTitle>
              <SectionTitle> </SectionTitle>
            <br></br>
            
              <SectionTitle> </SectionTitle>
              <SectionTitle>Materiais</SectionTitle>
              <PDFDataBold>Material Aplicado: {invoice.materiais.materialAplicado}</PDFDataBold>
              <br></br>
              <PDFDataBold>Material para orçamentar: {invoice.materiais.materialParaOrcamentar}</PDFDataBold>
              <br></br>

              <SectionTitle> </SectionTitle>
              <SectionTitle>Validações</SectionTitle>
              <PDFDataBold>Validado por: {invoice.validacoes.nomePessoa}</PDFDataBold>
              <br></br>
              <PDFDataBold>Em: {new Date(invoice.validacoes.validadoEm).toLocaleDateString()}</PDFDataBold>
              <br></br>
            
              <SectionTitle> </SectionTitle>
              <SectionTitle> </SectionTitle>
            <br></br>
            
            <SectionTitle>Horas de Serviço a Registar:</SectionTitle>
            <br></br>
            <InvoiceItemHeaderDisplay />
            {Array.isArray(invoice.temposServico) &&
              invoice.temposServico.length > 0 &&
              // Render invoice items 
              invoice.temposServico.map((tempo, index) => (

                <InvoiceLineItemDisplay 
                index={index}
                item={tempo}
                />
                
                // <PDFDataBold>{tempo.nota} - {new Date(tempo.inicio).toLocaleDateString("en-gb")} - {new Date(tempo.fim).toLocaleDateString("en-gb")}</PDFDataBold>
                
              ))}

{/*               
            {Array.isArray(invoice.temposServico) &&
              invoice.temposServico.length > 0 &&
              // Render invoice items
              invoice.temposServico.map((tempo, index) => (

                // <InvoiceLineItemDisplay 
                // index={index}
                // item={tempo}
                // />
                
                <PDFDataBold>{tempo.nota} - {new Date(tempo.inicio).toLocaleDateString("en-gb")} - {new Date(tempo.fim).toLocaleDateString("en-gb")}</PDFDataBold>
                
              ))} */}
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
            <SectionTitle>Observações:</SectionTitle>            
            <PDFDataBold>{invoice.observacoes}</PDFDataBold>
            <br></br>
            </Box>
          </Container> 

        {/* Footer messages */}
      <InvoiceFooter message={"Pateknika Unipessoal Lda | Rua Chaimite 360 4435-025 Rio Tinto | NIF: 518074633 \n Móvel: 964007744 (Rede Móvel Nacional) | pateknika@outlook.pt | www.Pateknika.pt"} />
      </Page>
    </Document>
  );
};
export default InvoicePdf;
