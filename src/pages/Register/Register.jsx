import { useState } from "react";
import { Formik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { createUser } from "../../services/userServices";

const passwordRegex =
  /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    password: false,
    repeatPassword: false,
  });

  const handleShowPassword = (name) => {
    setShowPassword({
      ...showPassword,
      [name]: !showPassword[name],
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-custom-gradient bg-cover bg-center bg-no-repeat ">
      <main className="flex flex-col justify-center items-center w-full max-w-xs space-y-6 mb-6">
        <figure className="flex justify-center items-center mb-2">
          <img
            src="https://i.ibb.co/7SnGfv2/LOGOLOGO-3.png"
            alt="Logo"
            className="object-cover h-10"
          />
        </figure>
        <h1 className="text-2xl font-bold text-center text-color-1 mb-6">
          Create account
        </h1>
        <Formik
          initialValues={{
            username: "",
            name: "",
            email: "",
            password: "",
            repeatPassword: "",
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string()
              .required("Por favor ingrese su nombre de usuario")
              .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
              .max(
                15,
                "El nombre de usuario no puede exceder los 15 caracteres"
              ),
            name: Yup.string()
              .required("Por favor ingrese su nombre completo")
              .max(20, "Su nombre no puede exceder los 20 caracteres")
              .min(10, "Su nombre no puede contener menos de 10 caracteres"),
            email: Yup.string()
              .required("Por favor ingrese su email")
              .email("Por favor ingrese un email válido"),
            password: Yup.string()
              .required("Por favor ingrese una contraseña")
              .matches(
                passwordRegex,
                "La contraseña al menos debe tener un dígito, una minúscula, una mayúscula y al menos un caracter no alfanumérico, debe contener más de 8 caracteres pero no exceder los 16 caracteres."
              )
              .oneOf(
                [Yup.ref("repeatPassword")],
                "La contraseña ingresada no coincide"
              ),
            repeatPassword: Yup.string()
              .required("Por favor confirme la contraseña")
              .matches(
                passwordRegex,
                "La contraseña al menos debe tener un dígito, una minúscula, una mayúscula y al menos un caracter no alfanumérico, debe contener más de 8 caracteres pero no exceder los 16 caracteres."
              )
              .oneOf(
                [Yup.ref("password")],
                "La contraseña ingresada no coincide"
              ),
          })}
          onSubmit={async (values) => {
            try {
              const newUser = await createUser(values);
              if (newUser) {
                Swal.fire({
                  title: "Your account has been created successfully",
                  icon: "success",
                  confirmButtonText: "Accept",
                  confirmButtonColor: "#FF7674",
                  color: "#2F2F2F",
                  width: "80%",
                  background:
                    "url(src/assets/Group 28.jpg) no-repeat center center",
                  customClass: {
                    popup: "rounded-lg p-6",
                    title: "font-balsamiq text-xl",
                    content: "text-base",
                  },
                  backdrop: `
                    rgba(0,0,0,0.4)
                      left top
                      no-repeat
                                  `,
                });
                navigate("/login");
              } else {
                Swal.fire({
                  title: "An error occurred while creating your account",
                  icon: "error",
                  confirmButtonText: "Accept",
                  confirmButtonColor: "#FF7674",
                  color: "#2F2F2F",
                  width: "30%",
                  background:
                    "url(src/assets/Group 28.jpg) no-repeat center center",
                  customClass: {
                    popup: "rounded-lg p-6",
                    title: "font-balsamiq text-xl",
                    content: "text-base",
                  },
                  backdrop: `
                    rgba(0,0,0,0.4)
                      left top
                      no-repeat
                                  `,
                });
              }
            } catch (error) {
              console.error("Error en el envío del formulario:", error);
              alert("Ha ocurrido un error al enviar el formulario.");
            }
          }}
        >
          {({ handleSubmit, getFieldProps, errors, touched }) => (
            <form
            className="flex flex-col p-8 rounded-lg shadow-lg w-full max-w-xs bg-opacity-90 border border-gray-300"
            onSubmit={handleSubmit}
          >      
            <div className="mb-2">
              <input
                type="text"
                placeholder="Full Name"
                {...getFieldProps("name")}
                className={`w-full p-3 border-2 rounded-lg ${
                  touched.name && errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {touched.name && errors.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div className="mb-2">
              <input
                type="text"
                placeholder="Username"
                {...getFieldProps("username")}
                className={`w-full p-3 border-2 rounded-lg ${
                  touched.username && errors.username
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {touched.username && errors.username && (
                <div className="text-red-500 text-sm mt-1">{errors.username}</div>
              )}
            </div>
        
            <div className="mb-2">
              <input
                type="email"
                placeholder="Email"
                {...getFieldProps("email")}
                className={`w-full p-3 border-2 rounded-lg ${
                  touched.email && errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>
        
            <div className="mb-2">
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  placeholder="Password"
                  {...getFieldProps("password")}
                  className={`w-full p-3 border-2 rounded-lg ${
                    touched.password && errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => handleShowPassword("password")}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword.password ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {touched.password && errors.password && (
                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
              )}
            </div>
        
            <div className="mb-2">
              <div className="relative">
                <input
                  type={showPassword.repeatPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...getFieldProps("repeatPassword")}
                  className={`w-full p-3 border-2 rounded-lg ${
                    touched.repeatPassword && errors.repeatPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => handleShowPassword("repeatPassword")}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword.repeatPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {touched.repeatPassword && errors.repeatPassword && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.repeatPassword}
                </div>
              )}
            </div>
        
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 p-2 bg-pink-400 text-white rounded mt-4 hover:bg-pink-500"
              >
                Register
              </button>
            </div>
          </form>
        )}
        </Formik>

        <p className="text-center font-color-1 mt-4 text-sm sm:text-base">
          ¿Already have an account?
          <Link to="/login" className="ml-2 text-pink-500 hover:underline">
            Login
          </Link>
          .
        </p>
      </main>
    </div>
  );
};

export default Register;
