import "../App.scss";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Rating from "@material-ui/lab/Rating";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import NavigationRoundedIcon from "@material-ui/icons/NavigationRounded";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useSelector } from "react-redux";
import { useState } from "react";

export function HistoryList({ states, setStates }) {
  const { entities } = useSelector((state) => state.maps);
  const loading = useSelector((state) => state.loading);
  const [open, setOpen] = useState(false);

  const buttonClick = (e) => {
    setStates({
      ...states,
      coords: {
        lat: e.lat,
        lng: e.lng,
      },
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper elevation={3}>
      <div className="history-list-container">
        {loading ? (
          <div>"Loading..."</div>
        ) : (
          <div>
            {entities.length &&
              entities.map(
                (
                  { id, url, title, coords, rating, formatted_address, review },
                  i
                ) => (
                  <div
                    key={id}
                    className="history-list"
                    onClick={() => buttonClick(coords)}
                  >
                    <CardMedia image={url} title={id} className="img" />
                    <CardContent>
                      <Typography component="h5" variant="h5">
                        {title}
                      </Typography>

                      <Typography variant="subtitle1" color="textSecondary">
                        <NavigationRoundedIcon className="rotate" />
                        {formatted_address}
                      </Typography>

                      <div className="ss">
                        <Rating
                          name="read-only"
                          value={rating}
                          size="large"
                          readOnly
                        />
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          className="sss"
                        >
                          Total Reviews ({review})
                        </Typography>
                      </div>
                      <Button href="#text-buttons" color="primary"
                        onClick={handleOpen}
                      >
                        recent 5 reviews
                      </Button>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={open}>
                          <div>
                            <h2 id="transition-modal-title">
                              Transition modal
                            </h2>
                            <p id="transition-modal-description">
                              react-transition-group animates me.
                            </p>
                          </div>
                        </Fade>
                      </Modal>
                      <Button variant="contained" color="primary">
                        Click
                      </Button>
                    </CardContent>
                  </div>
                )
              )}
          </div>
        )}
      </div>
    </Paper>
  );
}
