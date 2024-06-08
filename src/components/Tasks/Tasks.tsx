//@ts-nocheck
import { useSuspenseQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import {
	ReactNode,
	RefObject,
	startTransition,
	Suspense,
	useEffect,
	useRef,
	useState,
} from "react";
import { LoaderIcon } from "react-hot-toast";
import mapArr from "../../lib/reduce";
import "./style.css";
import Task from "./Task";

type Props = {
	queryKey: DocumentNode;
	dataFieldName: string;
};

const Tasks = ({ queryKey, dataFieldName }: Props) => {
	const listRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
	const [offsetHeight, setOffsetHeight] = useState(0);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setOffsetHeight(listRef.current?.offsetTop || 0);
		startTransition(() => {
			setIsReady(true);
		});
	}, []);

	const { data, error } = useSuspenseQuery(queryKey);

	if (!data || !data[dataFieldName]) {
		return <div>No Tasks</div>; // or some fallback UI
	}

	return (
		<section
			className="tasks-list"
			ref={listRef}
			style={{ height: `calc(100vh - ${offsetHeight}px)` }}
		>
			{data[dataFieldName].length === 0 && <div>No Tasks</div>}
			{mapArr(data[dataFieldName]).map(
				([date, tasks]: [string, Task[]]): ReactNode => (
					<>
						{dataFieldName !== "getTodayTasks" && (
							<div style={{ marginTop: 4, marginBottom: 2 }} key={date}>
								{date}
							</div>
						)}
						{tasks
							.sort((a, b) => a.todo.toLowerCase() > b.todo.toLowerCase())
							.map((task: Task) => (
								<Task key={task.id} task={task} />
							))}
					</>
				)
			)}
		</section>
	);
};

export default Tasks;

export const SuspenseWrapper = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<Suspense
			fallback={
				<div
					style={{ display: "flex", justifyContent: "center", marginTop: 24 }}
				>
					<LoaderIcon id="loader" />
				</div>
			}
		>
			{children}
		</Suspense>
	);
};
