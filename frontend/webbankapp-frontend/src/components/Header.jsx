import { Link, useNavigate } from 'react-router-dom'; 
import '../index.css';
import Cookies from 'universal-cookie';

function Header() {

  const cookies = new Cookies();
  const navigate = useNavigate();

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
          <button className='btn btn-submit' onClick={logout}>
            Log out
          </button>
        )
      }
    </header>
  );
}

export default Header;

