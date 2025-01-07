import React, { useEffect, useRef, useState } from 'react'
import {useHistory,useNavigate} from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { CartItemsModal } from './CartItemsModal';
export const NavBar = ({categoriesList}) => {
  const [isCurrentUser,setIsCurrentUser] = useState(null);
  const [isprofileOpen,setIsProfileOpen] = useState(false);
  const [showCartItems,setShowCartItems] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  console.log("categoriesList in navbar",categoriesList);
  // const history = useHistory();

  const [isDropdownOpen,setIsDropdownOpen] = useState(false);
  const [currentCategoryName,setCurrentCategoryName] = useState([]);
  const mouseEnter = ()=>{
    setIsDropdownOpen(true);
  }
  const mouseLeave = ()=>{
    setIsDropdownOpen(false);
  }
  const handleDropdownClick = (currentCategoryNmae) => {
    // Define your route based on the category
    setCurrentCategoryName(currentCategoryNmae)
    //history.push(`/category/${currentCategoryNmae}`);
  }
  const handleLoginClick=()=> {
    navigate("/login")
  }
  const handleSignUpClick = ()=>{
    navigate("/signup")
  }
  const handleSignOut = async()=>{
    try{
      await auth.signOut();
      navigate('/login');
      console.log("signedout successfully");
    }catch(e){
      console.log("error is ",e.message);
    }
  
  }
  const profileDropdown = ()=>{
    setIsProfileOpen(!isprofileOpen);
  }
  useEffect(()=>{
    // onAuthStateChanged(auth,(currentUser)=>{
    //   setIsCurrentUser(currentUser);
    //   console.log("current userrrr ",currentUser);

    // })
    onAuthStateChanged(auth,(currentUser)=>{
      setIsCurrentUser(currentUser);
      console.log("current userrrr ",currentUser);
    })

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setTimeout(()=>{
          setShowCartItems(false);

        },200);
      }
    };
    if (showCartItems) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  },[showCartItems])

  const handleCartItems = ()=>{
    setShowCartItems(!showCartItems);
  }
  
  return (
    <>
 

<div class="flex flex-wrap " ref={modalRef}>
  <section class="relative mx-auto w-full">
     
    <nav class="flex justify-between bg-gray-900 text-white ">
      <div class="px-5 xl:px-12 py-6 flex w-full items-center justify-between">
        <a class="text-3xl font-bold font-heading" href="#">
          {/* <!-- <img class="h-9" src="logo.png" alt="logo"> --> */}
          Shopiee
        </a>
        {/* <!-- Nav Links --> */}
        <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <li><a class="hover:text-gray-200" href="/">Home</a></li>
          {/* <li><a class="hover:text-gray-200" href="#">Catagory</a></li> */}
        <li onMouseEnter={mouseEnter} > <div class="dropdownParent relative flex  rounded-lg text-white font-semibold cursor-pointer">
        <span class="hover:text-gray-200">All category</span>

        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div> </li> 
          <li><a class="hover:text-gray-200" href="#">Collections</a></li>
          <li><a class="hover:text-gray-200" href="#">Contact Us</a></li>
        </ul>
        
         {isCurrentUser == null && <div class="hidden xl:flex items-center space-x-5 items-center">
         <button type="button" 
         onClick={handleLoginClick}
         class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20">Login</button>
 
         <button type="button"
         onClick={handleSignUpClick}
          class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Signup</button>

         </div>}
        {/* <!-- Header Icons starts --> */}
       {isCurrentUser!==null && <div class="hidden xl:flex items-center space-x-5 items-center">
          <a class="hover:text-gray-200" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </a>
          <a class="flex items-center hover:text-gray-200" onClick={handleCartItems}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            <span class="flex absolute -mt-5 ml-4">
              <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                </span>
              </span>
          </a>
          <a onClick={profileDropdown}    class="flex items-center hover:text-gray-200 relative " href="#" >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
          </a>

         { isprofileOpen &&<div class="absolute right-10 z-10 top-16  mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
            {/* <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a> */}
            <a href="#" onClick={handleSignOut} class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
          </div> }
          
        </div> }
          {/* <!-- Header Icons ends--> */}

      </div>
      {/* <!-- Responsive navbar --> */}
      <a class="xl:hidden flex mr-6 items-center" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span class="flex absolute -mt-5 ml-4">
          <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
          </span>
        </span>
      </a>
      <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
      </a>
    </nav>
    
  </section>
</div>
{/* For Dropdown items */}
{/* { isDropdownOpen && (
<div onMouseLeave={mouseLeave} class="dropdownChild absolute  z-10 mt-2 w-1/2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style={{right:"40%"}} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
    <div class="py-1 flex flex-wrap" role="none" style={{maxHeight:"500px"}}>
    {categoriesList.map((val,index)=>{
      let dropDownVal = val.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return(
      <div className=''>
         <a  key={index} href="#" class="block px-4 py-2 text-sm text-gray-700 hover:text-purple-600" role="menuitem" tabIndex="-1" id="menu-item-0" onClick={() => handleDropdownClick(val)}>{dropDownVal}</a>

      </div>
      )})}
    </div>
  </div>
)
} */}
{ isDropdownOpen && ( 
 <div onMouseLeave={mouseLeave} class="dropdownChild absolute z-10 mt-2 w-1/2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style={{right:"40%"}} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
 <div class="py-1 grid grid-cols-3 gap-2" role="none" style={{maxHeight:"500px"}}>
   {categoriesList.map((val, index) => {
     let dropDownVal = val.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
     return (
       <a key={index} href="#" class="block px-4 py-2 text-sm text-gray-700 hover:text-purple-600 hover:bg-gray-100 relative" role="menuitem" tabIndex="-1" id="menu-item-0" onClick={() => handleDropdownClick(val)}>
         {dropDownVal}
         <span class="absolute right-4 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out hover:translate-x-2">
           <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
           </svg>
         </span>
       </a>
     );
   })}
 </div>
</div>
)}

   {showCartItems&&<CartItemsModal/>}
    </>
  )
}
