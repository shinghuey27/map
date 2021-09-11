import "../App.scss";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Rating from "@material-ui/lab/Rating";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import NavigationRoundedIcon from "@material-ui/icons/NavigationRounded";
import Typography from "@material-ui/core/Typography";

import { useSelector } from "react-redux";

export function HistoryList({states,setStates}) {
  const { entities } = useSelector((state) => state.maps);
  const loading = useSelector((state) => state.loading);

  const buttonClick = (e) => {

      setStates({
        ...states,
        coords: {
          lat: e.lat,
          lng: e.lng,
        },
      })
     
  }
  return (
    <Paper elevation={3}>
      <div className="history-list-container">
        {loading ? (
          <div>"Loading..."</div>
        ) : (
          <div>
            {entities.length &&
              entities.map(
                ({ id, url, title,coords, rating, formatted_address, review }, i) => (
                  <div key={id} className="history-list">
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
                        <Button variant="contained" color="primary"  onClick={()=>buttonClick(coords)}>
                          Click
                        </Button>
                      </div>
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
