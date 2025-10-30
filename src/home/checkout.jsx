import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Checkout() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [getOrder, setOrder] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        contact: ""
    });

    
    useEffect(() => {
        async function fetchCart() {
            const userId = localStorage.getItem("userId");
            if (!userId) return console.log("No userId found");

            try {
                const res = await fetch(`https://backend-cpcx.vercel.app/Carts/Cart/${userId}`);
                if (!res.ok) throw new Error("Failed to fetch cart");
                const data = await res.json();

               
                if (Array.isArray(data.cartItems)) {
                    setCartItems(data.cartItems.map(item => ({ ...item, id: item._id })));
                } else {
                    setCartItems([]);
                }
            } catch (err) {
                console.error(err);
                setCartItems([]);
            }
        }
        fetchCart();
    }, []);

    const subtotal = cartItems.reduce((total, item) => {
        const price = Number(item.price || 0);
        const quantity = Number(item.quantity || 1);
        return total + price * quantity;
    }, 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder((prev) => ({ ...prev, [name]: value }));
    };

    const placeOrder = async () => {
        const isFormEmpty = Object.values(getOrder).some(value => value.trim() === "");
        if (isFormEmpty) {
            alert("Please fill in all the fields before placing the order.");
            return;
        }

        if (!cartItems.length) {
            alert("Your cart is empty.");
            return;
        }

        try {
            const response = await fetch("https://backend-cpcx.vercel.app/OrderDetails/shipping", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: localStorage.getItem("userId"),
                    cartItems,
                    shipping: getOrder,
                    subtotal
                }),
            });

            if (!response.ok) throw new Error("Failed to place order");

            const savedOrder = await response.json();
            alert("Order placed successfully!");
            navigate(`/thanks/${savedOrder._id}`);
        } catch (err) {
            console.error(err);
            alert("Something went wrong while placing your order.");
        }
    };

    return (
        <>
            <Helmet>
                <title>Checkout - Your Shop</title>
            </Helmet>
            <Header />
            <div className="checkout-container">
                <h1 className="checkout-heading">Checkout</h1>

                <div className="checkout-grid">
                
                    <div className="address-section">
                        <h2 className="section-title">Shipping Address</h2>
                        <form className="address-form">
                            <input type="text" name="name" placeholder="Full Name" value={getOrder.name} onChange={handleChange} />
                            <input type="text" name="address" placeholder="Address Line 1" value={getOrder.address} onChange={handleChange} />
                            <input type="text" name="city" placeholder="City" value={getOrder.city} onChange={handleChange} />
                            <input type="text" name="state" placeholder="State" value={getOrder.state} onChange={handleChange} />
                            <input type="text" name="zipcode" placeholder="ZIP Code" value={getOrder.zipcode} onChange={handleChange} />
                            <input type="text" name="contact" placeholder="Phone Number" value={getOrder.contact} onChange={handleChange} />
                        </form>
                    </div>

                    
                    <div className="order-summary">
                        <h2 className="section-title">Order Summary</h2>
                        <div className="items-list">
                            {cartItems.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="summary-item">
                                        <div>
                                            <h3>{item.productname}</h3>
                                            <p>₹{Number(item.price).toLocaleString()}</p>
                                        </div>
                                        <img src={item.imageurl} alt={item.productname} />
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="subtotal">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <button className="place-order-btn" onClick={placeOrder}>Place your order</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export { Checkout };
