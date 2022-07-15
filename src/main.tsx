import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FormInput } from './components/FormInput'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recoverPassword' element={<FormInput />} />
      </Routes>
    </BrowserRouter>
)
