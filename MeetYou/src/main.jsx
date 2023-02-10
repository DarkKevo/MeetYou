import React from 'react';
import ReactDOM from 'react-dom/client';
import RoutesF from './router/router';
import { DataContextProvider } from './context/DataContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataContextProvider>
      <RoutesF />
    </DataContextProvider>
  </React.StrictMode>
);
