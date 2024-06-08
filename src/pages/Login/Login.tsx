import { useMutation } from "@apollo/client";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Input, SubmitInput } from "../../components/Input";
import { LogIn } from "../../graphql/mutation";
import { authLink, client, httpLink } from "../../main";
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
	const navigate = useNavigate();
	const [login, { loading }] = useMutation(LogIn);

	const handleSubmit = async (value: InitialValues) => {
		// toast.loading("Logging In");
		toast
			.promise(login({ variables: value }), {
				loading: "Logging In...",
				success: "Successfully Logged In",
				error: "Error while logging in",
			})
			.then((data) => {
				const token = data.data?.login?.token;
				const userId = data.data?.login?.userId;
				const name = data.data?.login?.name;
				const email = data.data?.login?.email;

				localStorage.setItem("userId", userId);
				localStorage.setItem("user", JSON.stringify({ name, email }));
				localStorage.setItem("token", token);
				client.setLink(authLink.concat(httpLink));
				return navigate("/");
			});
	};

	return (
		<>
			<section className="auth-section main-bg">
				<h2 className="auth-header">Log In</h2>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					<Form className="auth-form">
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
						<SubmitInput disabled={loading} value="Log In" />
						<Link to="/forget-password">
							<h6
								style={{
									fontWeight: 400,
									cursor: "pointer",
									lineHeight: "2px",
								}}
							>
								Forget Password?
							</h6>
						</Link>
						<h6
							style={{ fontWeight: 400, cursor: "pointer", lineHeight: "2px" }}
						>
							Don't have an account yet?
							<Link to="/signup"> Sign Up</Link>
						</h6>
					</Form>
				</Formik>
			</section>
			<Toaster />
		</>
	);
};

export default Login;
