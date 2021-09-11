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
import ReactHtmlParser from "html-react-parser";
import ListCompare from "./ListCompare";

export function HistoryList({ states, setStates }) {
  const { entities } = useSelector((state) => state.maps);
  const loading = useSelector((state) => state.loading);
  const [open, setOpen] = useState(false);
  const [buttonId, setButtonId] = useState(null);
  const [htmlReviews, setHTMLReviews] = useState(null);
  
  const buttonClick = (e) => {
    setStates({
      ...states,
      coords: {
        lat: e.lat,
        lng: e.lng,
      },
    });
  };
  const setReviews = (entity,reviewDetails,buttonsId,id) => {
    var loopData = "";
    console.log("sssss",reviewDetails)
      if(reviewDetails !== undefined){
        for (var x in reviewDetails) {
          loopData += `<p>`;
          loopData += `<div>Author Name: ${reviewDetails[x].author_name}</div>`;
          loopData += `<div>Rating: ${reviewDetails[x].rating}</div>`;
          loopData += `<div>Time: ${reviewDetails[x].relative_time_description}</div>`;
          loopData += `<div>Description: ${reviewDetails[x].text}</div></p>`;
        }
        setHTMLReviews( ReactHtmlParser(`${loopData}`));
      }else{
        var noData = "<div>Nothing</div>"
        setHTMLReviews( ReactHtmlParser(`${noData}`));
      }

    
  };
  const addtocart = (entity, id, reviewDetails) => {
    console.log("asd", entity[id - 1]);
    console.log("review", reviewDetails);
  };
  const handleOpen = (entity,reviewDetails,buttonsId,id) => {
      
      setReviews(entity,reviewDetails,id)
      console.log(htmlReviews);
      setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListCompare />
      <Paper elevation={3}>
        <div className="history-list-container">
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
                        <Button color="primary" onClick={()=>handleOpen(entities,reviewDetails,buttonId,id)}>
                          recent 5 reviews
                        </Button>
                        
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            addtocart(entities, id);
                          }}
                        >
                          Click
                        </Button>
                      </CardContent>
                    </div>
                  )
                )}
            </div>
          )}
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          className="modal"
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div>
            {/* <p className="paper">asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd</p> */}
            <div className="paper">{htmlReviews}</div>
            </div>
          </Fade>
        </Modal>
      </Paper>
    </div>
  );
}
