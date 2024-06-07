import { useMutation } from "@apollo/client";
import { ErrorMessage, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { CreateTask } from "../../graphql/mutation";
import {
	GET_COMPLETED_TASKS,
	GET_TODAY_TASKS,
	GET_UPCOMING_TASKS,
} from "../../graphql/query";
import { client } from "../../main";
import { SubmitInput } from "../Input";
import Input from "../Input/Input";
import "./style.css";

interface InitialValues {
	todo: string;
	deadline: string;
}

const TaskForm = () => {
	const initialValue: InitialValues = {
		todo: "",
		deadline: "",
	};

	const [createTask, { loading }] = useMutation(CreateTask, {
		refetchQueries: [
			{ query: GET_COMPLETED_TASKS },
			{ query: GET_TODAY_TASKS },
			{ query: GET_UPCOMING_TASKS },
		],
	});

	const validationSchema = yup.object({
		todo: yup.string().required(),
		deadline: yup.date().required(),
	});

	const handleSubmit = async (
		value: InitialValues,
		{ resetForm }: { resetForm: () => void }
	) => {
		console.log("value");
		toast
			.promise(createTask({ variables: { createTodoInput: value } }), {
				loading: "Creating Task...",
				success: "Task Created Successfully",
				error: "Error while creating task",
			})
			.then(async () => {
				resetForm();
				await client.resetStore();
			});
	};

	return (
		<>
			<Toaster />
			<Formik
				initialValues={initialValue}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<Form className="task-form">
					<Input type="text" placeholder="Task" name="todo" />
					<div className="error-message">
						<ErrorMessage name="todo" />
					</div>
					<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
						<Input type="date" name="deadline" />

						<SubmitInput value={loading ? "lll" : "add"} disabled={loading} />
					</div>
					<div className="error-message" style={{ marginBottom: "12px" }}>
						<ErrorMessage name="deadline" />
					</div>
				</Form>
			</Formik>
		</>
	);
};
export default TaskForm;
