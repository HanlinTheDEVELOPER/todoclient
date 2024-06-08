import { gql } from "@apollo/client";

export const LogIn = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			userId
			name
			email
			token
		}
	}
`;

export const Signup = gql`
	mutation signUp($createUserInput: CreateUserInput!) {
		signUp(createUserInput: $createUserInput) {
			userId
			name
			email
			token
		}
	}
`;

export const LOGOUT_MUTATION = gql`
	mutation logout {
		logout {
			msg
		}
	}
`;

export const FORGET_PASSWORD = gql`
	mutation forgetPassword($email: String!) {
		forgetPassword(email: $email) {
			msg
		}
	}
`;

export const CreateTask = gql`
	mutation createTask($createTodoInput: CreateTodoInput!) {
		createTask(createTodoInput: $createTodoInput) {
			id
			todo
			deadline
			status
		}
	}
`;

export const ToggleTaskStatus = gql`
	mutation toggleTaskStatus($id: String!) {
		toggleTaskStatus(id: $id) {
			id
			todo
			deadline
			status
		}
	}
`;

export const DeleteTask = gql`
	mutation deleteTask($id: String!) {
		deleteTask(id: $id) {
			todo
		}
	}
`;
