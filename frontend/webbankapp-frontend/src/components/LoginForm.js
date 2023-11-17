import { type } from '@testing-library/user-event/dist/type';
import '../index.css';
import { useState } from 'react';

function LoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function sendLoginRequest() {
        const requestBody = {
            username: {username},
            password: {password},
        };

        fetch("http://localhost:8080/api/auth/login", {
            headers: {
                "Content-type": "application/json",
            },
            method: "post",
            body: JSON.stringify(requestBody),
        })
        .then((response) => Promise.all([response.json(), response.headers]));
    }

    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className="signup-form">
                <form className='form' onSubmit={e => e.preventDefault()}>

                    <h3>Please login</h3>

                    <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="username"
                          placeholder="john@gmail.com" 
                          value={username} 
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="username">Email Address</label>
                    </div>
                    <div className="form-floating">
                        <input 
                          type="password" 
                          className="form-control" 
                          id="password" 
                          placeholder="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={sendLoginRequest}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;