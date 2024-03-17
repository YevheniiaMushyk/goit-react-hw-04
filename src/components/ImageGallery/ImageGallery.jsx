import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ imageGallery, openModal }) => {
	return (
		<ul className={css.galleryList}>
			{imageGallery &&
				Array.isArray(imageGallery) &&
				imageGallery.map((image, index) => {
					return (
						<li className={css.galleryItem} key={`${image.id}_${index}`} onClick={() => openModal(image)}>
							<ImageCard image={image} />
						</li>
					);
				})}
		</ul>
	);
};

export default ImageGallery;
