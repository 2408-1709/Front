import React, { useEffect, useState } from "react";
import { Header } from "./header";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Cart2() {
  const [gadgetsData, setGadgetsData] = useState([]);

  useEffect(() => {
    async function fetchCart() {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return console.log("No userId found");

        const response = await fetch(`https://backend-cpcx.vercel.app/Carts/Cart/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch cart");

        const data = await response.json();
        console.log("Fetched cart data:", data);

        setGadgetsData(data.cartItems.map(item => ({ ...item, id: item._id })));
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    }
    fetchCart();
  }, []);

  async function removeItem(id) {
    await fetch(`https://backend-cpcx.vercel.app/Carts/CartDelete/${id}`, { method: "DELETE" });
    setGadgetsData(prev => prev.filter(item => item.id !== id));
    alert("Item removed from cart successfully");
  }

  async function updateQuantity(id, newQty) {
    const item = gadgetsData.find(i => i.id === id);
    if (!item || newQty < 1) return;

    const updatedItem = { ...item, quantity: newQty };
    await fetch(`https://backend-cpcx.vercel.app/Carts/CartUpdate/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });

    setGadgetsData(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  }

  const subtotal = gadgetsData.reduce((total, item) => {
    const price = parseFloat(item.price);
    const quantity = item.quantity || 1;
    return total + (isNaN(price) ? 0 : price * quantity);
  }, 0);

  return (
    <>
      <Helmet>
        <title>Your Cart - GadgetStore</title>
        <meta
          name="description"
          content="View and manage your shopping cart items at GadgetStore. Update quantities or remove products easily before checkout."
        />
        <meta name="keywords" content="cart, shopping cart, gadgetstore, checkout, online shopping" />
      </Helmet>

      <Header />

      <div className="cart-section">
        <div className="cart-container">
          <h1>Your Shopping Cart</h1>

          {gadgetsData.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "18px", marginTop: "20px" }}>
              Your cart is empty 🛒
            </p>
          ) : (
            gadgetsData.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.imageurl} alt="Product" className="product-image" />
                <div className="item-details">
                  <h2>{item.productname}</h2>
                  <p className="description">{item.description}</p>
                  <p className="price">Price: ₹{parseFloat(item.price).toLocaleString()}</p>

                  <div className="wishlist-actions">
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}>-</button>
                    <span style={{ margin: "0 10px" }}>{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>+</button>
                  </div>

                  <div className="buttons">
                    <button className="remove-btn1" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          <div className="cart-summary">
            <h3>
              Subtotal ({gadgetsData.reduce((sum, item) => sum + (item.quantity || 1), 0)} items): ₹
              {isNaN(subtotal) ? 0 : subtotal.toLocaleString()}
            </h3>
            <button className="checkout-btn">
              <Link to={"/checkout"}>Proceed to Checkout</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { Cart2 };
