import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import api from 'axios';

function TransferComponent() {
  
  const [recipientAccountId, setRecipientAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const cookies = new Cookies();

  const navigate = useNavigate();

  const validateForm = () => {
      if (recipientAccountId === "" || amount === "" || description === "") {
        setErrorMessage("Fields cannot be empty.");
        return false;
      }

      if (!recipientAccountId.match(/^\d{26}/)) {
        setErrorMessage("Invalid recipient account id.");
        return false;
      }

      if (!amount.match(/^\d+$/)) {
        setErrorMessage("Invalid amount.");
        return false;
      }

      return true;
    }

  const transferHandler = async () => {
    
    const validated = validateForm();
    
    if (!validated) {
      return;
    }

    const data = {
      description: description,
      amount: +amount,
      recipientAccountId: recipientAccountId,
    };

    const headers = {'Authorization' : `Bearer ${cookies.get('jwt-token')}`};
    const response = await api.post('/api/profile/transfer', data, {headers})
    .catch((error) => {
      console.error('Error during transfer.', error.response ? error.response.data : error.message)
    });

    if (response.data !== "Transaction successful.") {
      setErrorMessage(response.data);
      console.log(response.data);
      return;
    }

    navigate('/profile', true);
  }

  return (
    <div className="form-container">
        <h1>Transfer</h1>
        <div className="signup-form login-form">
            <div className="input-group">
              {errorMessage && (
                <p className='error-message'>{errorMessage}</p>
              )}

              <label htmlFor="recipientAccountId">Recipient account id: </label>
              <input type="text" value={recipientAccountId} onChange={e => setRecipientAccountId(e.target.value)} id="recipientAccountId" placeholder="18361311011808245122106297"/>

              <label htmlFor="amount">Amount</label>
              <input type="text" value={amount} onChange={e => setAmount(e.target.value)} id="amount" placeholder="100"/>

              <label htmlFor="description">Description</label>
              <input type="text" value={description} onChange={e => setDescription(e.target.value)} id="description" placeholder="Gift for Kate"/>
                
              <button onClick={transferHandler} className="btn">Transfer</button>
              <Link to="/profile">
                <button className="btn">Back</button>
              </Link>
            </div>
        </div>
    </div>
  );
}

export default TransferComponent;