import css from "./ImageCard.module.css";

const ImageCard = ({ image }) => {
	return (
		<div>
			<img src={image.html} alt="" />
		</div>
	);
};

export default ImageCard;
