import "../App.scss";
import styles from "../sass/HistoryList.module.scss";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import NavigationRoundedIcon from "@material-ui/icons/NavigationRounded";
import Typography from "@material-ui/core/Typography";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { mapUpdated } from "../redux/MapsSlice";
import { reviewAdded, reviewDeleted } from "../redux/ReviewsSlice";

import ListCompare from "./ListCompare";
import ModalReview from "./ModalReview";

export function HistoryList({ states, setStates }) {
  const [count, setCount] = useState(0);
  const { entities } = useSelector((state) => state.maps);
  const loading = useSelector((state) => state.loading);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

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

  const addtocart = (entity, id, buttonText, reviewDetails) => {

    const mapId = id;
    const selectedId = id - 1;

    console.log("reviewDetails", entity[selectedId]);
    if (entity[selectedId].buttonText === "Add to compare") {
      if (count < 2) {
        dispatch(
          mapUpdated({
            id: mapId,
            buttonText: "Remove",
          })
        );
        dispatch(
          reviewAdded({
            id: selectedId,
            title: entity[selectedId].title,
            reviews: entity[selectedId].reviewDetails,
          })
        );
        setCount(count + 1);
      } else {
        setError(true);
      }
    } else {
      dispatch(
        mapUpdated({
          id: mapId,
          buttonText: "Add to compare",
        })
      );
      dispatch(reviewDeleted({ selectedId }));

      setCount(count - 1);
    }
  };

  const handleOpen = (entity, reviewDetails, id) => {
    setReviewDetail(reviewDetails);
    setOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

  return (
    <div>
      <Snackbar open={error} autoHideDuration={1}>
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Maximum 2 items comparison
        </Alert>
      </Snackbar>

      <ListCompare reviewDetail={reviewDetail} count={count} />
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
                      buttonText,
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
                            color={
                              buttonText === "Remove" ? "secondary" : "primary"
                            }
                            id={id}
                            onClick={(e) => {
                              addtocart(entities, id, buttonText);
                            }}
                          >
                            {buttonText}
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
