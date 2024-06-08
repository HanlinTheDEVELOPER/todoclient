import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { LOGOUT_MUTATION } from "../../graphql/mutation";
import "./style.css";

const Greeting = () => {
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	const navigate = useNavigate();
	const [logout] = useMutation(LOGOUT_MUTATION);

	const handleLogout = async () => {
		toast
			.promise(logout(), {
				loading: "Logging out...",
				success: "Logged out successfully",
				error: "Failed to log out",
			})
			.then(() => {
				localStorage.removeItem("user");
				localStorage.removeItem("token");
				localStorage.removeItem("userId");
				return navigate("/");
			});
	};

	return (
		<main className="greeting-section">
			<div>
				<h3>Hello, {user.name}</h3>
				<i>Capture today's tasks, conquer tomorrow's goals.</i>
			</div>
			<button onClick={handleLogout}>
				<BiPowerOff size={24} />
			</button>
		</main>
	);
};

export default Greeting;
