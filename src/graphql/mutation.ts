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
