import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import {useClerk, UserButton, useUser} from '@clerk/react'
import { AppContext } from '../context/AppContext'






const Navbar = () => {

const {navigate, isEducator} = useContext(AppContext)

const location = useLocation();

const isCourseListPage = location.pathname.includes('/course-list');

const {openSignIn} = useClerk();
const {user} = useUser();

// bg-cyan-100/70

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-800 py-4 ${isCourseListPage ? 'bg-white' : 'bg-gray-800'}`}>
      {
          isCourseListPage ? <img onClick={() => navigate('/')} src={assets.logo} alt="Logo"  className='w-28 lg:w-32 cursor-pointer' /> : <img onClick={() => navigate('/')} src={assets.logo_dark} alt="Logo"  className='w-28 lg:w-32 cursor-pointer' /> 
      }
            

              <div className="hidden md:flex items-center gap-5 text-gray-500">
                     <div className='flex items-center gap-5 text-gray-500'>
                         { user  &&  
                         <> 
                         <button onClick={() => {navigate('/educator/')}}>{isEducator ? 'Educator Dashboard': 'Become Educator' }</button>
                           | <Link to="/my-enrollments">My Enrollments</Link>
                          
                          </>}
                     </div>

                    {user ? <UserButton/> :
                     <button onClick={()=> openSignIn()} className='bg-gradient-to-r from-purple-500 to-blue-500
                        hover: from-purple-600 hover:to-blue-600 focus:outline-none focus:ring focus:ring-purple-300
                        active:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold shadow-md
                         transition duration-300 ease-in-out transform hover:scale-105
                     '>Create Account</button>}

              </div>
                 {/* For Phone Screens  */}
           <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
                       <div>
                           { user  && 
                           <>
                            <button onClick={() => {navigate('/educator/')}}>{isEducator ? 'Educator Dashboard': 'Become Educator' }</button>
                             | <Link to="/my-enrollments">My Enrollments</Link>
                            
                            </>}
                       </div>

                      {user ? <UserButton/> : <button onClick={()=> openSignIn()}><img src={assets.user_icon} alt="User Icon" /></button>}
              </div>
    </div>
  )
}

export default Navbar
