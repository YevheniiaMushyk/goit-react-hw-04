import React from "react";

const ErrorMessage = ({ message = "" }) => {
	return <div>{message.length > 0 ? message : "Whoops, something went wrong! Please try reloading this page!"}</div>;
};

export default ErrorMessage;
