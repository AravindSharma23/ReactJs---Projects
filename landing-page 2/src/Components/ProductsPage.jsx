import React from 'react'
import { ProductCard } from './ProductCard';

export const ProductsPage = ({searchCategory,fetchedProducts}) => {
  console.log("searchCategory in pp",searchCategory);
  console.log("fetchedProducts in pp ",fetchedProducts);
 let  filteredProducts = [];
 if(searchCategory !== undefined){
  filteredProducts= fetchedProducts.filter((val)=> {return searchCategory !== '' && val.category.includes(searchCategory.toLowerCase())});

 } 
 let allProductsList = fetchedProducts;
 console.log("filteredProducts in pp",filteredProducts);
  return (
    <div className='bg-gray-100 p-5 m-5'>
    <div className='flex flex-wrap justify-center gap-5'>
        { filteredProducts.length > 0 ? (
           filteredProducts.map((val)=>{
            return(
              <ProductCard val={val}/>
            )
          })
        ) : (
          allProductsList.map((val)=>{
            return(
              <ProductCard val={val}/>
            )
          })
        )
          
        }

    </div>
    </div>
  )
}
