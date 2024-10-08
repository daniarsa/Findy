import { useState, useEffect } from "react";
import { getProfile } from "../../services/findyServices";
import { RiArrowLeftWideLine } from "react-icons/ri";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import EditProfileModal from "../../components/Edit/Edit"
import { useProfile } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // const [profileData, setProfileData] = useState(null);
  const {profileData, profileDispatch} = useProfile(); //Access to status and dispatch from context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Photos");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getProfile();
      profileDispatch({ type: 'UPDATE_PROFILE', payload: data }); // Use profileDispatch to update the global state
    };
    fetchProfileData();
  }, [profileDispatch]);

  if (!profileData) {
    return <p>Loading...</p>;
  }

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePhotoClick = (id) => {
    navigate(`/details/${id}`);
  };

  
   // Función para renderizar el contenido basado en la sección activa
   const renderContent = () => {
    if (activeSection === "Photos") {
      if (!profileData.photos || profileData.photos.length === 0) {
        return <div>No photos available</div>;
      }

      return (
        <div className="grid grid-cols-2 gap-2 p-4">
          {profileData.photos.map((photoObj, index) => {
            // const { id, imageUrl } = photoObj;
            const photoId = photoObj.id;
            const photoUrl = photoObj.imageUrl;
            let customClasses = "";
            let imgClasses = "w-full h-full object-cover";

            switch(index) {
              case 0:
                customClasses = "w-[190px] h-[190px]";
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

            if (index === 1 || index === 3 || index === 4) {
              imgClasses += " object-[top]";
            }

            return (
              <div key={photoId} className={`overflow-hidden rounded-3xl cursor-pointer ${customClasses}`}>
                <img
                  className={imgClasses}
                  src={photoUrl}
                  alt={`Photo ${index + 1}`}
                  onClick={() => handlePhotoClick(photoId)}
                />
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div className="text-center p-4">No content to display</div>;
    }
  };
  
  



  return (
    <main className="bg-custom-gradient bg-cover bg-center bg-no-repeat max-w-md mx-auto shadow-lg rounded-lg overflow-hidden w-full">
      {/* Header with the image */}
      <header className="relative">
        <img 
          className="w-full h-48 object-cover"
          src={profileData.backgroundImageUrl} 
          alt="Profile Background" 
        />

        <RiArrowLeftWideLine className="absolute top-6 left-6 text-2xl cursor-pointer" style={{ strokeWidth: 0.5 }} onClick={() => navigate("/")} />
        <HiEllipsisHorizontal 
          className="absolute top-6 right-7 text-2xl cursor-pointer" 
          style={{ strokeWidth: 0.5 }} 
          onClick={openModal} // Abre el modal al hacer clic
        />

        <div className="relative inline-block rounded-full p-[2.5px] bg-gradient-to-r from-color-1 via-color-2 to-color-4 transform translate-y-1/2 absolute left-1/2 bottom-20 -translate-x-1/2">
          <img 
            className="h-24 w-24 rounded-full object-cover mx-auto" 
            src={profileData.profileImageUrl} 
            alt="Profile" 
          />
        </div>
      </header>

      {/* Profile Information */}
      <section className="font-balsamiq text-center mt-[-1rem]">
        <h2 className="text-xl font-semibold">{profileData.name}</h2>
        <p className="text-gray-500">{profileData.bio}</p>
        <p className="text-gray-500">{profileData.description}</p>
      </section>

      {/* Followers and Likes */}
      <section className="font-balsamiq flex justify-around gap-[7.5rem] relative bottom-40">
        <div className="text-center">
          <p className="text-lg font-semibold">{profileData.followers}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">{profileData.likes}</p>
          <p className="text-gray-500">Likes</p>
        </div>
      </section>

      {/* Follow and Messages Buttons */}
      <section className="font-balsamiq flex justify-around mt-[-2rem]">
        <button className="bg-color-1 text-white font-bold py-2 px-16 rounded-xl">Follow</button>
        <button className="bg-color-1 text-white font-bold py-2 px-16 rounded-xl">Message</button>
      </section>

      {/* Tab Section */}
      <section className="font-balsamiq bg-color-5 rounded-3xl">
        <div className="flex justify-around mt-6">
          <button 
            className={`text-font-color-2 py-2 ${activeSection === "Photos" ? "font-semibold border-b-2 border-color-1" : ""}`}
            onClick={() => setActiveSection("Photos")}
          >
            Photos
          </button>
          <button 
            className={`text-font-color-2 py-2 ${activeSection === "Videos" ? "font-semibold border-b-2 border-color-1" : ""}`}
            onClick={() => setActiveSection("Videos")}
          >
            Videos
          </button>
          <button 
            className={`text-font-color-2 py-2 ${activeSection === "Album" ? "font-semibold border-b-2 border-color-1" : ""}`}
            onClick={() => setActiveSection("Album")}
          >
            Album
          </button>
          <button 
            className={`text-font-color-2 py-2 ${activeSection === "Tag" ? "font-semibold border-b-2 border-color-1" : ""}`}
            onClick={() => setActiveSection("Tag")}
          >
            Tag
          </button>
        </div>

        {/* Content based on active section */}
        {renderContent()}
      </section>

      {/* Modal para editar perfil */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  );
};

export default Profile;
