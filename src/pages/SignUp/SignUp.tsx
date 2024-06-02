import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Input, SubmitInput } from "../../components";
interface InitialProps {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
}

const SignUp = () => {
	const [isPassword, setIsPassword] = useState(true);

	const initialValue: InitialProps = {
		email: "",
		name: "",
		password: "",
		confirmPassword: "",
	};
	const validationSchema = yup.object({
		email: yup.string().email().required(),
		name: yup.string().required(),
		password: yup.string().min(8).required(),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password")], "Passwords must match"),
	});
	return (
		<section className="auth-section main-bg">
			<h2 className="auth-header">Sign Up</h2>
			<Formik
				initialValues={initialValue}
				onSubmit={() => {}}
				validationSchema={validationSchema}
			>
				<Form>
					<Input type="text" placeholder="Name" name="name" />
					<div className="error-message">
						<ErrorMessage name="name" className="error-message" />
					</div>
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
						<ErrorMessage name="confirmPassword" className="error-message" />
					</div>
					<SubmitInput value="Log In" />

					<h6 style={{ fontWeight: 400, cursor: "pointer", lineHeight: "2px" }}>
						Already have an account ?<Link to="/login">Log In</Link>
					</h6>
				</Form>
			</Formik>
		</section>
	);
};

export default SignUp;
