import "../App.scss";
import styles from "../sass/HistoryList.module.scss";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import NavigationRoundedIcon from "@material-ui/icons/NavigationRounded";
import Typography from "@material-ui/core/Typography";

import { useSelector } from "react-redux";
import { useState } from "react";

import ListCompare from "./ListCompare";
import ModalReview from "./ModalReview";

export function HistoryList({ states, setStates }) {
  const { entities } = useSelector((state) => state.maps);
  const loading = useSelector((state) => state.loading);
  const [open, setOpen] = useState(false);

  const initialReviewDetails = [
    {
      author_name: "John Doe",
      rating: 5,
      relative_time_description: "1 year ago",
      text: "Pretty Place!",
    },
  ];

  const [reviewDetail, setReviewDetail] = useState(initialReviewDetails);

  const buttonClick = (e) => {
    setStates({
      ...states,
      coords: {
        lat: e.lat,
        lng: e.lng,
      },
    });
  };

  const addtocart = (entity, id, reviewDetails) => {
    console.log("asd", entity[id - 1]);
    console.log("review", reviewDetails);
  };
  const handleOpen = (entity, reviewDetails, id) => {
    setReviewDetail(reviewDetails);
    setOpen(true);
  };

  return (
    <div>
      <ListCompare reviewDetail={reviewDetail} />
      <Paper elevation={3}>
        <div className={styles.listContainer}>
          {loading ? (
            <div>"Loading..."</div>
          ) : (
            <div>
              {entities.length &&
                entities.map(
                  (
                    {
                      id,
                      url,
                      title,
                      coords,
                      rating,
                      formatted_address,
                      review,
                      reviewDetails,
                    },
                    i
                  ) => (
                    <div
                      key={id}
                      className={styles.historyList}
                      onClick={() => buttonClick(coords)}
                    >
                      <CardMedia
                        image={url}
                        title={id}
                        className={styles.placeImg}
                      />
                      <CardContent>
                        <Typography component="h5" variant="h5">
                          {title}
                        </Typography>

                        <Typography variant="subtitle1" color="textSecondary">
                          <NavigationRoundedIcon
                            className={styles.iconRotate}
                          />
                          {formatted_address}
                        </Typography>

                        <div className={styles.ratingContainer}>
                          <Rating
                            name="read-only"
                            value={rating}
                            size="large"
                            readOnly
                          />
                          <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            className={styles.textTotalReviews}
                          >
                            Total Reviews ({review})
                          </Typography>
                        </div>

                        <div className={styles.buttonContainer}>
                          <Button
                            color="primary"
                            onClick={() =>
                              handleOpen(entities, reviewDetails, id)
                            }
                          >
                            Recent Reviews
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              addtocart(entities, id);
                            }}
                          >
                            Add to Compare
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  )
                )}
            </div>
          )}
        </div>
        <ModalReview
          reviewDetail={reviewDetail}
          open={open}
          setOpen={setOpen}
        />
      </Paper>
    </div>
  );
}
