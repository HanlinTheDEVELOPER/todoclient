export default function mapArr(arr: any) {
	if (!Array.isArray(arr) || undefined) {
		return [];
	}

	const data = arr.reduce((init, current) => {
		const deadlineStr = current.deadline.toString();
		if (!init.has(deadlineStr)) {
			init.set(deadlineStr, []);
		}
		init.get(deadlineStr).push(current);
		return init;
	}, new Map());
	//return nested array
	// [
	// 		["2024-05-31", [[Object]]],
	// 		["2024-06-05", [[Object]]],
	// 		["2024-06-20", [[Object]]],
	// 		["2024-06-07", [[Object]]],
	// 	];
	return Array.from(data.entries());
}
