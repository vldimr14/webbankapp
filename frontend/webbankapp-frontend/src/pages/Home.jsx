import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className='container'>
      <Header />
      <div className='home-container'>
        <div className="secondary-text">Welcome to</div>
        <div className="main-text">Stellar Bank.</div>
        <div className="line"></div>
      </div>
      <div className="about-container">
        <div className="secondary-text">Why join us?</div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;