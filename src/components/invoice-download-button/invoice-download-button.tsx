import { FC, useCallback, useEffect, useMemo } from 'react';

// React Pdf.
import { Document, Page, Text, usePDF } from '@react-pdf/renderer';

// Mui components.
import { Box, Button, IconButton, Typography } from '@mui/material';

// Context.
import { generatorContext } from '../../context/generator-context';

// Faker
// import { faker } from '@faker-js/faker';

// Components.
import { InvoicePdf } from '../invoices';
// import { StyledButton } from '../../components/base';

/** Mui icons. */
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

// date fns
import { format } from 'date-fns';
// Interfaces.
import { useAppSelector } from '../../store';
import { IInvoice } from '../../interfaces/invoice';
import { ISetInvoice } from '../../store/invoice/invoice-actions';
import { useInvoice } from '../../hooks';
import { ArrowDownward } from '@mui/icons-material';
import { wait } from '@testing-library/user-event/dist/utils';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// import emailjs from '@emailjs/browser';

import axios from 'axios'

// const nodemailer = require("nodemailer");


interface PdfDocumentProps {
  invoice: IInvoice;
}
const PdfDocument: FC<PdfDocumentProps> = ({ invoice }) => <InvoicePdf invoice={invoice} />;


const BUTTON_SIZE = 50;

