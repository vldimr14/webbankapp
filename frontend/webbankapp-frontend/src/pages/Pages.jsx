import NewBankAccount from './NewBankAccount';
import Profile from './Profile';
import Home from './Home';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

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
        {/* TODO access only if user doesn't have a bank account */}
        <Route path='/profile/create_account' element={<NewBankAccount />} />
        {/* TODO access only if user does have a bank account */}
        <Route path='/profile/transfer' element={<Home />} />
        <Route path='/profile/history' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;