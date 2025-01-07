import React, { useEffect, useState } from 'react'
import {db,auth} from "./firebase";
import { doc,getDoc,updateDoc } from 'firebase/firestore';
import { WaitingBanner } from './WaitingBanner.jsx';
import { SuccessBanner } from './SuccessBanner.jsx';
import { DeletedSuccessfully } from './DeletedSuccessfully.jsx';

export const WishlistItemsPage = () => {
    const [wishedItems,setWishedItems] = useState(null);
    const [deleteNotification,setDeleteNotification] = useState(false);

    const authUser =  auth.currentUser;
    const [waitingBanner,setWaitingBanner] = useState(false);
    const [sucessBanner,setSuccessBanner] = useState(false);

    const fetchUserData = async()=>{
        const user =  auth.currentUser;

        console.log("Current User: in wishlisttt", auth.currentUser);
        if(user){
            try{
               const userRef = doc(db,"Users",user.uid);
               const userDoc = await getDoc(userRef);
               const userData = userDoc.data();
               setWishedItems(userData.wishList); 


            }catch(e){
             console.log("Error in wishlist page ",e);
            }
        }
    }
    console.log("wishlist in wishlist page",wishedItems);
    useEffect(()=>{
        fetchUserData();
    })

    const wishToAddCart = async(val)=>{
        const user = auth.currentUser;
        if(user){
            setWaitingBanner(true);

            try{
              const userRef = doc(db,"Users",user.uid);
              const userDoc = await getDoc(userRef);
              const userData = userDoc.data();
              let cartData = userData.cart || [];
              let existingItemIndex = cartData.findIndex((item)=>item.id === val.id);

              if (existingItemIndex > -1) {
                // If item exists, update its quantity
                cartData[existingItemIndex].quantity += 1;
              } else {
                // If item doesn't exist, add it to the cart
                cartData.push({ ...val, quantity: 1 });
              }
              await updateDoc(userRef, {
                cart: cartData,
              });
              console.log("Item added to cart");
              setTimeout(()=>{
                setWaitingBanner(false);
                setSuccessBanner(true);
              },2000);
              setTimeout(()=>{
                setSuccessBanner(false);
              },3000)
            }catch(e){
                console.log("Error adding in cart",e);
            }
        }
        console.log("Added to cart from wishlist pg");
    }
    const DeleteFromWishList = async(deleteProduct)=>{
        console.log("Deleted from wishlist pg");
        const user = auth.currentUser;

        
         if(user){
            try{
             const userRef = doc(db,"Users",user.uid);   
             const userDoc = await getDoc(userRef);
             const userData = userDoc.data();
             const currentWishList = userData.wishList || [];
             const updatedWishList = currentWishList.filter((val)=>val.id !== deleteProduct.id);

             console.log("Updated new wishlist items ",updatedWishList);
             await updateDoc(userRef,{wishList : updatedWishList});
             setDeleteNotification(true);
                    setTimeout(()=>{
                        setDeleteNotification(false)

                    },3000);


                
                console.log("item deleted successfully from cart");
            }catch(e){
                console.log("Error when deleting from wishlist",e);
            }
           
        }
        

    }
  return (
<>

    {waitingBanner&&<WaitingBanner/>}  
    {sucessBanner&&<SuccessBanner/>}
    {deleteNotification && <DeletedSuccessfully value="wishlist"/>}
<div class="container mx-auto  my-20 bg-white rounded-lg shadow-lg p-8">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Your Favorite Items</h1>
    <div style={{height:"600px",overflowY:"scroll"}}>
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th class="px-4 py-3 text-left text-gray-600 font-semibold">Product</th>
          <th class="px-4 py-3 text-left text-gray-600 font-semibold">Price</th>
          <th class="px-4 py-3 text-left text-gray-600 font-semibold">Stock Status</th>
          <th class="px-4 py-3 text-left text-gray-600 font-semibold">Action</th>
          <th class="px-4 py-3 text-left text-gray-600 font-semibold">Remove</th>
        </tr>
      </thead>

      <tbody>
        {wishedItems && wishedItems.map((val,i)=>
            (
                <tr class="border-b border-gray-200 hover:bg-gray-50">
                <td class="px-4 py-4 flex items-center">
                  <img src={val.thumbnail} alt="Hollow Port" class="w-24 h-24 object-cover rounded-md mr-4 bg-gray-100" />
                  <div>
                    <div class="font-semibold text-gray-800">{val.title}</div>
                  </div>
                </td>
                <td class="px-4 py-4 font-semibold text-yellow-500">${Math.ceil(val.price*(1-(val.discountPercentage/100)))}</td>
                <td class="px-4 py-4">
                  <div class={`w-24  text-center ${val.availabilityStatus === "In Stock" ? "bg-green-100 text-green-700 " : val.availabilityStatus === "Low Stock" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700" } font-medium px-3 py-1.5 rounded-full text-xs`}>{val.availabilityStatus === "In Stock"  ? "In Stock"  : val.availabilityStatus === "Low Stock" ? "Low Stock"  : "Stock Out"}</div>
                </td>
                <td class="px-4 py-4">
                  <button 
                  onClick={()=>wishToAddCart(val)}
                  class={`bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md text-sm ${
    val.availabilityStatus === "Out of Stock"  ?  "opacity-50 cursor-not-allowed" : ""} `} disabled={val.availabilityStatus === "Out of Stock"} >Add to Cart</button>
                </td>
                <td class="px-4 py-4">
                  <button 
                  onClick={()=>DeleteFromWishList(val)}
                  class="text-gray-400 hover:text-gray-600 focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </td>
              </tr>
            )
        )}
        
       
      </tbody>
    </table>
    </div>
    
  </div>
  
 
</>  
)}

/* 
  <WaitingBanner/>
  <SuccessBanner/>
*/