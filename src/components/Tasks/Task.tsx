import { LoaderIcon } from "react-hot-toast";
import { ImRadioUnchecked } from "react-icons/im";

type Props = {
	task: Task;
};

const Task = (props: Props) => {
	return (
		<div className="task">
			<div>Task</div>
			<div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
				<ImRadioUnchecked size={20} />
				<LoaderIcon id="loader" />
			</div>
		</div>
	);
};

export default Task;
