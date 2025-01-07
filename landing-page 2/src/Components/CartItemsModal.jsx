import React, { useEffect, useState } from 'react'
import {auth,db} from "./firebase";
import { useNavigate } from 'react-router-dom';
import {doc,getDoc,updateDoc} from "firebase/firestore";

export const CartItemsModal = () => {
    const [userDetails,setUserDetails] = useState(null);
    const navigate = useNavigate();
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
      useEffect(()=>{
        fetchUserData();
      },[])
      console.log("userDetails in  carttt ",userDetails);

      const navigateToCart = (e)=>{
        e.stopPropagation()
        console.log("function called")
        navigate("/orderedproducts");
      }
      const navigateToProductDescription = (product)=>{
        navigate("/productdescription",{state:{product}})
      }
    return (
   <>
        {userDetails && userDetails.cart && userDetails.cart.length >0 && (<div
            class="fixed inset-0 p-4 flex flex-wrap justify-end items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div class="w-full max-w-lg  flex  justify-center bg-white overflow-y-hidden shadow-lg rounded-3xl p-6 relative" style={{marginTop:"-45px",maxHeight:"450px",flexDirection :"column"}}>

               <h4 class="text-base font-bold text-gray-800 mt-1">Added Items</h4>
                {userDetails.cart.map((val,i)=>{
                 if(i<4){  
                return(
                    <div class="space-y-4 mt-2 border p-2 rounded-lg hover:bg-gray-100" onClick={()=>{navigateToProductDescription(val)}} >
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div class="flex items-center">
                            <img src={val.thumbnail}  class="w-16 h-16 p-2 shrink-0 bg-gray-200 rounded-md" />
                            <div class="ml-4">
                                <p class="text-sm text-gray-800">{val.title}</p>
                                {/* <!-- <p class="text-gray-500 text-xs mt-1">1 Item</p> --> */}
                            </div>
                        </div>


                    </div>




                </div>
                );
            }
            
            
            })}
{
    userDetails.cart.length>=4 &&<button  
   onClick={(e)=>navigateToCart(e)}
   class="rounded-full bg-gray-900 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 m-2"> Go to cart</button>
}
                
                


            </div>
        </div>)}
        </>

    )
}
