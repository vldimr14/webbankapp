import { useState } from 'react';
import '../index.css';
import api from 'axios';

function LoginComponent() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      try {
        const response = await api.post("/api/auth/login", {
          email: email,
          password: password,
        });

        console.log('Message: ', response.data);
      } catch (error) {
        console.error('Login failed', error.response ? error.response.data : error.message);
      }
    }

    return (
      <div className="form-container">
        <h1>Login</h1>
        <div className="signup-form login-form">
            <div className="input-group">
              <label htmlFor="username">Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} id="username" placeholder="john.smith@gmail.com"/>

              <label htmlFor="password">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" placeholder="password"/>
                
              <button onClick={handleLogin} className="btn btn-submit">Sign up</button>

              <p className='link'>
                <a href='#'>Don't have an account? Sign up here</a>
              </p>
            </div>
        </div>
      </div>
    );
}

export default LoginComponent;