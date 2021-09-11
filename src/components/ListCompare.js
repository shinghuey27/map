import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import CompareArrowsRoundedIcon from "@material-ui/icons/CompareArrowsRounded";

const ListCompare = () => {
  return (
    <div>
      <Tooltip title="Select 2 to compare" placement="right">
        <IconButton>
          <Badge color="primary" badgeContent={2} showZero>
            <CompareArrowsRoundedIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ListCompare;
