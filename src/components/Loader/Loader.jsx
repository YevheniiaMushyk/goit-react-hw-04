import css from "../Loader/Loader.module.css";
import { Bars } from "react-loader-spinner";

const Loader = () => {
	return (
		<div className={css.loader}>
			<Bars height="80" width="80" color="#9dbc98" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
			<br />
			<p className={css.text}>Loading...</p>
		</div>
	);
};

export default Loader;
