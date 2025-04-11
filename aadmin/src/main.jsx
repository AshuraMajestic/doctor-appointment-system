import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AdminContextProvider, { AdminContext } from './contact/AdminContext.jsx'
import DoctorContextProvider from './contact/DoctorContext.jsx'
import AppContextProvider from './contact/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <AdminContextProvider>
    <DoctorContextProvider>
      <AppContextProvider>
      <App /> 
      </AppContextProvider>
    </DoctorContextProvider>
  </AdminContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
