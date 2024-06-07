import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./index.css";

export const httpLink = new HttpLink({
	uri: import.meta.env.VITE_API_URL,
});

// Middleware to add the token to the headers
export const authLink = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem("token");

	operation.setContext({
		headers: {
			authorization: token ? `Bearer ${token}` : null,
			id: localStorage.getItem("userId"),
		},
	});

	return forward(operation);
});

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
			<Toaster />
		</ApolloProvider>
	</React.StrictMode>
);
