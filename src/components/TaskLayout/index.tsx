import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const TaskLayout = () => {
	return (
		<div>
			<Nav />
			<Outlet />
		</div>
	);
};

export default TaskLayout;
