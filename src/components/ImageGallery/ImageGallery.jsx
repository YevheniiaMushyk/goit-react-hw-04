import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ imageGallery }) => {
	return (
		<ul className={css.galleryList}>
			{imageGallery &&
				Array.isArray(imageGallery) &&
				imageGallery.map((image) => {
					return (
						<li className={css.galleryItem} key={image.id}>
							<ImageCard image={image} />
						</li>
					);
				})}
		</ul>
	);
};

export default ImageGallery;
