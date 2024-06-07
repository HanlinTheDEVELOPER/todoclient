import { useSuspenseQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import {
	RefObject,
	startTransition,
	Suspense,
	useEffect,
	useRef,
	useState,
} from "react";
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
	console.log(data?.[dataFieldName], error);

	return (
		<section
			className="tasks-list"
			ref={listRef}
			style={{ height: `calc(100vh - ${offsetHeight}px)` }}
		>
			{data?.[dataFieldName].map((task: Task) => (
				<Task key={task.id} task={task} />
			))}
		</section>
	);
};

export default Tasks;

export const SuspenseWrapper = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return <Suspense>{children}</Suspense>;
};
