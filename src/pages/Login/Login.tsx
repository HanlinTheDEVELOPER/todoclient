import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Input, SubmitInput } from "../../components";
import "./login.css";

interface InitialValues {
	email: string;
	password: string;
}

const Login = () => {
	const initialValues: InitialValues = {
		email: "",
		password: "",
	};

	const validationSchema = yup.object({
		email: yup.string().email().required(),
		password: yup.string().min(8).required(),
	});

	const [isPassword, setIsPassword] = useState(true);

	return (
		<section className="auth-section main-bg">
			<h2 className="auth-header">Log In</h2>
			<Formik
				initialValues={initialValues}
				onSubmit={(e) => {
					console.log(e);
				}}
				validationSchema={validationSchema}
			>
				<Form className="login-form">
					<Input type="text" placeholder="Email" name="email" />
					<div className="error-message">
						<ErrorMessage name="email" className="error-message" />
					</div>
					<div className="password-container">
						<Input
							type={isPassword ? "password" : "text"}
							placeholder="Password"
							name="password"
						/>
						<button type="button" onClick={() => setIsPassword(!isPassword)}>
							{isPassword ? <BsEye /> : <BsEyeSlash />}
						</button>
					</div>
					<div className="error-message">
						<ErrorMessage name="password" className="error-message" />
					</div>
					<SubmitInput value="Log In" />
					<h6 style={{ fontWeight: 400, cursor: "pointer", lineHeight: "2px" }}>
						Forget Password?
					</h6>
					<h6 style={{ fontWeight: 400, cursor: "pointer", lineHeight: "2px" }}>
						Don't have an account yet?
						<Link to="/signup"> Sign Up</Link>
					</h6>
				</Form>
			</Formik>
		</section>
	);
};

export default Login;
