import React, { useEffect } from 'react'
import { ProductsDescription } from './ProductsDescription';
import { useNavigate } from 'react-router-dom';
import {doc,setDoc,collection, getDoc,updateDoc} from 'firebase/firestore';
import {auth,db} from './firebase.js';
export const ProductCard = ({val}) => {
    const navigate = useNavigate()
    const getProductDescription = (product)=>{
        console.log("productttt ",product);
       navigate("/productdescription",{state:{product}})
     // window.location.href="/productdescription";

      //return <ProductsDescription product = {product} />
      }
    // const addToCart = async(val)=>{
    //     const user = auth.currentUser;
    //     if(user){
    //         try{
    //           const userRef = doc(db,"Users",user.uid);
    //           const userDoc = await getDoc(userRef);
    //           const userData = userDoc.data();
    //           let cartData = userData.cart || [];
    //           let existingItemIndex = cartData.findIndex((item)=>item.id === val.id);

    //           if (existingItemIndex > -1) {
    //             // If item exists, update its quantity
    //             cartData[existingItemIndex].quantity += 1;
    //           } else {
    //             // If item doesn't exist, add it to the cart
    //             cartData.push({ ...val, quantity: 1 });
    //           }
    //           await updateDoc(userRef, {
    //             cart: cartData,
    //           });
    //           navigate("/productdescription", { state: { val } });
    //           console.log("Item added to cart");
    //         }catch(e){
    //             console.log("Error adding in cart",e);
    //         }
    //     }
    // }
    useEffect(()=>{
     
    },[])
    return (
        <>
            <div class="relative  flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md" >
                <a class="relative mx-3 mt-3 flex h-60  rounded-xl cursor-pointer"  onClick={()=>{getProductDescription(val)}}>
                    <img class="object-cover" src={val.thumbnail} alt="product img"  />
                    <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{Math.ceil(val.price*(1-(val.discountPercentage/100))) != Math.ceil(val.price) ? Math.ceil(val.discountPercentage)+"% OFF" : ''}</span>
                </a>
                <div class="mt-4 px-5 pb-5">
                    <a >
                        <h5 class="text-xl tracking-tight text-slate-900">{val.title}</h5>
                    </a>
                    <div class="mt-2 mb-5 flex items-center justify-between">
                        <p>
                            <span class="text-3xl font-bold text-slate-900">${Math.ceil(val.price*(1-(val.discountPercentage/100)))}</span>
                            <span class="text-sm text-slate-900 line-through">{ Math.ceil(val.price*(1-(val.discountPercentage/100))) != Math.ceil(val.price) ? "$"+Math.ceil(val.price) : ''}</span>
                        </p>
                        <div class="flex items-center"> 
                            <svg aria-hidden="true" class={`h-5 w-5  ${val.rating>=1 ? 'text-yellow-300' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <svg aria-hidden="true" class={`h-5 w-5  ${val.rating>=2 ? 'text-yellow-300' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <svg aria-hidden="true" class={`h-5 w-5  ${val.rating>=3 ? 'text-yellow-300' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <svg aria-hidden="true" class={`h-5 w-5  ${val.rating>=4 ? 'text-yellow-300' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <svg aria-hidden="true" class={`h-5 w-5  ${val.rating ==5 ? 'text-yellow-300' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{val.rating.toFixed(1)}</span>
                        </div>
                    </div>
                    <button   class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart</button>
                    
                </div>
            </div>
           
        </>
    )
}
