import Profile from './Profile';
import Home from './Home';
import Transfer from './Transfer';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import TransactionDetails from './TransactionDetails';
import TermsOfUse from './TermsOfUse';
import Transactions from './Transactions';
import Contact from './Contact';
import About from './About';

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/transfer' element={<Transfer />} />
        <Route path='/profile/history' element={<Home />} />
        <Route path='/profile/transactions/:transactionId' element={<TransactionDetails />}/>
        <Route path='/profile/transactions' element={<Transactions />} />
        <Route path='/terms' element={<TermsOfUse />}/>
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />

      </Routes> 
    </BrowserRouter>
  );
}

export default Pages;