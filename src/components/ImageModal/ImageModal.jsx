import css from ".//ImageModal.module.css";

const ImageModal = ({ image }) => {
	const dateString = image.created_at;
	const date = new Date(dateString);
	const formattedDate = date.toLocaleDateString();
	return (
		<div tabIndex="-1" id="modal-content" className={css.modalContainer}>
			<img className={css.modalImg} src={image.urls.regular} alt={image.alt_description} />
			<ul className={css.modalList}>
				<li className={css.modalItem}>
					<p className={css.modalTitle}>Description</p>
					<p className={css.modalContent}>{image.alt_description}</p>
				</li>

				<li className={css.modalItem}>
					<p className={css.modalTitle}>Author</p>
					<p className={css.modalContent}>{image.user.name}</p>
				</li>
				<li className={css.modalItem}>
					<p className={css.modalTitle}>Date</p>
					<p className={css.modalContent}>{formattedDate}</p>
				</li>
				<li className={css.modalItem}>
					<p className={css.modalTitle}>Likes</p>
					<p className={css.modalContent}>{image.likes}</p>
				</li>
			</ul>
		</div>
	);
};

export default ImageModal;
