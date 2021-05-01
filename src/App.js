import React,{useState,useEffect} from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import { commerce } from './components/lib/commerce';
import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Checkout from './components/Checkout/Checkout';




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

  const handleUpdateCartQty = async(productId,quantity)=>{
    const {cart} = await commerce.cart.update(productId,{quantity});
    setCart(cart);
  }
  const handleRemoveFromCart = async(productId)=>{
    const {cart} = await commerce.cart.remove(productId);
    setCart(cart);
  }
    const handleEmptyCart = async()=>{
    const {cart} = await commerce.cart.empty();
    setCart(cart);
  }

  useEffect (()=>{
    fetchProduct();
    fetchCart();
  },[])

  return (
    <Router>
      <div>
            <Navbar totalItems={cart.total_items}/>
              <Switch>
                <Route exact path='/'>
                    <Products products={products} onAddToCart = {handleAddToCart}/>  
                </Route>
                <Route exact path='/cart'>
                    <Cart cart={cart} 
                      handleUpdateCartQty={handleUpdateCartQty}
                      handleRemoveFromCart={handleRemoveFromCart}
                      handleEmptyCart={handleEmptyCart}
                    />
                </Route>  
                <Route exact path='/checkout'>
                    <Checkout/>
                </Route>
              </Switch>
      </div>
    </Router>
  )
}

export default App

