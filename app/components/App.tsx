'use client'


import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import GlobalStateContextProvider from './GlobalStateContextProvider';
import 'dayjs/locale/en-gb';

interface AppProps {
  children: React.ReactNode
}

export default function App({children} : AppProps) {

  return(  
    <GlobalStateContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        {children}
      </LocalizationProvider>
    </GlobalStateContextProvider>  
  )
}
