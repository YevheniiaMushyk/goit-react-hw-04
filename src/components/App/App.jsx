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

	useEffect(() => {
		if (!searchQuery) return;
		async function fetchImages() {
			try {
				setImageGallery([]);
				setIsError(false);
				setIsLoading(true);
				const data = await axios.get("photos", { params: { client_id: ACCESS_KEY, query: searchQuery } });
				setImageGallery(data.data.results);
			} catch (err) {
				setIsError(true);
				setErrorMessage(err);
			} finally {
				setIsLoading(false);
				setIsLoadMore(true);
			}
		}

		fetchImages();
	}, [searchQuery]);

	const onSetSearchQuery = (query) => {
		setSearchQuery(query);
	};

	return (
		<>
			<SearchBar onSetSearchQuery={onSetSearchQuery} />
			{isLoading && <Loader />}
			{!isError ? <ImageGallery imageGallery={imageGallery} /> : <ErrorMessage message={errorMessage} />}
			{/* <ImageModal imageGallery={imageGallery} /> */}
			{isLoadMore && <LoadMoreBtn />}
		</>
	);
};

export default App;
