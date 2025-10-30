import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { Helmet } from "react-helmet";

function Banner2() {
  const [gadgetsData, setGadgetsData] = useState([]);
  const { addItem, inCart } = useCart();
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate(); // ✅ for redirecting

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://backend-cpcx.vercel.app/ProductDetails/getProducts");
        const data = await response.json();
        console.log("Fetched data:", data);
        setGadgetsData(data.users);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }
    fetchProducts();
  }, []);

  const addProducts = () => toast.success("Product added to wishlist ❤️");

  const Clickmsg = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount > 2) toast.error("Limit Exceeded!");
      else toast.error(`Limit is 2 times only (${newCount}/2)`);
      return newCount;
    });
  };

  // 🛒 Add to Cart Logic
  const Cartadd = async (item) => {
    const userId = localStorage.getItem("userId");

    // ✅ If user not logged in
    if (!userId) {
      toast.error("Please log in first to add items to cart.");
      setTimeout(() => navigate("/"), 1000); // redirect after toast
      return;
    }

    const cartItem = {
      userId,
      productname: item.productname,
      price: item.price,
      description: item.description,
      imageurl: item.imageurl,
      category: item.category,
      quantity: 1,
    };

    try {
      const response = await fetch("https://backend-cpcx.vercel.app/Carts/CartPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) toast.success("Item added to cart 🛒");
      else toast.error("Failed to add item to cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Something went wrong while adding to cart");
    }
  };

  return (
    <>
      <Helmet>
        <title>Shop Latest Gadgets | GadgetStore</title>
        <meta
          name="description"
          content="Browse trending gadgets, smartwatches, and electronic devices at the best prices. Shop and add your favorite items to your cart or wishlist."
        />
        <meta
          name="keywords"
          content="gadgets, online shopping, electronics, smartwatch, headphones, gadgetstore"
        />
      </Helmet>

      <Toaster position="top-right" />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-papU8R+YqOrN+2nlkIdt6o8I2Fx2dQYwYiOKxTLr+ekN9e4K5K8PMcU9oX/pCInHq4XwEKnhG2b1g5sP5RTAKw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <h1 className="gadget-title">Find your Gadgets Here....!</h1>

      <section className="card-section">
        {Array.isArray(gadgetsData) && gadgetsData.length > 0 ? (
          gadgetsData.map((item, index) => (
            <div className="gadget-card" key={index}>
              <i
                className={`fa-heart ${inCart(item._id) ? "fas" : "far"}`}
                style={{
                  cursor: "pointer",
                  color: inCart(item._id) ? "red" : "gray",
                }}
                onClick={() => {
                  const wishlistItem = { ...item, id: item._id };
                  if (inCart(item._id)) {
                    Clickmsg();
                  } else {
                    addItem(wishlistItem);
                    addProducts();
                  }
                }}
              ></i>

              <img src={item.imageurl} alt={item.category} />
              <h2>Price: ₹{parseFloat(item.price).toLocaleString()}</h2>
              <h3>{item.productname}</h3>
              <p>Rating: {item.rating}</p>
              {item.rating >= 4.5 && (
                <p>
                  <span className="badge">⭐ Best Seller</span>
                </p>
              )}
              <p>Color: {item.color}</p>

              <button className="cart-button" onClick={() => Cartadd(item)}>
                Add to Cart
              </button>

              <Link
                to={`/DetailedProducts/${encodeURIComponent(item.productname)}`}
                className="btn-dd"
              >
                More..
              </Link>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </section>
    </>
  );
}

export { Banner2 };
