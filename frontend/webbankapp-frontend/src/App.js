import './index.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);

    fetch('api/account')
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h2>Welcome, {user.firstName} {user.lastName}</h2>
      </header>
    </div>
  );
}

export default App;
