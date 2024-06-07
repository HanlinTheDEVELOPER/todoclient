import { useMutation } from "@apollo/client";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Input, SubmitInput } from "../../components/Input";
import { Signup } from "../../graphql/mutation";
import { authLink, client, httpLink } from "../../main";
interface InitialProps {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
}

const SignUp = () => {
	const [isPassword, setIsPassword] = useState(true);
	const navigate = useNavigate();
	const initialValue: InitialProps = {
		email: "",
		name: "",
		password: "",
		confirmPassword: "",
	};
	const validationSchema = yup.object({
		email: yup.string().email().required(),
		name: yup.string().required().min(3),
		password: yup.string().min(8).required(),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password")], "Passwords must match"),
	});

	const [signup, { loading }] = useMutation(Signup);

	const handleSubmit = async (value: InitialProps) => {
		// toast.loading("Logging In");
		toast
			.promise(
				signup({
					variables: {
						createUserInput: {
							name: value.name,
							email: value.email,
							password: value.password,
						},
					},
				}),
				{
					loading: "Signing Up",
					success: "Sign Up Complete",
					error: "Can't sign up",
				}
			)
			.then((data) => {
				const token = data.data?.signUp?.token;
				const userId = data.data?.signUp?.userId;
				const name = data.data?.signUp?.name;
				const email = data.data?.signUp?.email;

				localStorage.setItem("userId", userId);
				localStorage.setItem("user", JSON.stringify({ name, email }));
				localStorage.setItem("token", token);
				client.setLink(authLink.concat(httpLink));
				return navigate("/");
			});
	};

	return (
		<section className="auth-section main-bg">
			<h2 className="auth-header">Sign Up</h2>
			<Formik
				initialValues={initialValue}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<Form className="auth-form">
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
					<SubmitInput disabled={loading} value="Sign Up" />
					<h6 style={{ fontWeight: 400, cursor: "pointer", lineHeight: "2px" }}>
						Already have an account ?<Link to="/login">Log In</Link>
					</h6>
				</Form>
			</Formik>
			<Toaster />
		</section>
	);
};

export default SignUp;
