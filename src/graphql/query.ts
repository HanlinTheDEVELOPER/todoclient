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
