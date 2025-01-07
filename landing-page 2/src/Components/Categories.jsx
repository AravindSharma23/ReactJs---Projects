import React, { useEffect, useState } from 'react'
import { CategoryCard } from './CategoryCard'

export const Categories = () => {
    const [categoriesList,setCategoriesList] = useState([])
    const [maincategoriesList,setMainCategoriesList] = useState([])
    const [fetchedProducts,setFetchedProducts] = useState([]);
    const [oneProductPerCategory, setOneProductPerCategory] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const fetchCategories =async () =>{
            try{
           const response = await fetch('https://dummyjson.com/products/category-list')
           const data = await response.json()
           //console.log("RESPONSE",data);
           setCategoriesList(data);
           const productsPromises = data.map(async (category) => {
            const res = await fetch(`https://dummyjson.com/products/category/${category}`);
            const productsData = await res.json();
            return productsData.products;
          });
  
          const productsArray = await Promise.all(productsPromises);
          const allProducts = productsArray.flat();
          setFetchedProducts(allProducts);

          const oneProductArray = productsArray.map(products => products[0]);
          setOneProductPerCategory(oneProductArray);

        //   const category = oneProductArray.filter(product =>   
        //     ['mens-shirts', 'womens-dresses', 'fragrances','laptops','mens-watches','smartphones'].includes(product.category)
        //   );
        const desiredOrder = ['mens-shirts', 'womens-dresses', 'smartphones', 'laptops', 'mens-watches' ];

        // Filter the products based on specific categories and order them
        const category = oneProductArray
          .filter(product => desiredOrder.includes(product.category))
          .sort((a, b) => desiredOrder.indexOf(a.category) - desiredOrder.indexOf(b.category));
          setMainCategoriesList(category)

          setLoading(false);
        }catch(err){
            console.log("error",err);
            setLoading(false);
        }
        }
       
        fetchCategories() 
    },[])
    //console.log("Fetched Categories",categoriesList);
   // console.log("fetchedProducts",fetchedProducts);
   // console.log("setOneProductPerCategory",oneProductPerCategory)
   // console.log("maincategoriesList",maincategoriesList)
  return (
    <div class="m-5">
      <h1 className="text-gray-900 text-2xl font-bold mb-5">Featured by Categories</h1>
      {loading ? (
        <div>Loading...</div>  // Show loading indicator while data is being fetched
      ) : (
        <CategoryCard maincategoriesList={maincategoriesList} />
      )}
      {/* <CategoryCard maincategoriesList = {maincategoriesList}/> */}
    </div>
  )
}
