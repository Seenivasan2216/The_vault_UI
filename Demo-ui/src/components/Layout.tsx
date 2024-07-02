import Sidebar from './Sidebar'
import { Outlet , useNavigate } from 'react-router-dom'
import  { useEffect, useState } from 'react';
import { getSessionData } from '../service/session';

export function Layout() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    

  useEffect(() => {
    // Function to check if the user is logged in (e.g., check if JWT exists and is valid)
    const checkLoggedInStatus = () => {
      const token = getSessionData();
      // Example: Validate JWT token (you may use a library like `jwt-decode` or `jsonwebtoken`)
      if (token) {
        // Here, you would decode and validate the token
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoggedInStatus();
   
  }, []);

    return (
        <>
        
            <div className="w-screen h-16 flex justify-content items-center border-b border-blue-gray-50 p-1">
                <Sidebar />
                <img className='w-14 pt-1' src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" />
                <div className="ml-auto p-5">
                    <span className='pr-3'></span>
                </div>
            </div>
            <div className='p-2 bg-gray-200'>
                <Outlet />
            </div>
        </>
    );
}