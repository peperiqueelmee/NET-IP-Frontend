import { useState } from "react";
import { Link } from "react-router-dom";
import { FiPhoneCall, FiPhoneOff } from "react-icons/fi";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { BsQuestionCircle } from "react-icons/bs";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiCellphoneFill } from "react-icons/ri";
import { UserFill } from "../assets/icons";
import { IoIosHelpBuoy } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("Números Activos");
    const [selectedIndex, setSelectedIndex] = useState(0);

    const categories = [
        {
            name: "Números Activos",
            icon: <FiPhoneCall className={`text-5xl ${selectedIndex === 0 ? "text-white" : "text-zinc-800"}`} />,
        },
        {
            name: "Números Bloqueados",
            icon: <FiPhoneOff className={`text-5xl ${selectedIndex === 1 ? "text-white" : "text-zinc-800"}`} />,
        },
        {
            name: "Gestión Troncales Telefónicos",
            icon: (
                <MdOutlineManageAccounts
                    className={`text-5xl ${selectedIndex === 2 ? "text-white" : "text-zinc-800"}`}
                />
            ),
        },
        {
            name: "Intercomunicador",
            icon: <RiCellphoneFill className={`text-5xl ${selectedIndex === 3 ? "text-white" : "text-zinc-800"}`} />,
        },
        {
            name: "Multi Call Ringing",
            icon: <HiOutlineChatAlt2 className={`text-5xl ${selectedIndex === 4 ? "text-white" : "text-zinc-800"}`} />,
        },
        {
            name: "Log",
            icon: <BsQuestionCircle className={`text-5xl ${selectedIndex === 5 ? "text-white" : "text-zinc-800"}`} />,
        },
    ];

    const categoriesResponsive = [
        {
            name: "Números Activos",
            icon: <FiPhoneCall className={`text-xl ${selectedIndex === 0 ? "text-white" : "text-zinc-800"}`} />,
        },
        {
            name: "Números Bloqueados",
            icon: <FiPhoneOff className={`text-xl ${selectedIndex === 1 ? "text-white" : "text-zinc-800"}`} />,
        },
        {
            name: "Gestión Troncales",
            icon: (
                <MdOutlineManageAccounts
                    className={`text-xl ${selectedIndex === 2 ? "text-white" : "text-zinc-800"}`}
                />
            ),
        },
        {
            name: "Intercomunicador",
            icon: <RiCellphoneFill className={`text-xl ${selectedIndex === 3 ? "text-white" : "text-zinc-800"}`} />,
        },
        {
            name: "Multi Call Ringing",
            icon: <HiOutlineChatAlt2 className={`text-xl ${selectedIndex === 4 ? "text-white" : "text-zinc-800"}`} />,
        },
        {
            name: "Log",
            icon: <BsQuestionCircle className={`text-xl ${selectedIndex === 5 ? "text-white" : "text-zinc-800"}`} />,
        },
    ];

    const handleCategorySelect = (category, index = null) => {
        setSelectedCategory(category);
        setSelectedIndex(index);
    };

    return (
        <div className="h-screen home-page">
            <div className="container mx-auto px-10">
                <div className="flex items-center justify-between pt-10 flex-col md:flex-row">
                    <p className="text-white font-semibold tracking-wider text-sm md:text-2xl xl:text-3xl text-shadow">
                        Sistema de Gestión de Anexos <span className="text-lime-400">NET</span>{" "}
                        <span className="text-slate-900">IP</span>
                    </p>

                    {/* Username, help, sing off */}
                    <div className="sm:flex gap-3 flex-row md:flex-col lg:flex-row mt-6 md:mt-0 hidden">
                        <div className="border-2 border-lime-500 px-3 py-1 rounded-lg text-white bg-gradient-to-r from-zinc-600 to-zinc-700 cursor-pointer text-xs md:text-sm tracking-wide shadow-md hover:bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-800">
                            <div className="flex items-center gap-1">
                                <UserFill className="text-sm md:text-lg text-lime-400" />
                                <span>nombre@Usuario</span>
                            </div>
                        </div>
                        <div className="border-2 border-lime-500 px-3 py-1 rounded-lg text-white bg-gradient-to-r from-zinc-600 to-zinc-700 cursor-pointer text-xs md:text-sm tracking-wide shadow-md hover:bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-800">
                            <div className="flex items-center gap-1">
                                <IoIosHelpBuoy className="text-sm md:text-lg text-lime-400" />
                                Ayuda
                            </div>
                        </div>
                        <div className="border-2 border-lime-500 px-3 py-1 rounded-lg text-white bg-gradient-to-r from-zinc-600 to-zinc-700 cursor-pointer text-xs md:text-sm tracking-wide shadow-md hover:bg-gradient-to-r hover:from-zinc-700 hover:to-zinc-800">
                            <Link to="/" className="flex items-center gap-1">
                                <GiExitDoor className="text-sm md:text-lg text-lime-400" />
                                Cerrar Sesión
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block bg-white py-4 px-2 mt-10 w-full border-2 border-t-lime-500 border-l-lime-500 border-r-lime-500">
                    {/* Categories */}
                    <div className="ml-10 flex flex-wrap gap-8 justify-start">
                        {categories.map(({ name, icon }, index) => (
                            <div
                                id={name}
                                key={name}
                                className={`shadow-md cursor-pointer bg-zinc-50 rounded w-40 transition duration-300 ease-in-out
                               ${
                                   selectedCategory === name
                                       ? "shadow-lime-600 shadow-lg border border-lime-600"
                                       : "hover:shadow-md hover:shadow-lime-200"
                               }`}
                                onClick={() => handleCategorySelect(name, index)}
                            >
                                <div
                                    className={`${
                                        selectedCategory === name
                                            ? "bg-gradient-to-r from-lime-500 to-lime-600"
                                            : "bg-zinc-50"
                                    } flex flex-col items-center`}
                                >
                                    <div className="py-3">{icon}</div>

                                    <div className={`text-center text-gray-500 tracking-tight h-16`}>
                                        <div className="h-full flex items-center">
                                            {name.split(" ").length === 2 ? (
                                                <div className="flex flex-col leading-none">
                                                    {name.split(" ").map((word, index) => (
                                                        <span
                                                            key={index}
                                                            className={`font-medium tracking tracking-tighter ${
                                                                selectedCategory === name ? "text-white" : "text-black"
                                                            } ${index > 0 ? "mt-2" : ""}`}
                                                        >
                                                            {word}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span
                                                    className={`font-medium tracking tracking-tighter ${
                                                        selectedCategory === name ? "text-white" : "text-black"
                                                    }`}
                                                >
                                                    {name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* categories responsive */}
            <div className="flex lg:hidden h-2/3 items-center">
                <div className="flex flex-col mt-10">
                    {categoriesResponsive.map(({ name, icon }, index) => (
                        <div
                            id={name}
                            key={name}
                            className={`shadow-md cursor-pointer bg-zinc-50 transition duration-300 ease-in-out
                               ${selectedCategory === name ? "shadow-lime-600 border border-lime-600" : ""}`}
                            onClick={() => handleCategorySelect(name, index)}
                        >
                            <div
                                className={`${
                                    selectedCategory === name
                                        ? "bg-gradient-to-r from-lime-500 to-lime-600"
                                        : "bg-zinc-50"
                                } flex items-center gap-2 px-4`}
                            >
                                <div className="py-3">{icon}</div>
                                <span
                                    className={`hidden md:block text-sm font-medium ${
                                        selectedCategory === name ? "text-white" : "text-zinc-800"
                                    } `}
                                >
                                    {name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Responsive buttons */}
            <div className="block sm:hidden fixed inset-x-0 bottom-0 z-40 bg-gradient-to-r from-lime-600 to-green-600 rounded-t-full px-10 shadow-inner w-full md:hidden">
                <div className="flex justify-between items-center h-12">
                    <div className="flex flex-col justify-center items-center">
                        <UserFill className="text-base  text-white" />
                        <span className="text-xs text-slate-200">nombre@usuario</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <IoIosHelpBuoy className="text-base  text-white" />
                        <span className="text-xs text-slate-200">Ayuda</span>
                    </div>
                    <Link to="/" className="flex flex-col justify-center items-center">
                        <GiExitDoor className="text-base text-white" />
                        <span className="text-xs text-slate-200">Cerrar Sesión</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
