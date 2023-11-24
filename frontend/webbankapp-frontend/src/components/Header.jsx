import { Link } from 'react-router-dom'; 
import '../index.css';

function Header() {
  return (
    <header>
      <a href="#" className="logo">
        stellar bank
      </a>
      <div className="links">
        <Link to={'/'}>
          <div className="link">
            Home
          </div>
        </Link>
        {/* TODO Render only if user is authenticated */}
        <Link to={'/profile'}>
          <div className="link">
            Profile
          </div>
        </Link>
        <Link to={'/contact'}>
          <div className="link">
            Contact
          </div>
        </Link>
        <Link to={'/about'}>
          <div className="link">
            About Us
          </div>
        </Link>        
      </div>

      {/* TODO Render these only if user is not authenticated. */}
        <div className="authentication-links">
          <Link to='/login'>
            <div className="link">
                Login
            </div>
          </Link>
          <Link to={'/signup'}>
            <div className="link">
              Sign up
            </div>
          </Link>
        </div>
    </header>
  );
}

export default Header;

