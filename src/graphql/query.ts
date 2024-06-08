import { gql } from "@apollo/client";

export const GET_ME = gql`
	query me($email: String!) {
		me(email: $email) {
			id
			name
			email
		}
	}
`;

export const GET_TODAY_TASKS = gql`
	query getTodayTasks {
		getTodayTasks {
			id
			todo
			deadline
			status
		}
	}
`;

export const GET_EXPIRED_TASKS = gql`
	query getExpiredTasks {
		getExpiredTasks {
			id
			todo
			deadline
			status
		}
	}
`;

export const GET_UPCOMING_TASKS = gql`
	query getUpcomingTasks {
		getUpcomingTasks {
			id
			todo
			deadline
			status
		}
	}
`;
