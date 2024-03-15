import css from "./SearchBar.module.css";
import { CiSearch } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({ onSetSearchQuery }) => {
	const handleSubmit = (evt) => {
		evt.preventDefault();
		const form = evt.target;
		const notify = () =>
			toast.error("Enter a search query", {
				style: {
					border: "1px solid #ff204e",
					padding: "16px",
					color: "#ff204e",
				},
				iconTheme: {
					primary: "#ff204e",
					secondary: "#FFFAEE",
				},
			});

		const inputValue = form.elements.inputValue.value.trim();
		if (!inputValue) {
			notify();
			return;
		}
		onSetSearchQuery(inputValue);

		form.reset();
	};
	return (
		<header>
			<form onSubmit={handleSubmit}>
				<input type="text" autoComplete="off" name="inputValue" autoFocus placeholder="Search images and photos" />
				<button type="submit">
					<CiSearch />
				</button>
				<Toaster position="top-center" reverseOrder={true} />
			</form>
		</header>
	);
};

export default SearchBar;