interface Props {
  setInvoice: (invoice: IInvoice) => ISetInvoice;
}
const InvoiceDownloadButton: FC<Props> = ({ setInvoice }) => {
  const { invoice_data: persistedInvoice } = useAppSelector((state) => state.invoice);
  const { invoice, replace, reset } = useInvoice();
  
  const [pdfInstance, updatePdfInstance] = usePDF({
    document: persistedInvoice ? (
      <PdfDocument invoice={invoice} />
    ) : (
      <Document>
        <Page>
          <Text>Opss...</Text>
        </Page>
      </Document>
    ),
  });

  // const send= async()=>{

  //   fetch(String(pdfInstance.url), {
  //     method: 'GET',
  //     headers: { 'Content-Type': pdfInstance.blob?.type || 'application/pdf' },
  //   })
  //     .then((response) => response.blob())
  //     .then((blob) => {

  //       let formData = new FormData();
  //       // let fileName = `${blob.name}.${blob.extension}`;
  //       let file = new File([blob], "test.pdf");
  //       formData.append('file', file, "test.pdf");

  //       axios.post("http://localhost:8000/sendPdf",        
  //           formData, {
  //             headers: {
  //               'Content-Type': `multipart/form-data`,
  //             },
  //           }).then(response=>{
  //                 console.log(response);
  //                 alert(response.data)
  //               })
              
  //   })
  // }
 
  useEffect(() => {
    const intervalAutoSaveInvoice = setInterval(() => {
      setInvoice(invoice);
      updatePdfInstance(<PdfDocument invoice={invoice} />);
    }, 2000);
    return () => clearInterval(intervalAutoSaveInvoice);
  }, [invoice]);

  const guardar = (): void => {    
    wait(5000);

    localStorage.setItem("rascunho", JSON.stringify(invoice));

    setInvoice(invoice);

    updatePdfInstance(<PdfDocument invoice={invoice} />);
  }

  const carregar = (): void => {    

    var ri = localStorage.getItem("rascunho");

    console.log(ri);

    if(ri != null){
      var rascunhoInvoice = JSON.parse(ri);

      rascunhoInvoice.temposServico = [];

      replace(rascunhoInvoice);

      setInvoice(rascunhoInvoice);

      updatePdfInstance(<PdfDocument invoice={rascunhoInvoice} />);
    }
  }

  const handleDownloadPdf = (): void => {    

    const initialValue = localStorage.getItem("count");
    if (initialValue){
      let newValue = Number(initialValue) +1;
      localStorage.setItem("count", newValue.toString());
    }else{
      localStorage.setItem("count", "1");
    }

    setInvoice(invoice);

    wait(5000);

    updatePdfInstance(<PdfDocument invoice={invoice} />);

    wait(5000);

    fetch(String(pdfInstance.url), {
      method: 'GET',
      headers: { 'Content-Type': pdfInstance.blob?.type || 'application/pdf' },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;

            
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        const invoiceFileName = `relatorio_Nr_${year}${month}${day}${hours}${minutes}${seconds}.pdf`;


        // Set attribute link download
        link.setAttribute('download', invoiceFileName);

        // Append link to the element;
        document.body.appendChild(link);

        // Finally download file.
        link.click();

        // Clean up and remove it from dom
        link.parentNode?.removeChild(link);
      });
  };

  
  const handleSendPdf = (): void => {    

    
    const initialValue = localStorage.getItem("count");
    if (initialValue){
      let newValue = Number(initialValue) +1;
      localStorage.setItem("count", newValue.toString());
    }else{
      localStorage.setItem("count", "1");
    }

    setInvoice(invoice);

    wait(5000);

    updatePdfInstance(<PdfDocument invoice={invoice} />);

    wait(5000);

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const invoiceFileName = `relatorio_Nr_${year}${month}${day}${hours}${minutes}${seconds}.pdf`;

    fetch(String(pdfInstance.url), {
      method: 'GET',
      headers: { 'Content-Type': pdfInstance.blob?.type || 'application/pdf' },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        var file = new File([blob], invoiceFileName);
        console.log(invoiceFileName);
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', invoice.cliente.email);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };

        axios.post("https://mailsender-tau.vercel.app/sendPdf", formData)
          .then(response=>{
            console.log(response);
            alert(response.data)
          })
        // const url = window.URL.createObjectURL(new Blob([blob]));
        // const link = document.createElement('a');
        // link.href = url;

        // // Set attribute link download
        // link.setAttribute('download', invoiceFileName);

        // // Append link to the element;
        // document.body.appendChild(link);

        // // Finally download file.
        // link.click();

        // // Clean up and remove it from dom
        // link.parentNode?.removeChild(link);
      });
  };
  /** Set persisted invoice */
  useEffect(() => {
    if (!persistedInvoice) setInvoice(invoice);
  }, [persistedInvoice]);

  return (
    <generatorContext.Provider value={{ editable: false, debug: true }}>
      <Box
        sx={{
          ml: -3, flex: 1, position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        flexDirection: 'column',        
        // zIndex: 2,
        top: -BUTTON_SIZE-310,
        }}
      >
        {!pdfInstance.error ? (
          !pdfInstance.loading && (
            <div>
            <IconButton
              sx={{
                backgroundColor: '#778899',
                border: '3px solid #fff',
                height: BUTTON_SIZE,
                width: BUTTON_SIZE,
                borderRadius: `${BUTTON_SIZE}px`,
                // transition: (theme) => theme.transitions.create(['width']),
                textAlign: 'center',
                // overflow: 'hidden',
                // '& .MuiTypography-root': {
                //   transform: 'translateX(150px)',
                //   transition: (theme) => theme.transitions.create(['transform', 'width']),
                //   fontSize: 0,
                // },
                // '&:hover': {
                //   backgroundColor: '#778899',
                //   width: 180,
                //   '& .MuiTypography-root': {
                //     transform: 'translateX(0px)',
                //     fontSize: 13,
                //   },
                //   '& svg': {
                //     mr: 2,
                //   },
                // },
              }}
              onClick={reset}
            >
              <DeleteIcon sx={{ color: 'secondary.contrastText', fontSize: 26 }} />
              {/* <Typography sx={{ color: 'secondary.contrastText', fontWeight: 'bold' }}>Limpar</Typography> */}
            </IconButton>
            <br></br>
            <br></br>
            <IconButton
              sx={{
                backgroundColor: '#7fa91b',
                border: '3px solid #fff',
                height: BUTTON_SIZE,
                width: BUTTON_SIZE,
                borderRadius: `${BUTTON_SIZE}px`,
                // transition: (theme) => theme.transitions.create(['width']),
                textAlign: 'center',
                // overflow: 'hidden',
                // '& .MuiTypography-root': {
                //   transform: 'translateX(150px)',
                //   transition: (theme) => theme.transitions.create(['transform', 'width']),
                //   fontSize: 0,
                // },
                // '&:hover': {
                //   backgroundColor: '#7fa91b',
                //   width: 180,
                //   '& .MuiTypography-root': {
                //     transform: 'translateX(0px)',
                //     fontSize: 13,
                //   },
                //   '& svg': {
                //     mr: 2,
                //   },
                // },
              }}
              onClick={guardar}
            >
              <SaveIcon sx={{ color: 'secondary.contrastText', fontSize: 26 }} />
              {/* <Typography sx={{ color: 'secondary.contrastText', fontWeight: 'bold' }}>Guardar Rascunho</Typography> */}
            </IconButton>
            <br></br>
            <br></br>
            <IconButton
              sx={{
                backgroundColor: '#ffcb2f ',
                border: '3px solid #fff',
                height: BUTTON_SIZE,
                width: BUTTON_SIZE,
                borderRadius: `${BUTTON_SIZE}px`,
                // transition: (theme) => theme.transitions.create(['width']),
                textAlign: 'center',
                // overflow: 'hidden',
                // '& .MuiTypography-root': {
                //   transform: 'translateX(150px)',
                //   transition: (theme) => theme.transitions.create(['transform', 'width']),
                //   fontSize: 0,
                // },
                // '&:hover': {
                //   backgroundColor: '#ffcb2f ',
                //   width: 180,
                //   '& .MuiTypography-root': {
                //     transform: 'translateX(0px)',
                //     fontSize: 13,
                //   },
                //   '& svg': {
                //     mr: 2,
                //   },
                // },
              }}
              onClick={carregar}
            >
              <EditIcon sx={{ color: 'secondary.contrastText', fontSize: 26 }} />
              {/* <Typography sx={{ color: 'secondary.contrastText', fontWeight: 'bold' }}>Carregar Rascunho</Typography> */}
            </IconButton>
            <br></br>
            <br></br>
            <IconButton
              sx={{
                backgroundColor: 'secondary.main',
                border: '3px solid #fff',
                height: BUTTON_SIZE,
                width: BUTTON_SIZE,
                borderRadius: `${BUTTON_SIZE}px`,
                // transition: (theme) => theme.transitions.create(['width']),
                textAlign: 'center',
                // overflow: 'hidden',
                // '& .MuiTypography-root': {
                //   transform: 'translateX(150px)',
                //   transition: (theme) => theme.transitions.create(['transform', 'width']),
                //   fontSize: 0,
                // },
                // '&:hover': {
                //   backgroundColor: 'secondary.main',
                //   width: 180,
                //   '& .MuiTypography-root': {
                //     transform: 'translateX(0px)',
                //     fontSize: 13,
                //   },
                //   '& svg': {
                //     mr: 2,
                //   },
                // },
              }}
              onClick={handleDownloadPdf}
            >
              <DownloadIcon sx={{ color: 'secondary.contrastText', fontSize: 26 }} />
              {/* <Typography sx={{ color: 'secondary.contrastText', fontWeight: 'bold' }}>Download PDF</Typography> */}
            </IconButton>
            <br></br>
            <br></br>
            <IconButton
              sx={{
                backgroundColor: '#a91b38',
                border: '3px solid #fff',
                height: BUTTON_SIZE,
                width: BUTTON_SIZE,
                borderRadius: `${BUTTON_SIZE}px`,
                // transition: (theme) => theme.transitions.create(['width']),
                textAlign: 'center',
                // overflow: 'hidden',
                // '& .MuiTypography-root': {
                //   transform: 'translateX(150px)',
                //   transition: (theme) => theme.transitions.create(['transform', 'width']),
                //   fontSize: 0,
                // },
                // '&:hover': {
                //   backgroundColor: '#a91b38',
                //   width: 180,
                //   '& .MuiTypography-root': {
                //     transform: 'translateX(0px)',
                //     fontSize: 13,
                //   },
                //   '& svg': {
                //     mr: 2,
                //   },
                // },
              }}
              onClick={handleSendPdf}
            >
              <SendIcon sx={{ color: 'secondary.contrastText', fontSize: 26 }} />
              {/* <Typography sx={{ color: 'secondary.contrastText', fontWeight: 'bold' }}>Enviar Registo</Typography> */}
            </IconButton>
            </div>
          )
        ) : (
          <Button color="error" startIcon={<CloseIcon />}>
            Erro 
            <br></br>
            {pdfInstance.error.toString()}
          </Button>
        )}
      </Box>
    </generatorContext.Provider>
  );
};

export default InvoiceDownloadButton;
