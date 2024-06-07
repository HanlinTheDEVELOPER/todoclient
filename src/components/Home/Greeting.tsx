import "./style.css";

const Greeting = () => {
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	return (
		<main className="greeting-section">
			<h3>Hello, {user.name}</h3>
			<i>Capture today's tasks, conquer tomorrow's goals.</i>
		</main>
	);
};

export default Greeting;
