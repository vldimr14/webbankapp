import api from 'axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function TransactionsComponent(profileData) {
  const cookies = new Cookies();
  const [transactions, setTransactions] = useState('');

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    const response = await api.get('/api/profile/all_transactions', {
      headers: {'Authorization' : `Bearer ${cookies.get('jwt-token')}`}
    }).catch(error => {
      console.error('Error during getting transactions data.', error.response ? error.response.data : error.message);
    });

    setTransactions(response.data);
    console.log(response.data);

    console.log(profileData);
  }

  return (
    <div>
      {transactions && (
        <div className="card transactions-card">
          <h2 className='medium-header'>Transactions</h2>
          <table>
            <thead>
              <tr className='small-header'>
                <th>Description</th>
                <th>Payment method</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <Link to={`/profile/transactions/${transaction.id}`}>
                  <tr key={transaction.id}>
                    <td>
                      <div className="transaction-description">
                        <div className="regular-text">
                          {transaction.description}
                        </div>
                        <div className="small-header">
                          {transaction.date}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className='small-header'>
                        {transaction.type}
                      </div>
                    </td>
                    {profileData.profileData.bankAccountId === transaction.recipient.id ||
                     profileData.profileData.bankAccountId === transaction.recipient ? (
                      <td className='income small-header'>+{transaction.amount} PLN</td>
                    ) : (
                      <td className='expense small-header'>-{transaction.amount} PLN</td>
                    )}
                  </tr>
                  <div className="line"></div>
                  </Link>
                )
              })}
            </tbody>
          </table>
         </div> 
      )}
    </div>
  );
}

export default TransactionsComponent;