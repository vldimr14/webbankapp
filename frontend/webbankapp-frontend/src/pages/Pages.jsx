import Profile from './Profile';
import Home from './Home';
import Transfer from './Transfer';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import TransactionDetails from './TransactionDetails';
import TermsOfUse from './TermsOfUse';
import Transactions from './Transactions';

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* TODO access only if user is not authenticated */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        {/* TODO access only if user is authenticated */}
        <Route path='/profile' element={<Profile />} />
        {/* TODO access only if user does have a bank account */}
        <Route path='/profile/transfer' element={<Transfer />} />
        <Route path='/profile/history' element={<Home />} />
        <Route path='/profile/transactions/:transactionId' element={<TransactionDetails />}/>
        <Route path='/profile/transactions' element={<Transactions />} />
        <Route path='/terms' element={<TermsOfUse />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;