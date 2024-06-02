import { gql, useQuery } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Home, Login, SignUp } from "./pages";
import ProtectedRoute from "./ProtectedRoute";

const GET_ME = gql`
	query me($email: String!) {
		me(email: $email) {
			id
			name
			email
		}
	}
`;
function App() {
	const { loading, error, data } = useQuery(GET_ME, {
		variables: { email: "hanlin1646@gmail.com" },
	});

	const router = createBrowserRouter([
		{
			path: "/",
			element: <ProtectedRoute />,
			children: [
				{
					index: true,
					element: <Home />,
				},
			],
		},
		{ path: "/login", element: <Login /> },
		{ path: "/signup", element: <SignUp /> },
	]);

	return <RouterProvider router={router} />;
}

export default App;
