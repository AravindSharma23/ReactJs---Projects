
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {doc,setDoc,collection, getDoc,updateDoc,arrayRemove,arrayUnion} from 'firebase/firestore';
import {auth,db} from './firebase.js';
import { ProductDescriptionFooter } from './ProductDescriptionFooter';
import { ProductReviews } from './ProductReviews';
import { WaitingBanner } from './WaitingBanner.jsx';
import { SuccessBanner } from './SuccessBanner.jsx';
import { ArrowButton } from './ArrowButton.jsx';
export const ProductsDescription = ({fetchedProducts}) => {
    const [selectedProduct,setSelectedProduct] = useState(null);
    const [imgFrame,setImgFrame] = useState(null);
    const [waitingBanner,setWaitingBanner] = useState(false);
    const [sucessBanner,setSuccessBanner] = useState(false);
    const [seeMoreReview,setSeeMoreReview] = useState(false);
    const [userWishedProducts,setUserWishedProducts] = useState(null);
    const [isLiked,setIsLiked] = useState(false);
   // const [hideMoreReview,setHideMoreReview] = useState(false);

    const location = useLocation()
    const product = location.state?.product || location.state?.val;
    console.log("sProduct ",product);
    const fetchUserData = async()=>{
      const user = auth.currentUser;
      if(user){
        try{
          const userRef = doc(db,"Users",user.uid);
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data();
          setUserWishedProducts(userData.wishList);


       }catch(e){
        console.log("error when fetch",e)
       }
    }
  }
    useEffect(()=>{
        console.log("selected prod inside ",selectedProduct);

         if(product){
           setSelectedProduct(product);
           setImgFrame(product.thumbnail);
          }
          fetchUserData();
   },[product,userWishedProducts]);
    console.log("selected prod ",selectedProduct);
    const changeImageFrame = (img)=>{
        console.log("clicked ");
        setImgFrame(img);
    }
    console.log("imgFrame ",imgFrame);

    const addToCart = async(val)=>{
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
    }
  
    const reviewBtn =()=>{
        console.log("button clicked ");
        setSeeMoreReview(!seeMoreReview);
    }
    const addWishlist = async(wishedProduct)=>{
      const user = auth.currentUser;

      if(user){
        try{
          const userRef = doc(db,"Users",user.uid);
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data();
          const wishList = userData.wishList || [];
          let existingItemIndex = wishList.findIndex((item)=>item.id === wishedProduct.id);

          if (existingItemIndex > -1) {
            wishList.splice(existingItemIndex,1);
            setIsLiked(false) 
            // Remove from wishlist
            // await updateDoc(userRef, {
            //   wishList: wishList.splice(existingItemIndex,1) // Remove the product from Firestore
            // });
            console.log(`Product removed from wishlist: ${wishedProduct.id}`);
          } else {
            wishList.push({...wishedProduct})
            setIsLiked(true); 

            // await updateDoc(userRef, {
            //   wishList: arrayUnion(wishedProduct) // Add the product to Firestore
            // });
            console.log("pushedd");
          }
          await updateDoc(userRef, {
              wishList: wishList// Add the product to Firestore
            });
            console.log("added to wishlist ",userData);
            // setUserWishedProducts(userData.wishList);

            console.log("userWishedProducts is-->",userWishedProducts);

      }catch(e){
        console.log("Error when adding wishlist ",e);
      }
    }
  }
  return (
   ( selectedProduct && <div>
    {waitingBanner&&<WaitingBanner/>}
    {sucessBanner&&<SuccessBanner/>}
      <div class="bg-white">
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
    <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 border border-slate-100 px-5 py-5 rounded-md shadow-md">
      {/* <!-- Image gallery --> */}
      <div class="flex flex-col-reverse">
        {/* <!-- Image selector --> */}
        <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
          <div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
          {selectedProduct.images.map((val,i)=>{
            return(<button id="tabs-1-tab-1" 
                onClick={()=>{changeImageFrame(val)}}
              class="relative flex h-32  cursor-pointer items-center justify-center border  rounded-md bg-gray-50 text-sm font-medium uppercase text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-indigo-500/50 focus:ring-offset-4" aria-controls="tabs-1-panel-1" role="tab" type="button">
              <span class="sr-only">Angled view</span>
              <span class="absolute inset-0 overflow-hidden rounded-md">
                <img src={val} alt="" class="size-full object-cover" />
              </span>
              <span class="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2" aria-hidden="true"></span>
            </button>)
          })
        }

            {/* <!-- More images... --> */}
          </div>
        </div>

        <div>
          {/* <!-- Tab panel, show/hide based on tab state. --> */}
          <div id="tabs-1-panel-1" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
            {/* {selectedProduct.images.forEach((val,i)=>{
               
                  return(<img src={val} alt="Angled front view with bag zipped and handles upright." class="aspect-square w-full object-cover sm:rounded-lg" />)

               
            })} */}
            <img src={imgFrame} alt="Angled front view with bag zipped and handles upright." class="aspect-square w-full object-cover sm:rounded-lg cursor-pointer" />
          </div>

          {/* <!-- More images... --> */}
        </div>
      </div>

      {/* <!-- Product info --> */}
      <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">{selectedProduct.title}</h1>
        <div class="flex justify-between py-2">
        <span class="rounded-full bg-black px-2 py-0.5 text-center text-sm font-medium text-white">{Math.ceil(selectedProduct.price*(1-(selectedProduct.discountPercentage/100))) != Math.ceil(selectedProduct.price) ? Math.ceil(selectedProduct.discountPercentage)+"% OFF" : ''}</span>
        <p class="ml-4 rounded bg-slate-200 px-2.5 py-1 text-xs font-semibold">{selectedProduct.brand}</p>

        </div>
        {/* <span class="rounded-full bg-black px-2 text-center text-sm font-medium text-white">5% OFF</span> */}
        <div class="mt-3">
          <h2 class="sr-only">Product information</h2>
          {/* <!-- <p class="text-3xl tracking-tight text-gray-900">$140</p> --> */}
          <div class="flex">
             <p class="text-3xl tracking-tight text-gray-900">${Math.ceil(selectedProduct.price*(1-(selectedProduct.discountPercentage/100)))}</p>
             <sub class="text-sm text-slate-900 line-through mt-2 ml-1">{ Math.ceil(selectedProduct.price*(1-(selectedProduct.discountPercentage/100))) != Math.ceil(selectedProduct.price) ? "$"+Math.ceil(selectedProduct.price) : ''}</sub>
         </div>
        </div>

        {/* <!-- Reviews --> */}
        <div class="mt-3">
          <h3 class="sr-only">Reviews</h3>
          <div class="flex items-center">
            <div class="flex items-center">
              {/* <!-- Active: "text-indigo-500", Inactive: "text-gray-300" --> */}
              <svg class={`size-5 shrink-0 ${selectedProduct.rating >= 1 ? 'text-yellow-300' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
              </svg>
              <svg class={`size-5 shrink-0 ${selectedProduct.rating >= 2 ? 'text-yellow-300' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
              </svg>
              <svg class={`size-5 shrink-0 ${selectedProduct.rating >= 3 ? 'text-yellow-300' : ''}`}viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
              </svg>
              <svg class={`size-5 shrink-0 ${selectedProduct.rating >= 4 ? 'text-yellow-300' : ''}`}viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
              </svg>
              <svg class={`size-5 shrink-0 ${selectedProduct.rating === 5 ? 'text-yellow-300' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clip-rule="evenodd" />
              </svg>
            </div>
            <p class="ml-4 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{selectedProduct.rating.toFixed(1)}</p>
          </div>
        </div>

        <div class="mt-6">
          <h3 class="sr-only">Description</h3>

          <div class="space-y-6 text-base text-gray-700">
            <p>{selectedProduct.description}</p>
          </div>
        </div>

        <div class="mt-6">
          {/* <!-- Colors --> */}
          {/* <div>
            <h3 class="text-sm font-medium text-gray-600">Color</h3>

            <fieldset aria-label="Choose a color" class="mt-2">
              <div class="flex items-center space-x-3">
                <label aria-label="Washed Black" class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-700 focus:outline-none">
                  <input type="radio" name="color-choice" value="Washed Black" class="sr-only" />
                  <span aria-hidden="true" class="size-8 rounded-full border border-black/10 bg-gray-700"></span>
                </label>
                <label aria-label="White" class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                  <input type="radio" name="color-choice" value="White" class="sr-only" />
                  <span aria-hidden="true" class="size-8 rounded-full border border-black/10 bg-white"></span>
                </label>
                <label aria-label="Washed Gray" class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-500 focus:outline-none">
                  <input type="radio" name="color-choice" value="Washed Gray" class="sr-only" />
                  <span aria-hidden="true" class="size-8 rounded-full border border-black/10 bg-gray-500"></span>
                </label>
              </div>
            </fieldset>
          </div> */}

          <div class="mt-10 flex">
            <button  onClick={()=>addToCart(selectedProduct)}   class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">Add to cart</button>
           {/* {userWishedProducts !== null && userWishedProducts.map((val,i)=>(  */}

            <button type="button" onClick={()=>addWishlist(selectedProduct)}  class="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <svg class={`size-6 shrink-0 ${userWishedProducts !== null && userWishedProducts.some(val =>val.id=== selectedProduct.id )? "text-red-700" : ""}`} fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              <span class="sr-only">Add to favorites</span>
            </button>
            
{/*        ))}*/}         
       </div>
        </div>

        <section aria-labelledby="details-heading" class="mt-12">
          <h2 id="details-heading" class="sr-only">Additional details</h2>

          <div class="divide-y divide-gray-200 border-t">
            <div>
              <h3>
                {/* <!-- Expand/collapse question button --> */}
                <button type="button" class="group relative flex w-full items-center justify-between py-6 text-left" aria-controls="disclosure-1" aria-expanded="false">
                  {/* <!-- Open: "text-indigo-600", Closed: "text-gray-900" --> */}
                  <span class="text-sm font-medium text-gray-900">Shipping & Return Info</span>
                  {/* <span class="ml-6 flex items-center">
                    <svg class="block size-6 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <svg class="hidden size-6 text-indigo-400 group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                    </svg>
                  </span> */}
                </button>
              </h3>
              <div class="pb-6" id="disclosure-1">
                <ul role="list" class="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300">
                  <li class="pl-2">{selectedProduct.shippingInformation}</li>
                  <li class="pl-2">{selectedProduct.returnPolicy}</li>
                  
                </ul>
              </div>
            </div>

            {/* <!-- More sections... --> */}
          </div>
        </section>
      </div>
    </div>
  </div>
</div>
<div className='reviews-container relative rounded-md  p-5 bg-gray-100 m-5 overflow-hidden'> 
<div className='flex justify-between p-2'>
<h2>Ratings & Reviews</h2>


<button type="button" class="rounded-sm bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Write a Review</button>
</div>
<div className={`${seeMoreReview ? 'overflow-y-auto' : '' }`}style={{maxHeight:`${seeMoreReview ? '400px' : '140px' }`}}>
{selectedProduct.reviews.length >0 &&selectedProduct.reviews.map((val)=>{
    return(
        <ProductReviews val = {val}/>
        
    )
})
}
</div>
</div>
<ArrowButton seeMoreReview={seeMoreReview} onClick={reviewBtn}/>

   
    <ProductDescriptionFooter selectedProduct = {selectedProduct} fetchedProducts={fetchedProducts}/>
    </div>)
  )
}

