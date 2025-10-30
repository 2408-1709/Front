import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Header } from "./header";
import { useCart } from "react-use-cart";

function Wishlist() {
  const { items, cartTotal, isEmpty, removeItem, emptyCart } = useCart();
  const [userItems, setUserItems] = useState([]);
  const userEmail = localStorage.getItem("userEmail") || "guest";

  // ✅ Load only current user's wishlist
  useEffect(() => {
    const storedData = localStorage.getItem(`wishlist-${userEmail}`);
    if (storedData) {
      setUserItems(JSON.parse(storedData));
    } else {
      setUserItems([]);
    }
  }, [userEmail, items]);

  // ✅ Sync when cart changes
  useEffect(() => {
    localStorage.setItem(`wishlist-${userEmail}`, JSON.stringify(items));
  }, [items, userEmail]);

  if (userItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Wishlist | GadgetStore</title>
        </Helmet>
        <Header />
        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
          Your Wishlist is Empty 🛒
        </h2>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Wishlist | GadgetStore</title>
      </Helmet>

      <Header />
      <div style={{ padding: "2rem" }}>
        <h1 style={{ textAlign: "center" }}>My Wishlist</h1>

        <div
          style={{
            overflowY: userItems.length >= 3 ? "scroll" : "hidden",
            height: userItems.length >= 4 ? "400px" : "inherit",
            marginTop: "1.5rem",
          }}
        >
          {userItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
                background: "#fff",
                borderRadius: "8px",
                padding: "1rem",
                boxShadow: "0 0 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.imageurl}
                alt={item.productname}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div style={{ flex: 1 }}>
                <h2>{item.productname}</h2>
                <p>Price: ₹{item.price}</p>
                <button
                  style={{
                    padding: "0.4rem 1rem",
                    background: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <h2>Total: ₹{cartTotal.toFixed(2)}</h2>
        </div>
      </div>
    </>
  );
}

export { Wishlist };
