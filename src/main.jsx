import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router/AppRouter'
import { ProfileProvider } from './context/ProfileContext'
import '../src/index.css'

createRoot(document.getElementById('root')).render(
  <ProfileProvider initialProfileData={{ /* Datos iniciales del perfil si los tienes */ }}>
    <AppRouter />
  </ProfileProvider>,
)