import api from 'axios';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


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

  let transactions;
  
  if (profileData) {
    transactions = JSON.parse(profileData.transactions);
  }

  return (
    <div className="container profile-container">
      <div className="card profile-card">
        <div className="user-name">
          {profileData.firstName} {profileData.lastName}
        </div>

        {/* Render bank account information */
        profileData.bankAccountId ? (
        <div className="bank-account">
          <div className="label">Bank account id</div>
          <div className="account-number">{profileData.bankAccountId}</div>
          <div className="label">Balance</div>
          <div className="balance">
            {profileData.bankAccountBalance} {profileData.bankAccountCurrency}
          </div>
          <div className="transfer">
            <button className='btn btn-submit' onClick={transferHandler}>Transfer</button>
          </div>
        </div>
        ) : (
          <button className='btn btn-submit' onClick={createBankAccount}>Open bank account</button>
        )}
      </div>

      {/* Render short transaction history (15 latest) */
        profileData.bankAccountId && (
         <div className="card transaction-history">
          <table>
            <thead>
              <h2>Latest transactions</h2>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
                {/* <th>To</th> */}
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr>
                    <td>{transaction.date}</td>
                    {profileData.bankAccountId === transaction.recipient.id ||
                     profileData.bankAccountId === transaction.recipient ? (
                      <td className='income'>+{transaction.amount}</td>
                    ) : (
                      <td className='expense'>-{transaction.amount}</td>
                    )}
                    
                    <td>{transaction.description}</td>
                    {/* TODO recipient or sender */}
                    {/* <td>{transaction.recipient.id}</td> */}
                    <td>{transaction.id}</td>
                  </tr>
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