import '../index.css';

function LoginForm() {

    return (
      <div className="form-container">
        <h1>Login</h1>
        <div className="signup-form login-form">
          <form method="post">
            <div className="input-group">
              <label htmlFor="username">Email address</label>
              <input type="email" className="" id="username" placeholder="john.smith@gmail.com"/>

              <label htmlFor="password">Password</label>
              <input type="password" className="" id="password" placeholder="password"/>
                
              <button type="submit" className="btn btn-submit">Login</button>
            </div>
            
          </form>
        </div>
      </div>
    );
}

export default LoginForm;