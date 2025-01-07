import React from 'react'
import { ProductCard } from './ProductCard';

export const ProductDescriptionFooter = ({selectedProduct,fetchedProducts}) => {
  console.log("product in footer ",selectedProduct);
  console.log("fetched product in footer ",fetchedProducts);

  const selectedCategoryProducts = fetchedProducts.filter((val,i)=>val.category === selectedProduct.category&& val.id !== selectedProduct.id);
  console.log("selectedCategoryProducts ",selectedCategoryProducts);
  return (
    <div>
        <h2 className='ml-6 '>Search by other products</h2>
        <div className='bg-gray-100 p-5 m-5 rounded-sm'>
        <div className='flex flex-wrap justify-center gap-5'>
            {
                selectedCategoryProducts.length>0 && selectedCategoryProducts.map((val)=>{
                    return(
                        <ProductCard val={val}/>

                    )
                })
            }
        </div>
        </div>
    </div>
  )
}
