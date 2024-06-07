import "./input.css";

type Props = {
	disabled?: boolean;
	value: string;
};

const SubmitInput = ({ value, disabled = false }: Props) => {
	return (
		<button type="submit" className="submit-button" disabled={disabled}>
			{value}
		</button>
	);
};

export default SubmitInput;
