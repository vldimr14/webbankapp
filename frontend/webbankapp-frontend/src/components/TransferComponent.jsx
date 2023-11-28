import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import api from 'axios';

function TransferComponent() {
  
  const [recipientAccountId, setRecipientAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const cookies = new Cookies();

  const navigate = useNavigate();

  const transferHandler = async () => {
    // TODO validate form
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

    console.log(response.data);

    navigate('/profile', true);
  }

  return (
    <div className="form-container">
        <h1>Transfer</h1>
        <div className="signup-form login-form">
            <div className="input-group">
              <label htmlFor="recipientAccountId">Recipient account id: </label>
              <input type="text" value={recipientAccountId} onChange={e => setRecipientAccountId(e.target.value)} id="recipientAccountId" placeholder="18361311011808245122106297"/>

              <label htmlFor="amount">Amount</label>
              <input type="text" value={amount} onChange={e => setAmount(e.target.value)} id="amount" placeholder="100"/>

              <label htmlFor="description">Description</label>
              <input type="text" value={description} onChange={e => setDescription(e.target.value)} id="description" placeholder="Gift for Kate"/>
                
              <button onClick={transferHandler} className="btn btn-submit">Transfer</button>
            </div>
        </div>
    </div>
  );
}

export default TransferComponent;