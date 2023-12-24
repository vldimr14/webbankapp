import api from 'axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function  ProfileComponent() {
  const cookies = new Cookies();
  const [profileData, setProfileData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProfileInfo();
  }, []);

  const getProfileInfo = async () => {
    const response = await api.get('/api/profile', {
      headers: {'Authorization' : `Bearer ${cookies.get('jwt-token')}`}
    }).catch((error) => {
      console.error('Error during getting profile information.', error.response ? error.response.data : error.message)
    });

    setProfileData(response.data);
    console.log(response.data);
  }

  const createBankAccount = async () => {
    const response = await api.get('/api/profile/create_account', {
      headers: {'Authorization' : `Bearer ${cookies.get('jwt-token')}`}
    }).catch((error) => {
      console.error('Error during creating bank account.', error.response ? error.response.data : error.message)
    });
  }
  
  const transferHandler = () => {
    navigate('/profile/transfer')
  }

  const detailsHandler = (id) => {
    navigate(`/profile/transactions/${id}`);
  }

  let transactions;
  
  if (profileData) {
    transactions = JSON.parse(profileData.transactions);
  }

  return (
    <div className="child-container">
      <div className="greeting-container">
        <h1 className='large-header'>
          Welcome, {profileData.firstName} {profileData.lastName}
        </h1>
        <div className="transfer">
          <button className='btn' onClick={transferHandler}>Transfer</button>
        </div>
      </div>
      <div className="card">
        <h2 className='medium-header'>Accounts</h2>

        {/* Render bank account information */
        profileData.bankAccountId ? (
        <div className="card account-card">
          <div className="flex-group">
            <div className="small-header">Bank account id</div>
            <div className="account-number">{profileData.bankAccountId}</div>
          </div>
          
          <div className="flex-group">
            <div className="small-header">Available Balance</div>
            <div className="balance">
              {profileData.bankAccountBalance} {profileData.bankAccountCurrency}
            </div>
          </div>
        </div>
        ) : (
          <button className='btn btn-submit' onClick={createBankAccount}>Open bank account</button>
        )}
      </div>

      {/* Render short transaction history (TODO 15 latest) */
        profileData.bankAccountId && (
         <div className="card">
          <h2 className='medium-header'>Latest transactions</h2>
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
                  <Link to={`transactions/${transaction.id}`}>
                  <tr key={transaction.id}>
                    <td>
                      <div className="transaction-description">
                        <div className="medium-header">
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
                    {profileData.bankAccountId === transaction.recipient.id ||
                     profileData.bankAccountId === transaction.recipient ? (
                      <td className='income small-header'>+{transaction.amount} PLN</td>
                    ) : (
                      <td className='expense small-header'>-{transaction.amount} PLN</td>
                    )}
                  </tr>
                  {/* <div className="line"></div> */}
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

export default ProfileComponent;