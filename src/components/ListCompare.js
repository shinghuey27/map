import styles from "../sass/ListCompare.module.scss";

import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CompareArrowsRoundedIcon from "@material-ui/icons/CompareArrowsRounded";

const ListCompare = ({count}) => {
  const handleOpen = () => {
    if (count !== 2){
      alert("oi")
    }
  }
  return (
    <div className={styles.container}>
      <Tooltip title="Select 2 to compare" placement="right">
        <IconButton onClick={()=>handleOpen(count)}>
          <Badge color="primary" badgeContent={count} showZero>
            <CompareArrowsRoundedIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ListCompare;
