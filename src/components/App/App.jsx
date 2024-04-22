import { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

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
	const [modalIsOpen, setIsOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [isScrollToTop, setScrollToTop] = useState(false);

	useEffect(() => {
		if (!searchQuery) return;
		async function fetchImages() {
			try {
				setIsError(false);
				setIsLoading(true);
				setIsLoadMore(false);

				const { data } = await axios.get("photos", {
					params: { client_id: ACCESS_KEY, query: searchQuery, page: queryPage, per_page: "28", orientation: "squarish" },
				});
				console.log(data);
				setImageGallery((prevGallery) => [...prevGallery, ...data.results]);

				if (data.total <= 0) {
					setIsError(true);
					setErrorMessage("Sorry, there are no images matching your search query. Please try again!");
				}
				if (queryPage <= data.total_pages) {
					setIsLoadMore(true);
				}
			} catch (err) {
				setIsError(true);
				setErrorMessage(err.message);
			} finally {
				setIsLoading(false);
			}
		}

		fetchImages();
	}, [searchQuery, queryPage]);

	const onSetSearchQuery = (query) => {
		setImageGallery([]);
		setQueryPage(1);
		setSearchQuery(query);
	};

	const handleLoadMore = () => {
		setQueryPage((prevPage) => prevPage + 1);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 200) {
				setScrollToTop(true);
			} else {
				setScrollToTop(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	function openModal(image) {
		setIsOpen(true);
		setSelectedImage(image);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function afterOpenModal() {
		document.getElementById("modal-content")?.focus();
	}

	return (
		<>
			<SearchBar onSetSearchQuery={onSetSearchQuery} />
			{isLoading && <Loader />}
			{!isError ? <ImageGallery imageGallery={imageGallery} openModal={openModal} /> : <ErrorMessage message={errorMessage} />}
			{isLoadMore && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
			{isScrollToTop && <ScrollToTop scrollToTop={scrollToTop} />}
			{modalIsOpen && <ImageModal image={selectedImage} modalIsOpen={modalIsOpen} closeModal={closeModal} afterOpenModal={afterOpenModal} />}
		</>
	);
};

export default App;
