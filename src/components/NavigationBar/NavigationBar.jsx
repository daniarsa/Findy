import { TiHome } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineAdd } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import perfil from "../../assets/perfil.png"

const NavigationBar = () => {
  return (
    <nav className="w-full" >
      <ul className="flex flex-row gap-4 bg-color-1 justify-around py-3 text-color-5 ">
        <li><a href="#"><TiHome className="h-6 w-6 " /></a></li>
        <li><a href="#"><IoIosSearch className="h-6 w-6 " /></a></li>
        <li><button><a href="#"><MdOutlineAdd className="h-6 w-6" /></a></button></li>
        <li><a href="#"><IoIosNotifications className="h-6 w-6" /></a></li>
        <li><a href="#"><img src={perfil} alt="" className="h-7 w-7 object-cover inline-block rounded-full" /></a></li>
      </ul>
    </nav>
  )
}

export default NavigationBar