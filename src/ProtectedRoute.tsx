import { Outlet, useNavigate } from "react-router-dom";
import { Login } from "./pages";

const ProtectedRoute = () => {
	const navigate = useNavigate();
	const userId = localStorage.getItem("token");
	// const userId = true;

	if (!userId) {
		navigate("/login");
		return <Login />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
