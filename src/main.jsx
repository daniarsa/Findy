import { createRoot } from 'react-dom/client'
import AppRouter from './router/AppRouter'
import AppContextProvider from './context/AppContext'
import '../src/index.css'

createRoot(document.getElementById('root')).render(
  <AppContextProvider initialProfileData={{ /* datos iniciales del perfil */ }}>
    <AppRouter />
  </AppContextProvider>,
)