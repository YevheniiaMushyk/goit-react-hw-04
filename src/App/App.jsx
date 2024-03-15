import { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

axios.defaults.baseURL = "https://api.unsplash.com/";
const ACCESS_KEY = "6ISQi9M4rNBkl7LU8EVOjyrOACzSzwqNAvY8Ysl6IZo";

const App = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [imageGallery, setImageGallery] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (searchQuery === null) return;
		async function fetchImages() {
			try {
				setIsLoading(true);
				const data = await axios.get("photos", { params: { client_id: ACCESS_KEY, query: searchQuery } });
				setImageGallery(data.results);
			} catch (err) {
				setIsError(true);
				setErrorMessage(err);
			} finally {
				setIsLoading(false);
				setIsError(false);
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
			<ImageGallery imageGallery={imageGallery} />
			{isError && <ErrorMessage message={errorMessage} />}
		</>
	);
};

export default App;
