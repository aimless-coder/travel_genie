import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { googleLogout } from "@react-oauth/google";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="h-full">
      <header className="fixed top-0 left-0 w-full bg-white z-20 shadow-md h-[70px]">
        <div className="h-full py-2 px-5 md:px-20 flex justify-between items-center">
          <img src="/images/logo.png" alt="logo" className="h-[45px] md:h-[55px] transition-all duration-300" />
          <div className="flex gap-4 justify-end items-center">
            <div className="gap-4 hidden md:flex items-center">
              <h2 className="text-lg font-semibold text-gray-700">{user.given_name}</h2>
              <img 
                src={user?.picture} 
                alt="" 
                className="h-[40px] w-[40px] rounded-full border-2 border-[#4b164c] shadow-sm hover:shadow-md transition-all duration-300" 
              />
            </div>
            <button 
              onClick={toggleMenu} 
              className="p-2 md:hidden hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <svg 
                className="w-6 h-6 text-gray-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 h-screen pt-[70px]">
        <div className={`
          fixed md:relative
          top-[70px] md:top-0
          w-full md:w-[280px] h-[calc(100vh-70px)]
          bg-white
          transition-all duration-300 ease-in-out
          md:transform-none
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col
          border-r-2 border-gray-200
          z-10 md:z-0
          shadow-lg md:shadow-none
        `}>
          <div className="flex-1 overflow-y-auto">
            <Link to="/dashboard/my-profile" onClick={() => setIsMenuOpen(false)}>
              <div className="hover:bg-[#dd88cf86] border-l-8 border-transparent hover:border-[#4b164c] transition-all duration-200">
                <h2 className="py-4 px-8 font-medium text-gray-700 hover:text-[#4b164c]">My Profile</h2>
              </div>
            </Link>

            <Link to="/dashboard/create-trip" onClick={() => setIsMenuOpen(false)}>
            <div className="hover:bg-[#dd88cf86] border-l-8 border-transparent hover:border-[#4b164c] transition-all duration-200">
                <h2 className="py-4 px-8 font-medium text-gray-700 hover:text-[#4b164c]">Create Trip</h2>
              </div>
            </Link>

            <Link to="/dashboard/my-trips" onClick={() => setIsMenuOpen(false)}>
            <div className="hover:bg-[#dd88cf86] border-l-8 border-transparent hover:border-[#4b164c] transition-all duration-200">
                <h2 className="py-4 px-8 font-medium text-gray-700 hover:text-[#4b164c]">My Trips</h2>
              </div>
            </Link>
          </div>

          <div>
            <div className="flex items-center justify-between py-4 px-8 font-medium md:hidden">
            <h2 className="text-lg font-semibold text-gray-700">{user?.given_name}</h2>
              <img 
                src={user?.picture} 
                alt="" 
                className="h-[30px] w-[30px] rounded-full border-2 border-[#4b164c]" 
              />
            </div>

          <div 
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
            className="border-t border-gray-200 hover:bg-[#4b164c] cursor-pointer transition-all duration-200"
          >
            <h2 className="py-4 px-8 font-medium text-red-600 hover:text-white">Logout</h2>
          </div>
          </div>

        </div>

        <div className="flex-1 w-full md:w-[calc(100vw-280px)]">
          <div className="h-full overflow-y-auto">
            <div className="px-6 md:px-10 py-6">
              <Outlet />
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-5 md:hidden transition-all duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
