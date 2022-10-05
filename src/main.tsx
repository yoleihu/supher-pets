import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BloodCenter } from './pages/BloodCenter'
import { Guardian } from './pages/Guardian'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { RecoverPassword } from './pages/RecoverPassword'
import { Register } from './pages/Register'
import { GuardianInformationStore, StoreProvider } from './store/GuardianInformationStore'
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <BrowserRouter>
    <StoreProvider value={new GuardianInformationStore}>
      <Routes>
        <Route path='/guardian' element={<Guardian />} />
      </Routes>
    </StoreProvider>
    <Routes>
    <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recoverPassword' element={<RecoverPassword />} />
        <Route path='/blood-center' element={<BloodCenter />} />
    </Routes>
  </BrowserRouter>
)
