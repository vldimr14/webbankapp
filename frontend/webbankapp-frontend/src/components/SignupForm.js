import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import '../index.css';

function SignupForm() {

    return (
        <div className="container-fluid d-flex justify-content-center">
            <div className="signup-form">
            <form method="post" className='form'>
            <h3>Sign up</h3>

            <div className="form-floating">
                <input type="email" className="form-control" id="username" placeholder="john@gmail.com"/>
                <label htmlFor="username">Email Address</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" id="firstName" placeholder="John"/>
                <label htmlFor="firstName">First name</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" id="lastName" placeholder="Smith"/>
                <label htmlFor="lastName">Last name</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" id="passportId" placeholder=""/>
                <label htmlFor="passportId">Passport ID</label>
            </div>
            <div className="form-floating">
                <input type="date" className="form-control" id="birthDate" placeholder="01-01-1980"/>
                <label htmlFor="birthDate">Birth date</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="password" placeholder="password"/>
                <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="passwordRepeat" placeholder="password"/>
                <label htmlFor="passwordRepeat">Repeat password</label>
            </div>
            <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
            </div>
        </div>
    )
}

export default SignupForm;