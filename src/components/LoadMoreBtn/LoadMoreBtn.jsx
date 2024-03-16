import css from "../LoadMoreBtn/LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handleLoadMore }) => {
	return (
		<button className={css.loadMoreBtn} type="button" onClick={handleLoadMore}>
			Load more
		</button>
	);
};

export default LoadMoreBtn;
