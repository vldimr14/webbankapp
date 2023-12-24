import { useState } from 'react';
import '../index.css';
import api from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

function LoginComponent() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const cookies = new Cookies();

    const handleLogin = async () => {
      // TODO validate form
      const response = await api.post("/api/auth/authenticate", {
        email: email,
        password: password,
      }).catch(error => {
        console.error('Login failed', error.response ? error.response.data : error.message);
      });

      console.log('Message: ', response.data);

      const decodedJwt = jwtDecode(response.data.token);

      cookies.set('jwt-token', response.data.token, {
        expires: new Date(decodedJwt.exp * 1000),
      });

      console.log(cookies.get('jwt-token'));
      
      navigate('/profile', true);
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
                
              <button onClick={handleLogin} className="btn btn-submit">Log in</button>

              <p className='link'>
                <Link to="/signup">
                  <a href='#'>Don't have an account? Sign up here</a>
                </Link>
              </p>
            </div>
        </div>
      </div>
    );
}

export default LoginComponent;