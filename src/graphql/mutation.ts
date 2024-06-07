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
