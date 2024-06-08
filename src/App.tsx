import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Tasks, { SuspenseWrapper } from "./components/Tasks/Tasks";
import {
	GET_EXPIRED_TASKS,
	GET_TODAY_TASKS,
	GET_UPCOMING_TASKS,
} from "./graphql/query";
import {
	Error,
	ForgetPassword,
	Home,
	Login,
	ResetPassword,
	SignUp,
} from "./pages";
import ProtectedRoute from "./ProtectedRoute";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <ProtectedRoute />,
			errorElement: <Error />,
			children: [
				{
					path: "/",
					element: <Home />,
					errorElement: <Error />,
					children: [
						{
							index: true,
							errorElement: <Error />,
							element: (
								<SuspenseWrapper>
									<Tasks
										queryKey={GET_TODAY_TASKS}
										dataFieldName="getTodayTasks"
									/>
								</SuspenseWrapper>
							),
						},
						{
							path: "/upcoming",
							errorElement: <Error />,
							element: (
								<SuspenseWrapper>
									<Tasks
										queryKey={GET_UPCOMING_TASKS}
										dataFieldName="getUpcomingTasks"
									/>
								</SuspenseWrapper>
							),
						},
						{
							path: "/expired",
							errorElement: <Error />,
							element: (
								<SuspenseWrapper>
									<Tasks
										queryKey={GET_EXPIRED_TASKS}
										dataFieldName="getExpiredTasks"
									/>
								</SuspenseWrapper>
							),
						},
					],
				},
			],
		},
		{ path: "/login", element: <Login /> },
		{ path: "/signup", element: <SignUp /> },
		{ path: "/forget-password", element: <ForgetPassword /> },
		{ path: "/reset-password/:id", element: <ResetPassword /> },
	]);

	return <RouterProvider router={router} />;
}

export default App;
