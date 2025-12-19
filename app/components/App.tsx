'use client'

import RecoilContextProvider from "@/app/components/RecoilContextProvider";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface AppProps {
  children: React.ReactNode
}

export default function App({children} : AppProps) {

  return(  
    <RecoilContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </RecoilContextProvider>  
  )
}
