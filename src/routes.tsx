// Screens.
import { HomeScreen, InvoiceGeneratorScreen } from './screens';

// Interfaces.
import type { RouteObject } from 'react-router-dom';

// Routes object.
const routes = (): Array<RouteObject> => [
  {
    path: '/MiguelBrunoSilva/Relat_Assist/',
    element: <HomeScreen />,
  },
  {
    path: '/MiguelBrunoSilva/Relat_Assist/generator',
    element: <InvoiceGeneratorScreen />,
  },
];

export default routes;
