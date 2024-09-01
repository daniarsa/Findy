import endpoints from "../config";
import axios from "axios";

export const getFeed = async () => {
    try {
        const response = await axios.get(endpoints.feed);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getProfile = async () => {
    try {
        const response = await axios.get(endpoints.profile);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const getImageDetail = async (id) => {
    try {
        const response = await axios.get(`${endpoints.profile}`);
        const profile = response.data.profile;
        console.log('Profile data:', profile); // Agrega esta línea para verificar los datos recibidos
        if (profile && profile.photos) {
            const imageDetail = profile.photos.find(photo => photo.id === id);
            if (imageDetail) {
                return imageDetail;
            } else {
                console.error('Image not found');
                return null;
            }
        } else {
            console.error('Profile or photos data is missing');
            return null;
        }
    } catch (error) {
        console.error('Error fetching image details:', error);
        return null;
    }
};
  

export const updateProfilePhotoComments = async (id, updatedComments) => {
    try {
      // Primero, obtienes el perfil completo
      const response = await axios.get(endpoints.profile);
      const profile = response.data;
  
      // Encuentras la foto correspondiente y actualizas los comentarios
      const photoIndex = profile.photos.findIndex(photo => photo.id === id);
      if (photoIndex === -1) {
        console.error('Photo not found');
        return null;
      }
      
      profile.photos[photoIndex].comments = updatedComments;
  
      // Ahora, haces un PUT para actualizar todo el perfil (incluyendo la foto con los nuevos comentarios)
      const updateResponse = await axios.put(endpoints.profile, profile);
      console.log('Update response:', updateResponse.data);
      return updateResponse.data;
    } catch (error) {
      console.error('Error updating comments:', error);
      return null;
    }
  };
  