import { useState, useEffect } from "react";
import { getFeed } from "../../services/findyServices";
import Logotipo from "../../assets/LOGOLOGO 3.svg";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa6";

const Feed = () => {
  const [feedData, setFeedData] = useState(null);

  useEffect(() => {
    const fetchFeedData = async () => {
      const data = await getFeed();
      setFeedData(data);
    };
    fetchFeedData();
  }, []);

  if (!feedData) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <section className="flex flex-row items-center">
        <img src={Logotipo} alt="Findy" />
        <div className="flex flex-row items-center gap-3">
          <FaRegHeart />
          <FaRegComments />
        </div>
      </section>
      <div className="flex flex-row items-center">
        {feedData.stories && feedData.stories.length > 0 ? (
          feedData.stories.map((stories, index) => (
            <div key={index} className="story">
              <img src={stories.image2} alt={stories.title} className=" mx-auto h-24 w-24 object-cover inline-block rounded-full p-[2.5px]  bg-gradient-to-r from-color-1 via-color-2 to-color-4 " />
              <p>{stories.title}</p>
            </div>
          ))
        ) : (
          <p>No stories available</p>
        )}
      </div>
    </main>
  );
};

export default Feed;
