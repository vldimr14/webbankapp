import { useState, useEffect } from 'react';
import '../index.css';
import Cookies from 'universal-cookie';
import api from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function TransactionDetailsComponent() {

  const params = useParams();

  const cookies = new Cookies();
  const [transactionData, setTransactionData] = useState('');

  useEffect(() => {
    getTransaction(params.transactionId);
  }, []);

  const getTransaction = async (id) => {
    const response = await api.get(`/api/profile/transactions?id=${id}`, {
      headers: {'Authorization' : `Bearer ${cookies.get('jwt-token')}`}
    }).catch((error) => {
      console.error('Error during getting transaction information.', error.response ? error.response.data : error.message)
    });

    setTransactionData(response.data);
    console.log(response.data);
  }

  return (
    <div>
      <div className='form-container'>
        <h2>Transaction #{params.transactionId}</h2>
        <div className='signup-form'>
          <div className="transaction-details">
            <div className="Date">Date: {transactionData.date}</div>
            <div className="">Amount: {transactionData.amount} {transactionData.currency}</div>
            <div className="">Description: {transactionData.description}</div>
            <div className="">Sender account id: {transactionData && transactionData.sender.id}</div>
            <div className="">Recipient account id: {transactionData && transactionData.recipient.id}</div>
            <div className="">Type: {transactionData.type}</div>
          </div>
        </div>
        <Link to="/profile" className='btn btn-submit'>Back</Link>
      </div>
    </div>
  );
}

export default TransactionDetailsComponent;