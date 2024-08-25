import { useState, useEffect } from "react";
import { getProfile } from "../../services/findyServices";
import { RiArrowLeftWideLine } from "react-icons/ri";
import { HiEllipsisHorizontal } from "react-icons/hi2";



const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect (() => {
    const fetchProfileData = async () => {
      const data = await getProfile();
      setProfileData(data);
    };
    fetchProfileData();
  }, []);

  if (!profileData) {
    return <p>Loading...</p>;
  }

  return (
    <main className="custom-gradient max-w-md mx-auto shadow-lg rounded-lg overflow-hidden w-full"
    // style={{
    //   width: "100%",   // Equivalente a w-full
    //   background: "linear-gradient(to bottom left, #FF7674 1%, #FEE9D7 60%,#FFBC74)",
    // }}
    >
      {/* Header with the image */}
      <header className="relative">
        <img 
          className="w-full h-48 object-cover"
          src={profileData.backgroundImageUrl} 
          alt="Profile Background" 
        />

        <RiArrowLeftWideLine className="absolute top-6 left-6 text-2xl" style={{ strokeWidth: 0.5 }}  />
        <HiEllipsisHorizontal className="absolute top-6 right-7 text-2xl" style={{ strokeWidth: 0.5 }} />

        <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
          <img 
            className="mx-auto h-24 w-24 rounded-full border-4 object-cover"
            src={profileData.profileImageUrl} 
            alt="Profile" 
          />
        </div>
      </header>

      {/* Profile Information */}
      <section className="font-balsamiq text-center mt-16">
        <h2 className="text-xl font-semibold">{profileData.name}</h2>
        <p className="text-gray-500">{profileData.bio}</p>
        <p className="text-gray-500">{profileData.description}</p>
      </section>

      {/* Followers and Likes */}
      <section className="font-balsamiq flex justify-around gap-[7.5rem] relative bottom-36">
        <div className="text-center">
          <p className="text-lg font-semibold">{profileData.followers}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">{profileData.likes}</p>
          <p className="text-gray-500">Likes</p>
        </div>
      </section>

      {/* Follow and Messages Bottons */}
      <section className="font-balsamiq flex justify-around mt-4">
        <button className="bg-color-1 text-white font-bold py-2 px-16 rounded-xl">Follow</button>
        <button className="bg-color-1 text-white font-bold py-2 px-16 rounded-xl">Message</button>
      </section>

      {/* Tab Section */}
      <section className="font-balsamiq bg-color-5 rounded-3xl">
        <div className="flex justify-around mt-6">
          <button className="text-font-color-2 font-semibold py-2 border-b-2 border-color-1">Photos</button>
          <button className="text-font-color-2 py-2">Videos</button>
          <button className="text-font-color-2 py-2">Album</button>
          <button className="text-font-color-2 py-2">Tab</button>
        </div>

        {/* Photos Gallery */}
        <div className="grid grid-cols-2 gap-2 p-4">
          {profileData.photos.map((photoObj, index) => {
            {/* Extract the URL of the object photo */}
            const photoUrl = Object.values(photoObj)[0];

            {/* Styling image */}
            let customClasses = "";
            let imgClasses = "w-full h-full object-cover";

            switch(index) {
              case 0:
                customClasses = "w-[190px] h-[190px] ";
                break;
              case 1:
                customClasses = "w-[190px] h-[213px]";
                break;
              case 2:
                customClasses = "w-[190px] h-[198px]";
                break;
              case 3:
                customClasses = "w-[190px] h-[204px]";
                break;
              case 4:
                customClasses = "w-[190px] h-[216px]";
                break;
              case 5:
                customClasses = "w-[190px] h-[216px]";
                break;
              default:
                customClasses = "";
            }

            if (index === 1) {
              imgClasses += " object-[top]";
            } else if (index === 3) {
              imgClasses += " object-[top]";
            } else if (index === 4) {
              imgClasses += " object-[top]";
            }

            return (
              <div key={index} className={`overflow-hidden rounded-3xl ${customClasses}`}>
                <img
                  className={imgClasses}
                  src={photoUrl}
                  alt={`Photo ${index + 1}`}
                />
              </div>

            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Profile;






