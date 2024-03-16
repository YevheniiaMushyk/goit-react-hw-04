import css from ".//ImageModal.module.css";

const ImageModal = ({ image }) => {
	console.log(image);
	return (
		<div>
			<img src={image.urls.regular} alt={image.alt_description} />
			<ul className={css.infoList}>
				<li className={css.infoItem}>
					<h className={css.itemTitle}>Description</h>
					<p className={css.itemContent}>{image.alt_description}</p>
				</li>

				<li className={css.infoItem}>
					<h className={css.itemTitle}>Author</h>
					<p className={css.itemContent}>{image.username}</p>
				</li>
				<li className={css.infoItem}>
					<h className={css.itemTitle}>Date</h>
					<p className={css.itemContent}>{image.created_at}</p>
				</li>
				<li className={css.infoItem}>
					<h className={css.itemTitle}>Likes</h>
					<p className={css.itemContent}>{image.likes}</p>
				</li>
			</ul>
		</div>
	);
};

export default ImageModal;
