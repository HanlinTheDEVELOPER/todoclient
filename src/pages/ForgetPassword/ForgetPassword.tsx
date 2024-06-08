import { useMutation } from "@apollo/client";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { Input, SubmitInput } from "../../components/Input";
import { FORGET_PASSWORD } from "../../graphql/mutation";

interface InitialValues {
	email: string;
}

const ForgetPassword = () => {
	const initialValues: InitialValues = {
		email: "",
	};

	const validationSchema = yup.object({
		email: yup.string().email().required(),
	});

	const [forgetPassword, { loading }] = useMutation(FORGET_PASSWORD);
	const [requestSent, setRequestSent] = useState(false);

	const handleSubmit = async (value: InitialValues) => {
		toast
			.promise(forgetPassword({ variables: value }), {
				loading: "Sending Request...",
				success: "Successfully Sent Request",
				error: "Email Not Found",
			})
			.then(() => {
				setRequestSent(true);
			});
	};

	return (
		<section className="form-parent main-bg">
			<Toaster />
			{requestSent ? (
				<>
					<h3 style={{ marginBottom: 12 }}>Email Has Been Sent!</h3>
					<h3>Please Check Your Mail Box!!!</h3>
				</>
			) : (
				<>
					<h2 className="auth-header">Reset Password</h2>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						<Form>
							<Input name="email" type="email" placeholder="Email to reset" />
							<div className="error-message">
								<ErrorMessage name="email" />
							</div>
							<SubmitInput disabled={loading} value="Request" />
						</Form>
					</Formik>
				</>
			)}
		</section>
	);
};

export default ForgetPassword;
