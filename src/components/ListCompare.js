import styles from "../sass/ListCompare.module.scss";

import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";

import CompareArrowsRoundedIcon from "@material-ui/icons/CompareArrowsRounded";
import { useSelector } from "react-redux";
import { useState } from "react";

const ListCompare = ({ count }) => {
  const [open, setOpen] = useState(false);
  const { entities } = useSelector((state) => state.reviews);

  console.log("listcompare", entities);

  const handleOpen = () => {
    if (count !== 2) {
      alert("Please select 2 items to compare");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <Tooltip title="Select 2 to compare" placement="right">
        <IconButton onClick={() => handleOpen()}>
          <Badge color="primary" badgeContent={count}>
            <CompareArrowsRoundedIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Tooltip>

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
          <div className={styles.cardContainer}>
            <Card className={styles.reviewContainer}>
              {entities[0] !== undefined ? (
                <div>
                  <Typography variant="overline" className={styles.title}>
                    {entities[0].title}
                  </Typography>
                  <Divider />

                  {entities[0].reviews !== undefined ? (
                    entities[0].reviews.map((review) => (
                      <div key={review.length}>
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

                          <Typography
                            variant="subtitle1"
                            className={styles.ratingDiv}
                          >
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
                </div>
              ) : (
                <div>nothing</div>
              )}
            </Card>
            <Card className={styles.reviewContainer}>
              {entities[1] !== undefined ? (
                <div>
                  <Typography variant="overline" className={styles.title}>
                    {entities[1].title}
                  </Typography>
                  <Divider />
                  {entities[1].reviews !== undefined ? (
                    entities[1].reviews.map((review) => (
                      <div key={review.length}>
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

                          <Typography
                            variant="subtitle1"
                            className={styles.ratingDiv}
                          >
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
                </div>
              ) : (
                <div>nothing</div>
              )}
            </Card>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ListCompare;
