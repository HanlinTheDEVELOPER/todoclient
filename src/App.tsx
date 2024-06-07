import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Tasks, { SuspenseWrapper } from "./components/Tasks/Tasks";
import {
	GET_COMPLETED_TASKS,
	GET_TODAY_TASKS,
	GET_UPCOMING_TASKS,
} from "./graphql/query";
import { Error, Home, Login, SignUp } from "./pages";
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
							path: "/done",
							element: (
								<SuspenseWrapper>
									<Tasks
										queryKey={GET_COMPLETED_TASKS}
										dataFieldName="getCompletedTasks"
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
	]);

	return <RouterProvider router={router} />;
}

export default App;
