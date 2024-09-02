import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { login } from "../../services/userServices";
import useAppContext from "../../hooks/useAppContext";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { userDispatch } = useAppContext();

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      identifier: Yup.string().required("Este campo es requerido"),
      password: Yup.string().required("Este campo es requerido"),
    }),
    onSubmit: async (values) => {

      const loggedUser = await login(values);

      if (loggedUser) {
        userDispatch({
          type: "LOGIN",
          payload: loggedUser,
        });

        Swal.fire({
          title: "¡Hello!",
          text: `${loggedUser.name}, Welcome back.`,
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

        navigate("/Feed");
      } else {
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error en el inicio de sesión, por favor verifique sus datos.",
          icon: "error",
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
      }
    },
  });

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 bg-custom-gradient bg-cover bg-center bg-no-repeat">
      <main className="flex flex-col justify-center items-center w-full max-w-xs space-y-6 mb-6 ">
        <figure className="flex justify-center items-center mb-2">
          <img
            src="https://i.ibb.co/7SnGfv2/LOGOLOGO-3.png"
            alt="Logo"
            className="object-cover h-12"
          />
        </figure>
        <form
          className="flex flex-col p-8 rounded-lg shadow-lg w-full max-w-xs bg-opacity-90 border border-gray-300"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-4">
          <input
            className={
              formik.touched.identifier && formik.errors.identifier
                ? "w-full p-3 border-2 rounded-lg border-red-500"
                : "w-full p-3 border-2 rounded-lg border-gray-300"
            }
            type="text"
            id="identifier"
            name="identifier"
            {...formik.getFieldProps("identifier")}
            placeholder="User or Email"
          />
          {formik.touched.identifier && formik.errors.identifier ? (
            <span className="text-red-400 mb-4">
              {formik.errors.identifier}
            </span>
          ) : null}
          </div>

          <div className="flex relative items-center mb-4">
            <input
              className={
                formik.touched.password && formik.errors.password
                  ? "w-full p-3 border-2 rounded-lg border-red-500"
                  : "w-full p-3 border-2 rounded-lg border-gray-300"
              }
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              {...formik.getFieldProps("password")}
              placeholder="Password"
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              type="button"
              onClick={handleShowPassword}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <span className="text-red-400 mb-4">{formik.errors.password}</span>
          ) : null}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 p-2 bg-pink-400 text-white rounded mt-4 hover:bg-pink-500"
            >
              Login
            </button>
          </div>
        </form>
        <p>
          ¿Don't have an account?
          <Link className="ml-2 text-pink-500 hover:underline" to={"/register"}>
            Register
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Login;
