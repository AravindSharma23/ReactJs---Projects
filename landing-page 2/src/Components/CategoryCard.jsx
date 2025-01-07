import React, { useState } from 'react'

export const CategoryCard = ({maincategoriesList}) => {
    if (!maincategoriesList || maincategoriesList.length === 0) {
        return <div>No categories available</div>;
      }
  return (
    <div className='cardContainer flex flex-wrap justify-center gap-5  bg-gray-100 p-5'>
    {/* <div>CategoryCard</div> */}
    {maincategoriesList.map((product,index)=>{ // .split('-') .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        let categoryName = product.category.split("-").map((word)=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ")
        return(
        <div class="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4" id={index}>
        <img class="w-full h-56 object-cover object-center" src={product.thumbnail} alt="avatar"/>
        <div class="flex items-center justify-center px-6 py-3 bg-gray-900">
            <h1 class="mx-3 text-white font-semibold text-lg">{categoryName}</h1>
        </div>
    </div>)
    })}
    </div>
    
  )
}
