import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLikes } from "../../context/AppContext"; 
import { useState } from 'react';
import PropTypes from "prop-types";

const LikeButton = ({ buttonClass, iconClass }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button onClick={toggleLike} className={buttonClass}>
      {isLiked ? (
        <FaHeart className={`${iconClass} fill-color-1`} />
      ) : (
        <FaRegHeart className={iconClass}  />
      )}
    </button>
  );
};

LikeButton.propTypes = {
  buttonClass: PropTypes.string.isRequired, 
  iconClass: PropTypes.string.isRequired,   
};

export default LikeButton;