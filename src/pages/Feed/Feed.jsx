import { useState, useEffect } from "react";
import { getFeed } from "../../services/findyServices";
import Logotipo from "../../assets/LOGOLOGO 3.svg";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FaRegComments } from "react-icons/fa6";
import { TbLocationShare } from "react-icons/tb";
import { FaBookmark } from "react-icons/fa6";

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

  // Encontrar las historias con id 2 y 4
  const story1 = feedData.stories.find((story) => story.id === "2");
  const story2 = feedData.stories.find((story) => story.id === "4");

  return (
    <main className="bg-custom-gradient bg-cover bg-center bg-no-repeat max-w-md mx-auto shadow-lg rounded-lg overflow-hidden w-full flex flex-col items-center">
      <section className="flex flex-row items-center justify-between py-2 px-4 w-full">
        <img src={Logotipo} alt="Findy" />
        <div className="flex flex-row items-center gap-3 text-font-color-1">
          <FaRegHeart className="w-6 h-6 " />
          <FaRegComments className="w-6 h-6 " />
        </div>
      </section>
      <div className="flex flex-row items-center py-2 pl-4 gap-5 ">
        {feedData.stories && feedData.stories.length > 0 ? (
          feedData.stories.map((story, index) => (
            <div key={index} className="story flex flex-col justify-items-center">
              <img src={story.image2} alt={story.title} className=" mx-auto h-16 w-16 object-cover inline-block rounded-full p-[2.5px]  bg-gradient-to-r from-color-1 via-color-2 to-color-4 " />
              <p className="text-xs font-balsamiq my-1">{story.title}</p>
            </div>
          ))
        ) : (
          <p>No stories available</p>
        )}
      </div>
      <section className="w-11/12 flex flex-col gap-2">
        {feedData.posts && feedData.posts.length > 0 ? (
          feedData.posts.map((post, index) => (
            <article key={index} className="bg-color-5 rounded-lg" >
              <div className="users">
                {index === 0 && story1 && (
                  <div className="user-story flex flex-row items-center px-4 py-2 gap-2">
                    <img
                      src={story1.image2}
                      alt={story1.title}
                      className=" h-7 w-7 object-cover inline-block rounded-full p-[1.5px]  bg-gradient-to-r from-color-1 via-color-2 to-color-4"
                    />
                    <p className="font-balsamiq font-bold">{story1.title}</p>
                  </div>
                )}
                {index === 1 && story2 && (
                  <div className="user-story flex flex-row items-center px-4 py-2 gap-2">
                    <img
                      src={story2.image2}
                      alt={story2.title}
                      className=" h-7 w-7 object-cover inline-block rounded-full p-[2.5px]  bg-gradient-to-r from-color-1 via-color-2 to-color-4 "
                    />
                    <p className="font-balsamiq font-bold">{story2.title}</p>
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center">
                <img src={post.image} alt="" className=" rounded-lg w-96 h-96 object-cover" />
              </div>
              <div className="px-4 pt-4 pb-2">
                <div className="flex flex-row justify-between items-start">
                  <div className="flex flex-row items-center gap-3 text-font-color-1">
                    <div><FaRegHeart className="w-7 h-7 mb-1 " /><p className="text-[10px] font-balsamiq">{post.likes}</p></div>
                    <div><FaRegComment className="w-7 h-7 mb-1" /><p className="text-[10px] font-balsamiq">{post.commentsCount}</p></div>
                    <div><TbLocationShare className="w-7 h-7 mb-1" /><p className="text-[10px] font-balsamiq">{post.share}</p></div>
                  </div>
                  <div><FaBookmark className="text-color-1 w-5 h-6" /></div>
                </div>
                <p className="text-xs mb-2 mt-1"><span className="font-balsamiq font-bold text-base leading-4">{post.name} </span>{post.description}</p>
              </div>
            </article>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </section>
    </main>
  );
};

export default Feed;
