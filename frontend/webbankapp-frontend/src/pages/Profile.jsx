import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect } from 'react';
import ProfileComponent from '../components/ProfileComponent';

function Profile() {

  return (
		<div>
			<Header />
			<ProfileComponent />
			<Footer />
		</div>
  );
}

export default Profile;