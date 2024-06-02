import "./input.css";

type Props = {
	value: string;
};

const SubmitInput = ({ value }: Props) => {
	return (
		<button type="submit" className="submit-button">
			{value}
		</button>
	);
};

export default SubmitInput;
