function ContactComponent() {
    return (
        <div className='home-container'>
        <div className="secondary-text">Contact</div>
        <div className="line"></div>

        <div className="about-container">
        <div className="regular-text">
          We're here to answer your questions, address concerns, and offer assistance. Please use the contact information below or the form to get in touch with us.
        </div>
      </div>
      <div className="">
        <div className="regular-text">
          <ul>
            <li>
              <h3>Office Address: pl. Dominikański 11, Wrocław, Poland</h3>
            </li>
            <li>
              <h3>Phone: 565 000 565</h3>
            </li>
            <li>
                <h3><a href="mailto:contact@yourcompany.com">contact@stellarbank.com</a></h3>
            </li>
          </ul>
        </div>
      </div>
      </div>
    );
}

export default ContactComponent;