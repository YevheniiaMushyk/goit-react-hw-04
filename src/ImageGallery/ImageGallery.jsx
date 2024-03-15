import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ imageGallery }) => {
	return (
		<ul>
			{imageGallery !== null &&
				Array.isArray(imageGallery) &&
				imageGallery.map((image) => {
					return (
						<li key={image.id}>
							<ImageCard image={image} />
						</li>
					);
				})}
		</ul>
	);
};

export default ImageGallery;
