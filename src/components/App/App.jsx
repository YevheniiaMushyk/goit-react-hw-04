import { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
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
Modal.setAppElement("#root");

const App = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoadMore, setIsLoadMore] = useState(false);
	const [imageGallery, setImageGallery] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [queryPage, setQueryPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [isScrollToTop, setScrollToTop] = useState(false);
	const totalPagesRef = useRef(totalPages);

	useEffect(() => {
		totalPagesRef.current = totalPages;
	}, [totalPages]);

	useEffect(() => {
		if (!searchQuery) return;
		async function fetchImages() {
			try {
				setIsError(false);
				setIsLoading(true);
				setIsLoadMore(false);

				const data = await axios.get("photos", {
					params: { client_id: ACCESS_KEY, query: searchQuery, page: queryPage, per_page: "28", orientation: "squarish" },
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
				if (queryPage <= totalPagesRef.current) {
					setIsLoadMore(true);
				}
			}
		}

		fetchImages();
	}, [searchQuery, queryPage, totalPages]);

	const onSetSearchQuery = (query) => {
		setImageGallery([]);
		setQueryPage(1);
		setSearchQuery(query);
	};

	const handleLoadMore = () => {
		setQueryPage((prevPage) => prevPage + 1);
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
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<>
			<SearchBar onSetSearchQuery={onSetSearchQuery} />
			{isLoading && <Loader />}
			{!isError ? <ImageGallery imageGallery={imageGallery} openModal={openModal} /> : <ErrorMessage message={errorMessage} />}
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				shouldCloseOnEsc={true}
				onAfterOpen={afterOpenModal}
				shouldFocusAfterRender={true}
				style={{
					overlay: {
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(99, 136, 137, 0.95)",
					},
					content: {
						position: "absolute",
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%, -50%)",

						// border: "1px solid #f9efdb",
						background: "rgba(249, 239, 219, 0.85)",
						overflow: "hidden",
						WebkitOverflowScrolling: "touch",
						borderRadius: "20px",
						outline: "none",
					},
				}}
			>
				{modalIsOpen && <ImageModal image={selectedImage} />}
			</Modal>
			{isLoadMore && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
			{isScrollToTop && <ScrollToTop scrollToTop={scrollToTop} />}
		</>
	);
};

export default App;
