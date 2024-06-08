import { useMutation } from "@apollo/client";
import toast, { CheckmarkIcon, LoaderIcon } from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { DeleteTask, ToggleTaskStatus } from "../../graphql/mutation";
import {
	GET_EXPIRED_TASKS,
	GET_TODAY_TASKS,
	GET_UPCOMING_TASKS,
} from "../../graphql/query";
import { client } from "../../main";

type Props = {
	task: Task;
};

const Task = ({ task }: Props) => {
	const [deleteTask] = useMutation(DeleteTask, {
		refetchQueries: [
			{ query: GET_EXPIRED_TASKS },
			{ query: GET_TODAY_TASKS },
			{ query: GET_UPCOMING_TASKS },
		],
	});

	const [toggleTaskStatus, { loading }] = useMutation(ToggleTaskStatus, {
		refetchQueries: [
			{ query: GET_EXPIRED_TASKS },
			{ query: GET_TODAY_TASKS },
			{ query: GET_UPCOMING_TASKS },
		],
	});

	const handleToggle = async () => {
		try {
			await toggleTaskStatus({ variables: { id: task.id } });
			await client.resetStore();
		} catch (error) {
			console.log(error);
			toast.error("Error while toggling task");
		}
	};

	const handleDelete = async () => {
		try {
			await deleteTask({ variables: { id: task.id } });
			await client.resetStore();
			toast.success("Task Deleted Successfully");
		} catch (error) {
			console.log(error);
			toast.error("Error while deleting task");
		}
	};
	return (
		<div className="task">
			<div>{task.todo}</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					cursor: "pointer",
					gap: "10px",
				}}
			>
				{loading ? (
					<LoaderIcon id="loader" />
				) : task.status ? (
					<CheckmarkIcon onClick={handleToggle} />
				) : (
					<FaRegCircleCheck onClick={handleToggle} size={"20px"} />
				)}
				<BiTrash size={"20px"} onClick={handleDelete} />
			</div>
		</div>
	);
};

export default Task;
