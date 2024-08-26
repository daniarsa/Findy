import { useState, useEffect } from "react";
import { getFeed } from "../../services/findyServices";


const Feed = () => {
  const [feedData, setFeedData] = useState(null);

  useEffect (() => {
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
    <div>Feed</div>
  )
}

export default Feed