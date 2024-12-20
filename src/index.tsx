import { StrictMode } from 'react';

// React DOM.
import ReactDOM from 'react-dom';

// Components.
import App from './app';

// import BrowserRouter from 'react-router-dom/BrowserRouter'

// fonts
// import './assets/fonts/Be_Vietnam_Pro/BeVietnamPro-Regular.ttf';
// import './assets/fonts/Be_Vietnam_Pro/BeVietnamPro-Italic.ttf';
// import './assets/fonts/Be_Vietnam_Pro/BeVietnamPro-Medium.ttf';
// import './assets/fonts/Be_Vietnam_Pro/BeVietnamPro-MediumItalic.ttf';
// import './assets/fonts/Be_Vietnam_Pro/BeVietnamPro-SemiBold.ttf';
// import './assets/fonts/Be_Vietnam_Pro/BeVietnamPro-SemiBoldItalic.ttf';

// Global styles.
import './styles/styles.scss';

// React redux provider.
import { ReduxProvider } from './providers';

ReactDOM.render(
  <StrictMode>
    <ReduxProvider>
      {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
        <App />
   {/* </BrowserRouter> */}
    </ReduxProvider>
  </StrictMode>,
  document.getElementById('root'),
);
