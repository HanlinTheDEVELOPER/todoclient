import { useMutation } from "@apollo/client";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Input, SubmitInput } from "../../components";
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

	const [login, { loading, error, data }] = useMutation(LogIn);

	const handleSubmit = async (value: InitialValues) => {
		// toast.loading("Logging In");
		await toast.promise(login({ variables: value }), {
			loading: "Loading",
			success: "Got the data",
			error: "Error when fetching",
		});

		if (data.login) {
			const token = data.login.token;
			console.log(token);
			localStorage.setItem("token", token);
			client.setLink(authLink.concat(httpLink));
		}
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
						<SubmitInput value={loading ? "Logging..." : "Log In"} />
						<h6
							style={{ fontWeight: 400, cursor: "pointer", lineHeight: "2px" }}
						>
							Forget Password?
						</h6>
						<h6
							style={{ fontWeight: 400, cursor: "pointer", lineHeight: "2px" }}
						>
							Don't have an account yet?
							<Link to="/signup"> Sign Up</Link>
						</h6>
					</Form>
				</Formik>
			</section>
			{/* <Toaster /> */}
		</>
	);
};

export default Login;
