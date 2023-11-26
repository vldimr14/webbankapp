import { useState } from 'react';
import '../index.css';
import api from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupComponent() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [passportId, setPassportId] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const navigate = useNavigate();

    const handleRegistration = async () => {
      // TODO validate form
      if (password !== passwordRepeat) {
        console.error("Passwords don't match");
      }

      const response = await api.post("/api/auth/register", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        passportId: passportId,
        birthDate: birthDate
      }).catch(error => {
        console.error('Registration failed', error.response ? error.response.data : error.message);
      });

      console.log('Message: ', response.data);
      navigate('/profile', true);
    }

    return (
      <div className="form-container">
        <h1>Sign up</h1>
        <div className="signup-form">
            <div className="input-group">
              <label htmlFor="username">Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} id="username" placeholder="john.smith@gmail.com"/>

              <label htmlFor="firstName">First name</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} id="firstName" placeholder="John"/>

              <label htmlFor="lastName">Last name</label>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} id="lastName" placeholder="Smith"/>

              <label htmlFor="passportId">Passport ID</label>
              <input type="text" value={passportId} onChange={e => setPassportId(e.target.value)} id="passportId" placeholder=""/>

              <label htmlFor="birthDate">Birth date</label>
              <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} id="birthDate" placeholder="01-01-1980"/>

              <label htmlFor="password">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" placeholder="password"/>

              <label htmlFor="passwordRepeat">Repeat password</label>
              <input type="password" value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} id="passwordRepeat" placeholder="password"/>
                
              <button onClick={handleRegistration} className="btn btn-submit">Sign up</button>
              
              <p className='link'>
                <a href='#'>Already have an account? Login here</a>
              </p>
            </div>
        </div>
      </div>
    );
}

export default SignupComponent;