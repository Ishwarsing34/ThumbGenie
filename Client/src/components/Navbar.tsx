import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Navbar() {

    const {
        isLoggedIn,
        user,
        logout
    } = useAuth()
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            <motion.nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <Link to='/'>
                    {/* <img className="h-8.5 w-auto" src="src/assets/logo.svg" alt="logo" width={130} height={34} /> */}
                    <svg
                        width="180"
                        height="36"
                        viewBox="0 0 180 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >

                        <g transform="translate(0,4)">

                            <path
                                d="M14 2L26 22H2L14 2Z"
                                fill="white"
                            />

                            <circle cx="14" cy="26" r="2" fill="#EC4899" />
                        </g>


                        <text
                            x="38"
                            y="25"
                            fill="white"
                            font-size="20"
                            font-weight="600"
                            font-family="Inter, system-ui, -apple-system, sans-serif"
                            letter-spacing="0.3"
                        >
                            Thum<tspan fill="#EC4899">Genie</tspan>
                        </text>
                    </svg>

                </Link>

                <div className="hidden md:flex items-center gap-8 transition duration-500">
                    <Link to='/' className="hover:text-pink-500 transition" >Home</Link>
                    <Link to='/generate' className="hover:text-pink-500 transition" >Generate</Link>
                    {
                        isLoggedIn ?
                            <Link to='/my-generation' className="hover:text-pink-500 transition" >My Generation</Link>
                            :
                            <Link to='#' className="hover:text-pink-500 transition" >About</Link>
                    }
                    <Link to='#' className="hover:text-pink-500 transition" >Contact</Link>


                </div>

                <div className="flex items-center gap-2">
                    {
                        isLoggedIn ? (
                            <div className="relative group">
                                <button className="rounded-full size-8 bg-white/20 border-2 
                             border-white/10">
                                    {user?.name.charAt(0).toUpperCase()}
                                </button>
                                <div className="absolute hidden group-hover:block top-6 right-0 pt-4">
                                    <button
                                        onClick={() => {
                                            navigate('/');
                                            logout();
                                        }}

                                        className="bg-white/20 border-2 border-white/20 px-5 py-1.5 rounded"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>

                        ) : (
                            <button onClick={() => navigate('/login')}
                                className="hidden md:block px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all rounded-full">
                                Get Started
                            </button>

                        )
                    }
                    <button onClick={() => setIsOpen(true)} className="md:hidden">
                        <MenuIcon size={26} className="active:scale-90 transition" />
                    </button>
                </div>



            </motion.nav>

            <div className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <Link onClick={() => setIsOpen(false)} to='/'>Home</Link>
                <Link onClick={() => setIsOpen(false)} to='/generate'  >Generate</Link>

                {
                    isLoggedIn
                        ? <Link onClick={() => setIsOpen(false)} to='/my-generation'>My Generation</Link>
                        : <Link onClick={() => setIsOpen(false)} to='#'>About</Link>
                }
                <Link onClick={() => setIsOpen(false)} to='#'  >Contact Us</Link>
                {
                    isLoggedIn
                        ? <Link onClick={() => { setIsOpen(false); logout(); }} to='/login'  >Login</Link>
                        : <Link

                            to='/login'
                        >LogIn</Link>
                }
                <button onClick={() => setIsOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white rounded-md flex">
                    <XIcon />
                </button>
            </div>
        </>
    );
}