import Header from '../components/Header'
import Footer from '../components/Footer'
import LoginComponent from '../components/LoginComponent';

function Login() {
    return(
        <div className="container">
            <Header />
            <LoginComponent />
            <Footer />
        </div>
    );
}

export default Login;