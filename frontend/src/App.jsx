import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { Dashboard } from './pages/Dashboard'
import { SignIn } from './pages/SignIn'
import { TransferMoney } from './pages/SendMoney'
import { HeadingComponent } from './components/Heading'
import { InputBox } from './components/InputBox'
import { AppBar } from './components/AppBar'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/transfermoney" element={<TransferMoney />} />
        <Route path='/app' element = {<AppBar/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
