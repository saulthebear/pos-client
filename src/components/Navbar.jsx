import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
	return (
		<nav>
			{/* user always sees this section */}
			<Link to="/">
				<p>User App</p>
			</Link>

			{/* if the user is logged in... */}
			<Link to="/">
				<span onClick={handleLogout}>logout</span>
			</Link>

			<Link to="/profile">
				profile
			</Link>

			{/* if the user is not logged in... */}
			<Link to="/register">
				register
			</Link>

			<Link to="/login">
				login
			</Link>
		</nav>
	)
}