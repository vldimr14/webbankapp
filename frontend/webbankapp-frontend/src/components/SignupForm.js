import '../index.css';

function SignupForm() {

    return (
      <div className="form-container">
        <h1>Sign up</h1>
        <div className="signup-form">
          <form method="post">
            <div className="input-group">
              <label htmlFor="username">Email address</label>
              <input type="email" className="" id="username" placeholder="john.smith@gmail.com"/>

              <label htmlFor="firstName">First name</label>
              <input type="text" className="" id="firstName" placeholder="John"/>

              <label htmlFor="lastName">Last name</label>
              <input type="text" className="" id="lastName" placeholder="Smith"/>

              <label htmlFor="passportId">Passport ID</label>
              <input type="text" className="" id="passportId" placeholder=""/>

              <label htmlFor="birthDate">Birth date</label>
              <input type="date" className="" id="birthDate" placeholder="01-01-1980"/>

              <label htmlFor="password">Password</label>
              <input type="password" className="" id="password" placeholder="password"/>

              <label htmlFor="passwordRepeat">Repeat password</label>
              <input type="password" className="" id="passwordRepeat" placeholder="password"/>
                
              <button type="submit" className="btn btn-submit">Sign up</button>
            </div>
            
          </form>
        </div>
      </div>
    );
}

export default SignupForm;