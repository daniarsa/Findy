import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProfile, updateProfilePhotoComments, getStories } from "../../services/findyServices";
import { IoIosArrowBack, IoIosMore, IoMdSend } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import LikeButton from "../../components/LikeButton/LikeButton";
import CommentModal from "../../components/CommentModal/CommentModal";

const Details = () => {
  const [imageDetail, setImageDetail] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [storyImage, setStoryImage] = useState(null);  
  const [newComment, setNewComment] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const profileInfo = await getProfile();
      setProfileData(profileInfo);

      const imageDetail = profileInfo.photos.find(photo => photo.id === id);
      setImageDetail(imageDetail);

      
      const stories = await getStories();
      if (stories) {
        
        const storyImage = stories.find(story => story.id === "1")?.image2; 
        setStoryImage(storyImage);
      }
    };

    fetchData();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") return;

    const updatedComments = [
      ...imageDetail.comments,
      { username: "currentUser", comment: newComment, likes: "0" }
    ];

    setImageDetail({ ...imageDetail, comments: updatedComments });

    await updateProfilePhotoComments(id, updatedComments);

    setNewComment("");
  };

  if (!imageDetail || !profileData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details-page bg-custom-gradient bg-cover bg-center bg-no-repeat max-w-md mx-auto shadow-lg rounded-lg rounded-tr-3xl overflow-hidden w-full min-w-[300px] min-h-[300px]">
      <div className="relative ">
        <img
          src={imageDetail.imageUrl}
          alt="detail"
          className="relative object-cover w-[480px] h-[690px] aspect-video  rounded-3xl"
        />
        
        <div className="absolute inset-x-0 top-0 flex justify-between items-center p-8">
          <IoIosArrowBack
            onClick={() => navigate("/profile")}
            className="text-3xl cursor-pointer fill-white"
          />
          <IoIosMore className="text-3xl fill-white" />
        </div>
      </div>

      <div className="relative w-80 h-20 ml-[15%] inset-x-0 bottom-[45px] p-4 bg-white text-font-color-2 flex justify-end rounded-3xl">
        <img
          src={profileData.profileImageUrl}
          alt="Jennie Kim"
          className="h-[58px] w-[58px] rounded-full object-cover relative right-[18%] bottom-[10%] border-2 p-[2.5px] bg-gradient-to-r from-color-1 via-color-2 to-color-4"
        />
        <p className="relative top-[15px] right-[45px] font-balsamiq text-font-color-2 font-semibold text-sm">
          {profileData.name}
        </p>
        <LikeButton buttonClass="feed-like-button relative h-[20px] w-[20px] left-[20px] fill-color-1 " 
        iconClass="feed-like-icon relative h-[20px] w-[20px] ">
        </LikeButton>
        <p className="relative top-[30px] right-[3px] font-balsamiq text-sm">{imageDetail.likes}</p>
        <FaRegComment 
          className="relative h-[20px] w-[20px] left-[15px] cursor-pointer" 
          onClick={() => setIsModalOpen(true)} 
        />
        <p className="relative top-[30px] font-balsamiq text-sm">{imageDetail.comments.length}</p>
        <FiSend className="relative h-[20px] w-[20px] left-[20px] " />
        <p className="relative top-[30px] font-balsamiq text-sm">2K</p>
      </div>

      <div className="relative p-4 bottom-[30px]">
        <p className="text-font-color-1 text-lg font-normal font-baloo">{imageDetail.description}</p>
      </div>

      <div className="relative p-4 flex items-center space-x-2">
        <img
          src={storyImage} 
          alt="Story"
          className="h-10 w-10 rounded-full object-cover border-2 p-[2.5px] bg-gradient-to-r from-color-1 via-color-2 to-color-4"
        />
        <input
          type="text"
          placeholder="Write comment as username..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 rounded-full py-2 px-4 text-font-color-1 font-balsamiq"
        />
        <button 
          onClick={handleCommentSubmit} 
          className="absolute inset-y-0 right-0 flex items-center pr-8">
          <IoMdSend className="w-[24px] h-[24px] fill-color-1" />
        </button>
      </div>

      {isModalOpen && (
        <CommentModal 
          comments={imageDetail.comments} 
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Details;
