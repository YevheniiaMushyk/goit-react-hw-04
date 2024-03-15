import css from "../ErrorMessage/ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
	return <div className={css.message}>{message.length > 0 ? message : "Whoops, something went wrong! Please try reloading this page!"}</div>;
};

export default ErrorMessage;
