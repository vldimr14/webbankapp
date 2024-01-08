import Header from '../components/Header'
import Footer from '../components/Footer'
import TransactionsComponent from '../components/TransactionsComponent';
import { useLocation } from 'react-router-dom';

function Transactions() {

  const location = useLocation();
  const profileData = location.state;

  return (
		<div>
			<Header />
			<TransactionsComponent profileData={profileData}/>
			<Footer />
		</div>
  );
}

export default Transactions;