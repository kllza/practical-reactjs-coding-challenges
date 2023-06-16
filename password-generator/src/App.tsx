import { ToastContainer } from 'react-toastify'
import PasswordGenerator from './components/PasswordGenerator'
import './styles.css'
import './variables.css'

function App() {
  return (
    <>
      <PasswordGenerator />
      <ToastContainer />
    </>
  )
}

export default App
