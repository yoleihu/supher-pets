import ReactDOM from 'react-dom/client'
import { PrincipalRoutes } from './routes/PrincipalRoutes'
import { ToastContainer } from 'react-toastify';
import supherClient from './service/SupherClient'
import './styles/global.css'
import "react-toastify/dist/ReactToastify.min.css";

const root = ReactDOM.createRoot(document.getElementById('root')!)

supherClient.defineInterceptors()

root.render(
  <>
    <PrincipalRoutes />
    <ToastContainer />
  </>
)