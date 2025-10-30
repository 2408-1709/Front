import { useEffect } from "react";
import { CartProvider } from 'react-use-cart';
import './App.css';
import { Banner } from './components/banner';
import { Banner2 } from './components/banner2';
import { Cart2 } from './components/cart2';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Middle } from './components/middle';
import { Repliesget } from './components/Replies';
import { Upper } from './components/upper';
import { Wishlist } from './components/wishlist';
import { Feedback } from './feedback/feedback';
import { Checkout } from './home/checkout';
import { Home } from './home/home';
import { DetailedProducts } from './home/Productdetails';
import { Thanks } from './home/thanks';
import { Login } from './Login signup form/login';
import { Signup } from './Login signup form/signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) localStorage.removeItem("userId");
  }, []);

  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Login />} />
            <Route path='/header' element={<Header />} />
            <Route path='/banner' element={<Banner />} />
            <Route path='/banner2' element={<Banner2 />} />
            <Route path='/Footer' element={<Footer />} />
            <Route path='/cart2' element={<Cart2 />} />
            <Route path="/DetailedProducts/:productname" element={<DetailedProducts />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/middle' element={<Middle />} />
            <Route path='/upper' element={<Upper />} />
            <Route path="/thanks/:orderId" element={<Thanks />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/replies" element={<Repliesget />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
