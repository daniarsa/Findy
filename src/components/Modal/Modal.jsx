import { Formik } from "formik"
import PropTypes from "prop-types"
import { FaFileUpload } from "react-icons/fa"

const Modal = ([posts = null, onSubmit]) => {

    const initialValues = {
        image: null,
        description: posts ? posts.description : "",
    }

    return (
        <div>
            <div>
                <section>
                    <h2>Agregar publicación</h2>
                    <button>X</button>
                </section>
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values) => {
                        if (values.image) {
                            const photo = await FaFileUpload(values.image);
                            values.image = photo ? photo : "";
                        }
                        (values.likes = 0);
                        (values.commentsCount = 0);
                        (values.share = 0);
                        onSubmit(values);
                    }}
                >
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
                                placeholder="Descripción de la publicación" {...getFieldProps("description")} />
                            <button type="submit">{posts ? "Actualizar" : "Agregar publicación"}</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

Modal.propTypes = {
    posts: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
}

export default Modal