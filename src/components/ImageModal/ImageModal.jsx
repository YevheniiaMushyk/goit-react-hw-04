import css from ".//ImageModal.module.css";

const ImageModal = ({ image }) => {
	return (
		<div>
			<a className={css.galleryLink} href={image.urls.regular}>
				<img src={image.urls.small} alt={image.alt_description} />
				<ul className={css.infoList}>
					<li className={css.infoItem}>
						<h className={css.itemTitle}>Likes</h>
						<p className={css.itemContent}>{image.likes}</p>
					</li>
					<li className={css.infoItem}>
						<h className={css.itemTitle}>Views</h>
						<p className={css.itemContent}>{image.views}</p>
					</li>
					<li className={css.infoItem}>
						<h className={css.itemTitle}>Comments</h>
						<p className={css.itemContent}>{image.comments}</p>
					</li>
					<li className={css.infoItem}>
						<h className={css.itemTitle}>Downloads</h>
						<p className={css.itemContent}>{image.downloads}</p>
					</li>
				</ul>
			</a>
		</div>
	);
};

export default ImageModal;
