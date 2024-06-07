import { Greeting, TaskForm } from "../../components/Home";
import TaskLayout from "../../components/TaskLayout";
import "./home.css";

const Home = () => {
	return (
		<section className="home-section main-bg">
			<Greeting />
			<hr />
			<TaskForm />
			<hr />
			<TaskLayout />
		</section>
	);
};

export default Home;
