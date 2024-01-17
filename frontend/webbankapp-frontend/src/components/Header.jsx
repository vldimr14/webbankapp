import { Link, useNavigate } from 'react-router-dom'; 
import '../index.css';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';

function Header() {

  const cookies = new Cookies();
  const navigate = useNavigate();

  let decodedToken;
  let sessionExpirationTime;

  if (cookies.get('jwt-token')) {
    decodedToken = jwtDecode(cookies.get('jwt-token'));
    const currentDate = new Date();
    sessionExpirationTime = new Date(decodedToken.exp * 1000).getTime() - currentDate.getTime();
  }

  const logout = () => {
    cookies.remove('jwt-token');
    navigate('/', true);
  }

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

        {/* Render only if user is authenticated */
          cookies.get('jwt-token') && (
            <Link to={'/profile'}>
              <div className="link">
                Profile
              </div>
            </Link>
          )
        }

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

      {/*  Render depending on user authentication */
        !cookies.get('jwt-token') ? (
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
        ) : (
          <div className='logout'>
            <button className='btn' onClick={logout}>
              Log out
            </button>
            <p className='small-header'>Session expires: {parseInt(sessionExpirationTime / 60000)} min</p>
          </div>
        )
      }
    </header>
  );
}

export default Header;

