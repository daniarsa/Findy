import { Formik } from "formik";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import fileUpload from "../../services/fileUpload";

const Modal = ({ onClose }) => {
  const { addPosts } = useContext(AppContext);

  const initialValues = {
    image: null,
    description: "",
  };

  const onSubmit = async (values) => {
    if (values.image) {
      const photo = await fileUpload(values.image);
      values.image = photo ? photo : "";
    }
    values.likes = 0;
    values.commentsCount = 0;
    values.share = 0;

    addPosts(values);
    onClose(); // Cerrar el modal después de enviar
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg w-3/4">
        <section className="flex justify-between items-center">
          <h2>Agregar publicación</h2>
          <button className="cerrar" onClick={onClose}>X</button>
        </section>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit, getFieldProps, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue("image", file);
                }}
              />
              <input
                type="text"
                placeholder="Descripción de la publicación"
                {...getFieldProps("description")}
              />
              <button type="submit">Agregar publicación</button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
