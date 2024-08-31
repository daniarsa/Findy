import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const LikeButton = ({ postId }) => {
  const { likes, likesDispatch } = useAppContext();

  const isLiked = likes[postId];
  
  const toggleLike = () => {
    likesDispatch({ type: "TOGGLE_LIKE", payload: postId });
  };

  return (
    <button onClick={toggleLike}>
      {isLiked ? (
        <FaHeart className="fill-color-1" />
      ) : (
        <FaRegHeart />
      )}
    </button>
  );
};

export default LikeButton;
