import { TiHome } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineAdd } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import perfil from "../../assets/perfil.png";

const NavigationBar = () => {
  return (
    <nav className="w-full fixed-bottom max-w-md mx-auto shadow-lg  bg-color-1">
      <ul className="flex flex-row justify-around items-center py-3 relative">
        {/* Botón central flotante */}
        <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2">
          <button className="bg-color-4 text-color-5 p-3 rounded-full shadow-md">
            <MdOutlineAdd className="h-10 w-10" />
          </button>
        </div>

        {/* Íconos en la barra de navegación */}
        <li><a href="#"><TiHome className="h-6 w-6 text-color-5" /></a></li>
        <li><a href="#"><IoIosSearch className="h-6 w-6 text-color-5" /></a></li>
        <li className="invisible"><a href="#"></a></li> {/* Espacio para el botón central */}
        <li><a href="#"><IoIosNotifications className="h-6 w-6 text-color-5" /></a></li>
        <li><a href="#"><img src={perfil} alt="" className="h-7 w-7 object-cover rounded-full" /></a></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
