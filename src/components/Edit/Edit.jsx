import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useProfile } from "../../context/AppContext"; // Importar el hook personalizado

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  bio: Yup.string().required('La biografía es requerida'),
  description: Yup.string().required('La descripción es requerida'),
  profileImageUrl: Yup.string().required('La imagen de perfil es requerida'),
  backgroundImageUrl: Yup.string().required('La imagen de fondo es requerida'),
});

const EditProfileModal = ({ isOpen, onClose }) => {
  const { profileData, dispatch } = useProfile(); // Utiliza el contexto
  const [profileImagePreview, setProfileImagePreview] = useState(profileData.profileImageUrl);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState(profileData.backgroundImageUrl);

  useEffect(() => {
    setProfileImagePreview(profileData.profileImageUrl);
    setBackgroundImagePreview(profileData.backgroundImageUrl);
  }, [profileData.profileImageUrl, profileData.backgroundImageUrl]);

  if (!isOpen) return null;

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      ...profileData,
      ...values,
    };

    try {
      const response = await axios.put('https://minibackend-findy-3039.onrender.com/profile', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      dispatch({ type: 'UPDATE_PROFILE', payload: response.data }); // Actualiza el contexto
      alert('Perfil actualizado con éxito');
      onClose();
    } catch (error) {
      console.error('Error actualizando el perfil', error);
      alert('Hubo un error al actualizar el perfil');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="modal-content p-10 rounded-lg shadow-lg bg-white">
        <button onClick={onClose} className="modal-close-button">X</button>
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
        <Formik
          initialValues={profileData}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-sm font-medium">Nombre</label>
                <Field type="text" name="name" className="input" />
                <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Biografía</label>
                <Field type="text" name="bio" className="input" />
                <ErrorMessage name="bio" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Descripción</label>
                <Field type="text" name="description" className="input" />
                <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Imagen de Perfil</label>
                <Field
                  type="text"
                  name="profileImageUrl"
                  className="input"
                  placeholder="Introduce la URL de la imagen de perfil"
                  onChange={(e) => {
                    setFieldValue("profileImageUrl", e.target.value);
                    setProfileImagePreview(e.target.value); // Actualizar preview
                  }}
                />
                <ErrorMessage name="profileImageUrl" component="div" className="text-red-600 text-sm" />
                <img
                  src={profileImagePreview}
                  alt="Preview"
                  className={`mt-2 h-20 w-20 rounded-full ${!profileImagePreview ? 'hidden' : ''}`}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Imagen de Fondo</label>
                <Field
                  type="text"
                  name="backgroundImageUrl"
                  className="input"
                  placeholder="Introduce la URL de la imagen de fondo"
                  onChange={(e) => {
                    setFieldValue("backgroundImageUrl", e.target.value);
                    setBackgroundImagePreview(e.target.value); // Actualizar preview
                  }}
                />
                <ErrorMessage name="backgroundImageUrl" component="div" className="text-red-600 text-sm" />
                <img
                  src={backgroundImagePreview}
                  alt="Preview"
                  className={`mt-2 h-20 w-full object-cover ${!backgroundImagePreview ? 'hidden' : ''}`}
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Actualizando...' : 'Guardar Cambios'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfileModal;
