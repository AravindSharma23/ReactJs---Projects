import React, { useEffect,useState } from 'react'
import {auth,db} from "./firebase.js";
import {doc,getDoc,updateDoc} from "firebase/firestore";
import { RiDeleteBin6Fill } from '@remixicon/react';
import { DeleteAlertModal } from './DeleteAlertModal.jsx';
import { WaitingBanner } from './WaitingBanner.jsx';
import { DeletedSuccessfully } from './DeletedSuccessfully.jsx';
export const OrderedHistory = () => {
    const [userDetails,setUserDetails] = useState(null);
    const [dAlertModal,setdAlertModal] = useState(false);
    const [waitingBanner,setWaitingBanner] = useState(false);
    const [deleteNotification,setDeleteNotification] = useState(false);
    const [deleteId,setDeleteId] = useState(null);
    const fetchUserData = async()=>{
        auth.onAuthStateChanged(async(user)=>{
            if(user){
            console.log("user isss ",user);
            const docRef = doc(db,"Users",user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setUserDetails(docSnap.data())
                console.log("exist in orderedd ",docSnap.data());
            }else{
               console.log("user not loggedin");
            }
        }
        })
      }
      const removeFromCart = async(productId)=>{
        console.log("userDetails in ordered ",userDetails);
        setdAlertModal(false);
        setWaitingBanner(true);
        
        if(userDetails){
            try{
                const user = auth.currentUser;
                const userRef = doc(db,"Users",user.uid);

                const currentCartItems = userDetails.cart || [];
                const updatedCartItems = currentCartItems.filter((val)=>val.id !== productId);
                console.log("Updated new cart items ",updatedCartItems);
               
                await updateDoc(userRef,{cart : updatedCartItems});
                setDeleteNotification(true);
                    setTimeout(()=>{
                        setDeleteNotification(false)

                    },3000);
                console.log("item deleted successfully from cart");
            }catch(e){
                console.log("Error when deleting from cart",e);
            }
           
        }
      }
      const handleDeleteAlertModal = (productId)=>{
        setDeleteId(productId)

        setdAlertModal(!dAlertModal)
      }
     
      useEffect(()=>{
        fetchUserData();

      })
    return (
        <>
       
        {
            userDetails && <div class="bg-white">
          <div class="mx-auto max-w-4xl py-16 sm:px-6 sm:py-24">
            <div class="px-4 sm:px-0">
                <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
                <p class="mt-2 text-sm text-gray-500">Check the status of recent orders, manage returns, and download invoices.</p>
            </div>
      
            <div class="mt-16">
                <h2 class="sr-only">Recent orders</h2>
      
                <div class="space-y-16 sm:space-y-24">
                  {userDetails && userDetails.cart && userDetails.cart.map((val)=>{
                  return(
                    <div>
                      <h3 class="sr-only">Order placed on <time datetime="2021-01-22">January 22, 2021</time></h3>
      
      
      
                      <div class="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
                          <div class="-my-6 divide-y divide-gray-200 sm:-my-10">
                              <div class="flex py-6 sm:py-10 gap-20">
                                  <div class="min-w-0 flex-1 lg:flex lg:flex-col">
                                      <div class="lg:flex-1">
                                          <div class="sm:flex">
                                              <div>
                                                  <h4 class="font-medium text-gray-900">{val.title}</h4>
                                                  <p class="mt-2 hidden text-sm text-gray-500 sm:block">{val.description}</p>
                                              </div>
                                              <p class="mt-1 font-medium text-gray-900 sm:ml-6 sm:mt-0">${Math.ceil(val.price)}</p>
                                          </div>
                                          <div class="mt-2 flex text-sm font-medium sm:mt-4">
                                              <a href="#" class="text-indigo-600 hover:text-indigo-500">View Product</a>
                                              <div class="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
      
                                              </div>
                                          </div>
                                      </div>
                                      <div class="mt-6 font-medium">
                                          <p>Out for delivery</p>
                                      </div>
                                  </div>
                                  {/* <button>Remove</button> */}
                                  <RiDeleteBin6Fill className='text-indigo-700 hover:bg-gray-200 p-3 rounded-md cursor-pointer' onClick={()=>{handleDeleteAlertModal(val.id)}} size={50} />
                                  <div class="ml-4 shrink-0 sm:order-first sm:m-0 sm:mr-6">
                                      <img src={val.thumbnail} alt="Olive drab green insulated bottle with flared screw lid and flat top." class="col-start-2 col-end-3 size-20 rounded-lg object-cover sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:size-40 lg:size-52" />
                                  </div>
                              </div>
      
                          </div>
                      </div>
                      
                  </div>
                  )
})}
                   
      
                </div>
                
            </div>
        </div>   
      </div>
}
    {dAlertModal && <DeleteAlertModal onClick={handleDeleteAlertModal} removeFromCartFunction = {()=>removeFromCart(deleteId)} /> }
    {/* {waitingBanner && <WaitingBanner/>} */}
    {deleteNotification && <DeletedSuccessfully value="cart"/>}
    {/* <DeletedSuccessfully/> */}
    
</>

    )
}

// ()=>removeFromCart(val.id)