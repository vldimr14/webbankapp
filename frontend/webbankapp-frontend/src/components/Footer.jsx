import { Link } from "react-router-dom";

function Footer() {
  return (
		<footer>
			<div className="footer-links">
				<Link to={'/contact'}>
					<div className="footer-link">
						Contact
					</div>
				</Link>
				<Link to={'/about'}>
					<div className="footer-link">
						About us
					</div>
				</Link>
				<div className="legal-links">
					Legal
					<Link to={"/terms"} className="legal-link">
						Privacy Policy
					</Link>
					<Link to={"/terms"} className="legal-link">
						Terms and Conditions
					</Link>
				</div>
			</div>

			<div className="line"></div>
			<div>&copy; Stellar Bank 2023</div>
		</footer>
  );
}

export default Footer;