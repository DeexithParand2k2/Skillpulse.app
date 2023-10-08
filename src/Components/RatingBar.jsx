import { Typography, Rating } from "@mui/material";

const Ratingbar = ({ total_marks }) => {
  return (
    <div>
      <Rating
        name="half-rating-read"
        value={total_marks}
        precision={0.1}
        readOnly
      />
    </div>
  );
};

export default Ratingbar;
