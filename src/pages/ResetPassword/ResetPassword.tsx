import { useMutation } from "@apollo/client";
import { ErrorMessage, Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { Input, SubmitInput } from "../../components/Input";
import { RESET_PASSWORD } from "../../graphql/mutation";

interface InitialValues {
    password: string;
    confirmPassword: string;
}

const ResetPassword = () => {
    const { id: token } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const email = searchParams.get("email");
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

    const [resetPassword] = useMutation(RESET_PASSWORD);

    const handleSubmit = (value: InitialValues) => {
        const data = {
            token,
            email,
            password: value.password,
        };
        toast
            .promise(resetPassword({ variables: { resetPasswordInput: data } }), {
                loading: "changing...",
                success: "Success",
                error: "Unauthourized",
            })
            .then(() => {
                navigate("/");
            });
    };

    return (
        <section className="form-parent main-bg">
            {" "}
            <h2 className="auth-header">Change New Password</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(value) => handleSubmit(value)}
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
