import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Header } from "../components/header";

function Thanks() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // estimated delivery after 5 days
  const delivery = new Date();
  delivery.setDate(delivery.getDate() + 5);

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const response = await fetch(
          `https://backend-cpcx.vercel.app/OrderDetails/shipping/${orderId}`
        );
        if (!response.ok) throw new Error("Failed to fetch order");
        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>Loading your order details...</p>
      </div>
    );
  }

  if (error || !orderDetails) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        <p>Order not found! Please try again.</p>
      </div>
    );
  }

  const { shipping, cartItems, subtotal, _id } = orderDetails;

  return (
    <>
      <Helmet>
        <title>Thank You for Your Order | GadgetStore</title>
        <meta
          name="description"
          content={`Thank you for your purchase! View your order details and track delivery for Order #${_id}.`}
        />
        <meta name="keywords" content="thank you, order, gadgetstore, ecommerce" />
      </Helmet>

      <Header />
      <div
        className="confirmation-container"
        style={{ textAlign: "center", padding: "2rem" }}
      >
        <div
          className="confirmation-card"
          style={{
            maxWidth: "600px",
            margin: "auto",
            background: "#fff",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <h1 className="thank-you" style={{ color: "#28a745" }}>
            🎉 Thank You for Your Order!
          </h1>
          <p className="order-id">
            Order ID: <strong>#{_id}</strong>
          </p>
          <p className="delivery-estimate">
            Estimated Delivery: <strong>{delivery.toDateString()}</strong>
          </p>

          <div
            className="confirmation-details"
            style={{ textAlign: "left", marginTop: "1.5rem" }}
          >
            <h2>Shipping To:</h2>
            <p>{shipping.name}</p>
            <p>
              {shipping.address}, {shipping.city}, {shipping.state}
            </p>
            <p>{shipping.zipcode}</p>
            <p>Contact: {shipping.contact}</p>
          </div>

          <div
            className="order-items"
            style={{ textAlign: "left", marginTop: "1.5rem" }}
          >
            <h2>Order Items:</h2>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="order-item"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <img src={item.imageurl} alt={item.productname} width={50} />
                  <span>
                    {item.productname} x {item.quantity || 1}
                  </span>
                  <span>₹{Number(item.price).toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p>No items found.</p>
            )}
            <p
              className="subtotal"
              style={{ fontWeight: "bold", marginTop: "1rem" }}
            >
              Subtotal: ₹{Number(subtotal).toLocaleString()}
            </p>
          </div>

          <div className="confirmation-actions" style={{ marginTop: "2rem" }}>
            <button
              className="btn continue"
              style={{
                marginRight: "1rem",
                padding: "0.5rem 1.5rem",
                borderRadius: "8px",
                border: "none",
                background: "#007bff",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => navigate("/home")}
            >
              Continue Shopping
            </button>
            <button
              className="btn track"
              style={{
                padding: "0.5rem 1.5rem",
                borderRadius: "8px",
                border: "none",
                background: "#28a745",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => navigate("/orders")}
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { Thanks };
