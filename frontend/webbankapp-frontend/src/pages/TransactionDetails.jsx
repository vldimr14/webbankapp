import Header from '../components/Header'
import Footer from '../components/Footer'
import TransactionDetailsComponent from '../components/TransactionDetailsComponent';
import { useParams } from 'react-router-dom';

function TransactionDetails() {

  const params = useParams();

  return (
		<div>
			<Header />
			<TransactionDetailsComponent />
			<Footer />
		</div>
  );
}

export default TransactionDetails;