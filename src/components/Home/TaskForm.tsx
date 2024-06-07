import { useMutation } from "@apollo/client";
import { ErrorMessage, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { CreateTask } from "../../graphql/mutation";
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

	const [createTask, { loading }] = useMutation(CreateTask);

	const validationSchema = yup.object({
		todo: yup.string().required(),
		deadline: yup.date().required(),
	});

	const handleSubmit = async (value: any, { resetForm }) => {
		console.log("value");
		toast
			.promise(createTask({ variables: { createTodoInput: value } }), {
				loading: "Creating Task...",
				success: "Task Created Successfully",
				error: "Error while creating task",
			})
			.then(() => {
				resetForm();
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
