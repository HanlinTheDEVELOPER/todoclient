import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import * as yup from "yup";
import { Input, SubmitInput } from "../../components/Input";

interface InitialValues {
	password: string;
	confirmPassword: string;
}

const ResetPassword = () => {
	const [isPassword, setIsPassword] = useState(true);
	const initialValues: InitialValues = {
		password: "",
		confirmPassword: "",
	};

	const validationSchema = yup.object({
		password: yup.string().min(8).required(),
		confirmPassword: yup
			.string()
			.required()
			.oneOf([yup.ref("password")], "Passwords must match"),
	});

	return (
		<section className="form-parent main-bg">
			{" "}
			<h2 className="auth-header">Change New Password</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(value) => {
					console.log(value);
				}}
			>
				<Form>
					<div className="password-container">
						<Input
							type={isPassword ? "password" : "text"}
							placeholder="New Password"
							name="password"
						/>
						<button type="button" onClick={() => setIsPassword(!isPassword)}>
							{isPassword ? <BsEye /> : <BsEyeSlash />}
						</button>
					</div>{" "}
					<div className="error-message">
						<ErrorMessage name="password" />
					</div>
					<div className="password-container">
						<Input
							type={isPassword ? "password" : "text"}
							placeholder="Confirm Password"
							name="confirmPassword"
						/>
						<button type="button" onClick={() => setIsPassword(!isPassword)}>
							{isPassword ? <BsEye /> : <BsEyeSlash />}
						</button>
					</div>
					<div className="error-message">
						<ErrorMessage name="confirmPassword" />
					</div>
					<SubmitInput disabled={false} value="Save" />
				</Form>
			</Formik>
		</section>
	);
};

export default ResetPassword;
