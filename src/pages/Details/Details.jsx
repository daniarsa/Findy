import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImageDetail } from "../../services/findyServices";
import { IoIosArrowBack, IoIosMore, IoMdSend   } from "react-icons/io";
import { FaRegComment, FaHeart  } from "react-icons/fa";


const Details = () => {
  const [imageDetail, setImageDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImageDetail = async () => {
      const data = await getImageDetail();
      setImageDetail(data);
    };

    fetchImageDetail();
  }, []);

  if (!imageDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details-page bg-custom-gradient bg-cover bg-center bg-no-repeat max-w-md mx-auto shadow-lg rounded-lg overflow-hidden w-full">
        <div className="relative h-[70vh]">
        <img
          src={imageDetail.imageUrl}
          alt="detail"
          className=" object-cover w-full h-full  rounded-3xl"
        />
        
        <div className="absolute inset-x-0 top-0 flex justify-between items-center p-4">
          <IoIosArrowBack
            onClick={() => navigate("/profile")}
            className="text-3xl cursor-pointer fill-white"
          />
          <IoIosMore className="text-3xl fill-white" />
        </div>
      </div>

      <div className="relative w-80 h-20 ml-[15%] inset-x-0 bottom-[45px] p-4 bg-white text-font-color-2 flex justify-end rounded-3xl">
        <img
          src={imageDetail.profileImageUrl}
          alt="Jennie Kim"
          className="h-[58px] w-[58px] rounded-full object-cover relative right-[40%] bottom-[10%] border-2 p-[2.5px] bg-gradient-to-r from-color-1 via-color-2 to-color-4"
        />
          <FaHeart className="flex h-[24px] w-[24px] fill-color-1" />
          <p className="relative top-[30px] right-[29px] font-balsamiq ">{imageDetail.likes}</p>
          <FaRegComment className="relative h-[24px] w-[24px]" />
          <p className=" relative top-[30px] right-[29px] font-balsamiq" >{imageDetail.commentsCount}</p>
        </div>

      <div className=" relative p-4 bottom-[30px] ">
        <p className="text-font-color-1 text-xs font-normal font-baloo ">{imageDetail.description}</p>
      </div>

      {/* <div className="p-4">
        {imageDetail.comments.map((comment, index) => (
          <div key={index} className="border-b border-gray-200 py-2">
            <p className="text-font-color-1 font-balsamiq text-sm">
              <strong>{comment.username}</strong> {comment.comment}
            </p>
            <p className="text-font-color-1 text-sm">{comment.likes} Likes</p>
          </div>
        ))}
      </div> */}

      <div className="relative p-4 flex items-center space-x-2">
        <img
          src={imageDetail.profileImageUrl}
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover border-2 p-[2.5px] bg-gradient-to-r from-color-1 via-color-2 to-color-4"
        />
        <input
          type="text"
          placeholder="Write comment as username..."
          className="flex-1 rounded-full py-2 px-4 text-font-color-1 font-balsamiq"
        />
        <button className="absolute inset-y-0 right-0 flex items-center pr-8">
          <IoMdSend className="w-[24px] h-[24px] fill-color-1" />
        </button>
      </div>
    </div>
  );
};

export default Details;
