import React from "react";
import { Helmet } from "react-helmet";

function Upper() {
  return (
    <>
      <Helmet>
        <title>Top Deals of the Week | GadgetStore</title>
        <meta
          name="description"
          content="Discover the best gadget deals this week – from smartphones to smartwatches, laptops, and headphones, only on GadgetStore!"
        />
        <meta
          name="keywords"
          content="gadgets, top deals, discounts, smartphones, laptops, smartwatches, headphones, gadgetstore"
        />
        <meta property="og:title" content="Top Gadget Deals - GadgetStore" />
        <meta
          property="og:description"
          content="Save big on trending tech – up to 40% off on the latest gadgets this week."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:5173/deals" />
        <meta
          property="og:image"
          content="https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
        />
      </Helmet>

      <section className="top-deals-section">
        <h2 className="deals-heading">🔥 Top Deals of the Week</h2>
        <p className="deals-subheading">
          Get the best value on your favorite gadgets
        </p>

        <div className="deals-grid">
          {[
            {
              img: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
              title: "Smartphone Bonanza",
              desc: "Flat 25% off on selected models.",
              btn: "Grab Deal",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/512/2504/2504840.png",
              title: "Work-from-Home Laptops",
              desc: "Starting from ₹29,999 only.",
              btn: "Explore",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/512/820/820559.png",
              title: "Smartwatch Steals",
              desc: "Up to 40% off + free strap.",
              btn: "Shop Now",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/512/482/482138.png",
              title: "Noise-Canceling Headphones",
              desc: "Buy 1 Get 1 Free.",
              btn: "View Offer",
            },
          ].map((deal, index) => (
            <div
              className="deal-card"
              key={index}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "1.5rem",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              <img
                src={deal.img}
                alt={deal.title}
                style={{ width: "80px", height: "80px", marginBottom: "1rem" }}
              />
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                {deal.title}
              </h3>
              <p style={{ marginBottom: "1rem", color: "#555" }}>{deal.desc}</p>
              <button
                style={{
                  padding: "0.6rem 1.2rem",
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#0056b3")}
                onMouseLeave={(e) => (e.target.style.background = "#007bff")}
              >
                {deal.btn}
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export { Upper };
