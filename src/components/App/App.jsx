import { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

axios.defaults.baseURL = "https://api.unsplash.com/search/";
const ACCESS_KEY = "6ISQi9M4rNBkl7LU8EVOjyrOACzSzwqNAvY8Ysl6IZo";

const App = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoadMore, setIsLoadMore] = useState(false);
	const [imageGallery, setImageGallery] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [queryPage, setQueryPage] = useState(1);
	const [currentQuery, setCurrentQuery] = useState("");
	const [totalPages, setTotalPages] = useState(0);
	const perPage = 28;

	useEffect(() => {
		if (!searchQuery) return;
		async function fetchImages() {
			try {
				setIsError(false);
				setIsLoading(true);
				setIsLoadMore(false);
				if (currentQuery !== searchQuery) {
					setImageGallery([]);
					setQueryPage(1);
				}
				const data = await axios.get("photos", {
					params: { client_id: ACCESS_KEY, query: searchQuery, page: queryPage, per_page: perPage, orientation: "squarish" },
				});
				setImageGallery((prevGallery) => [...prevGallery, ...data.data.results]);
				setTotalPages(data.data.total_pages);

				if (data.data.total <= 0) {
					setIsError(true);
					setErrorMessage("Sorry, there are no images matching your search query. Please try again!");
				}
			} catch (err) {
				setIsError(true);
				setErrorMessage(err);
			} finally {
				setIsLoading(false);
				if (queryPage <= totalPages) {
					setIsLoadMore(true);
				}
			}
		}

		fetchImages();
	}, [searchQuery, queryPage, currentQuery, perPage, totalPages]);

	const onSetSearchQuery = (query) => {
		setSearchQuery(query);
		setCurrentQuery(query);
	};

	const handleLoadMore = () => {
		setQueryPage((prevPage) => prevPage + 1);
	};

	return (
		<>
			<SearchBar onSetSearchQuery={onSetSearchQuery} />
			{isLoading && <Loader />}
			{!isError ? <ImageGallery imageGallery={imageGallery} /> : <ErrorMessage message={errorMessage} />}
			{/* <ImageModal imageGallery={imageGallery} /> */}
			{isLoadMore && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
		</>
	);
};

export default App;
