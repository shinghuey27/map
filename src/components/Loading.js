import Skeleton from "@material-ui/lab/Skeleton";
import styles from "../sass/Loading.module.scss";
import Typography from "@material-ui/core/Typography";

const Loading = (props) => {
  return (
    <div className={styles.container}>
      <Skeleton
        variant="rect"
        animation="wave"
        className={styles.mapContainer}
      />
      <Typography
        variant="overline"
        color="textSecondary"
        display="block"
        className={styles.textLoader}
      >
        {props.message}
      </Typography>
    </div>
  );
};

Loading.defaultProps = {
  message: "Loading...",
};

export default Loading;
