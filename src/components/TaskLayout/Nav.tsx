import { NavLink } from "react-router-dom";
import "./style.css";

const Nav = () => {
	return (
		<nav>
			<NavLink to="/upcoming">Upcoming</NavLink>
			<NavLink to="/">Today</NavLink>
			<NavLink to="/done">Done</NavLink>
		</nav>
	);
};

export default Nav;
