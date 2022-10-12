import styles from "../sass/ModalReview.module.scss";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";

const ModalReview = ({ reviewDetail, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      className={styles.modal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Card className={styles.reviewContainer}>
          {reviewDetail !== undefined ? (
            reviewDetail.map((review,id) => (
              <div key={id}>
                <div className={styles.header}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt={review.author_name}
                        src={review.profile_photo_url}
                      />
                    }
                    title={review.author_name}
                    subheader={review.relative_time_description}
                  ></CardHeader>

                  <Typography variant="subtitle1" className={styles.ratingDiv}>
                    <Rating
                      name="read-only"
                      value={review.rating}
                      readOnly
                      className={styles.ratingStar}
                    />
                    {review.rating}.0
                  </Typography>
                </div>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={styles.reviewText}
                >
                  {review.text}
                </Typography>
                <Divider />
              </div>
            ))
          ) : (
            <div className={styles.noReview}>
              <Typography
                variant="overline"
                color="textSecondary"
                display="block"
                gutterBottom
              >
                No reviews yet
              </Typography>
            </div>
          )}
        </Card>
      </Fade>
    </Modal>
  );
};

export default ModalReview;
