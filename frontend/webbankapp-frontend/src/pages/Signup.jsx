import Header from '../components/Header'
import Footer from '../components/Footer'
import SignupComponent from '../components/SignupComponent';

function Signup() {
    return(
        <div className="container">
            <Header />
            <SignupComponent />
            <Footer />
        </div>
    );
}

export default Signup;