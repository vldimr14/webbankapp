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

        <div className="about-container">
        <div className="secondary-text">
          Enjoy the convenience of managing your finances online with Stellar Bank
        </div>
      </div>
      <div className="">
        <div className="regular-text">
          <h2>Why Stellar Bank?</h2>
          <ul>
            <li>
              <h3>Uncompromising Security: Your data is safe with us. We employ the latest technologies to provide you peace of mind.</h3>
            </li>
            <li>
              <h3>Convenient Account Management: Check your balance, review transaction history, and make transfers with ease and speed.</h3>
            </li>
            <li>
              <h3>Modern Design: Our intuitive and responsive application offers a unique online banking experience.</h3></li>
            <li>
              <h3>Customer Support: Our team of experts is ready to assist with any questions. We are here for you!</h3>
              </li>
          </ul>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;