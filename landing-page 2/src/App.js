
import './App.css';
import { NavBar } from './Components/NavBar';
import ImageSlider from './Components/ImageSlider';
import { Categories } from './Components/Categories';
import React,{useEffect,useState} from 'react';
import { SearchInputFilter } from './Components/SearchInputFilter';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { EditProfile } from './Components/EditProfile';
import {auth} from "./Components/firebase.js";
import { ProductsDescription } from './Components/ProductsDescription.jsx';
import { OrderedHistory } from './Components/OrderedHistory.jsx';
import { WishlistItemsPage } from './Components/WishlistItemsPage.jsx';

const HomeContent = ({fetchedProducts})=>{
  return(
    <>
     <ImageSlider/>
     <Categories/>
     <SearchInputFilter fetchedProducts ={fetchedProducts}/>
     {/* <ToastContainer/> */}
    </>
  )
}

function App() {
  const [categoriesList,setCategoriesList] = useState([])
  const [maincategoriesList,setMainCategoriesList] = useState([])
  const [fetchedProducts,setFetchedProducts] = useState([]);
  const [oneProductPerCategory, setOneProductPerCategory] = useState([]);
  const [loading,setLoading] = useState(true);
  const [user,setUser] = useState();
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
     setUser(user);
    })
  })
  useEffect(()=>{
      const fetchCategories =async () =>{
          try{
         const response = await fetch('https://dummyjson.com/products/category-list')
         const data = await response.json();
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
  console.log("Fetched Categories",categoriesList);
  console.log("fetchedProducts",fetchedProducts);
  console.log("setOneProductPerCategory",oneProductPerCategory)
  console.log("maincategoriesList",maincategoriesList)

  return (
    <div className="">
     <Router>
     <NavBar categoriesList={categoriesList} />
     {/* <ImageSlider/>
     <Categories/>
     <SearchInputFilter fetchedProducts ={fetchedProducts}/> */}
       <Routes>
            <Route path="/" element={ <HomeContent fetchedProducts ={fetchedProducts} /> }/>
            <Route path="/login" element={<Login/>}/>
           <Route path="/signup" element={<SignUp/>}/>
           <Route path="/profile" element={user ? <EditProfile/> : <Login/> }/>
           <Route path = "/productdescription" element={<ProductsDescription fetchedProducts ={fetchedProducts} />} />
           <Route path="/orderedproducts" element={<OrderedHistory/>} />
           <Route path="/wishlist" element ={<WishlistItemsPage/>}/>
           <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer/>

     </Router>
    </div>
  );
}

export default App;
