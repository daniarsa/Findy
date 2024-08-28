import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  bio: Yup.string().required('La biografía es requerida'),
  description: Yup.string().required('La descripción es requerida'),
  profileImageUrl: Yup.mixed().required('La imagen de perfil es requerida'),
  backgroundImageUrl: Yup.mixed().required('La imagen de fondo es requerida'),
});

const EditProfileModal = ({ isOpen, onClose, initialProfileData, onUpdateProfile }) => {
  if (!isOpen) return null;

  const [profileImagePreview, setProfileImagePreview] = useState(initialProfileData.profileImageUrl);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState(initialProfileData.backgroundImageUrl);

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      ...values,
      profileImageUrl: values.profileImageUrl || '', // Asegúrate de incluir una URL válida
      backgroundImageUrl: values.backgroundImageUrl || '', // Asegúrate de incluir una URL válida
    };

    try {
      const response = await axios.put('https://testing-findy.onrender.com/profile', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      onUpdateProfile(response.data);
      alert('Perfil actualizado con éxito');
      onClose();
    } catch (error) {
      console.error('Error actualizando el perfil', error);
      alert('Hubo un error al actualizar el perfil');
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e, setFieldValue, setImagePreview) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue(e.target.name, URL.createObjectURL(file));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="modal-content p-10 rounded-lg shadow-lg bg-white">
        <button onClick={onClose} className="modal-close-button">X</button>
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
        <Formik
          initialValues={initialProfileData}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
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
