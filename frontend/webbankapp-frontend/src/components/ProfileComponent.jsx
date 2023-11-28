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

  return (
    <div className="container">
      <div className="profile-card">
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
    </div>
  );
}

export default ProfileComponent;