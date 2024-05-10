import React from "react";
import 'dayjs/locale/es';
import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App() {
  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
      </LocalizationProvider>
    </React.Fragment>
  );
}
