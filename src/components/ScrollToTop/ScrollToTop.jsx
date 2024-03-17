import css from "./ScrollToTop.module.css";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTop = ({ scrollToTop }) => {
	return (
		<button className={css.scrollToTop} onClick={scrollToTop}>
			<FaArrowUp className={css.arrow} />
		</button>
	);
};

export default ScrollToTop;
