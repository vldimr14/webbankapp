import Header from '../components/Header'
import Footer from '../components/Footer'
import ContactComponent from '../components/ContactComponent';

function Contact() {
  return (
    <div className='container'>
			<Header />
			<ContactComponent />
			<Footer />
		</div>
  );
}

export default Contact;