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

export const getStories = async () => {
    try {
        const response = await axios.get(endpoints.stories);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getPosts = async () => {
    try {
        const response = await axios.get(endpoints.posts);
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
        
        const response = await axios.get(endpoints.profile);
        const profile = response.data;

        
        const photoIndex = profile.photos.findIndex(photo => photo.id === id);
        if (photoIndex === -1) {
            console.error('Photo not found');
            return null;
        }

        
        profile.photos[photoIndex].comments = updatedComments;

        
        const updateResponse = await axios.put(endpoints.profile, profile);
        
        
        if (updateResponse.status === 200) {
            console.log('Update successful:', updateResponse.data);
            return updateResponse.data;
        } else {
            console.error('Failed to update profile:', updateResponse.status);
            return null;
        }
    } catch (error) {
        console.error('Error updating comments:', error);
        return null;
    }
};
