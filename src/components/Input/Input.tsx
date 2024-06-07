import { Field } from "formik";
import "./input.css";

type Props = {
	placeholder?: string;
	name: string;
	type: string;
	onfocus?: string;
	onblur?: string;
};

const Input = ({ name, placeholder, type = "text" }: Props) => {
	return (
		<Field
			className="input"
			type={type}
			placeholder={placeholder}
			name={name}
		/>
	);
};

export default Input;
