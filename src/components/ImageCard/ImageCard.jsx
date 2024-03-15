import css from "./ImageCard.module.css";

const ImageCard = ({ image }) => {
	return (
		<div className={css.galleryLink}>
			<img src={image.urls.small} alt={image.alt_description} />
		</div>
	);
};

export default ImageCard;
