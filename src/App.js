import React,{useState,useEffect} from 'react';
import './App.css';
import { commerce } from './components/lib/commerce';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';


const App = () => {

  const [products,setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProduct = async()=> {
    const {data} = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async()=> {
    setCart( await commerce.cart.retrieve());
  }

  const handleAddToCart = async(productId,quantity)=>{
      const item = await commerce.cart.add(productId,quantity);
      setCart(item.cart);
  };

  useEffect (()=>{
    fetchProduct();
    fetchCart();
  },[])

  return (
    <div>
      <Navbar totalItems={cart.total_items}/>
      <Products products={products} onAddToCart = {handleAddToCart}/>  
    </div>
  )
}

export default App

