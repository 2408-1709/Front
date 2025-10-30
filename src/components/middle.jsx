import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "./header";
import { Footer } from "./footer";

function Middle() {
  return (
    <>
      <Helmet>
        <title>Why Shop With Us | GadgetStore</title>
        <meta
          name="description"
          content="Experience fast delivery, the best prices, easy returns, and top-rated service when you shop at GadgetStore."
        />
        <meta
          name="keywords"
          content="fast delivery, easy returns, best price, gadgetstore, top rated, online shopping"
        />
        <meta property="og:title" content="Why Choose GadgetStore?" />
        <meta
          property="og:description"
          content="India’s most trusted gadget store offering unbeatable deals, 2-day delivery, and hassle-free returns."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:5173/why-us" />
        <meta
          property="og:image"
          content="https://cdn-icons-png.flaticon.com/512/2920/2920363.png"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Helmet>

      <section className="features-section">
        <h2 className="features-heading">Why Shop With Us?</h2>
        <div className="features-grid">
          {[
            {
              icon: "fas fa-shipping-fast",
              title: "Fast Delivery",
              desc: "Get your gadgets delivered within 2-3 days anywhere in India.",
            },
            {
              icon: "fas fa-rupee-sign",
              title: "Best Price",
              desc: "We offer the lowest prices compared to any online gadget store.",
            },
            {
              icon: "fas fa-undo-alt",
              title: "Easy Returns",
              desc: "7-day return policy on all electronic items without any hassle.",
            },
            {
              icon: "fas fa-star",
              title: "Top Rated",
              desc: "Trusted by over 1 Lakh happy customers across the country.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="feature-card"
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
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              <i
                className={feature.icon}
                style={{
                  fontSize: "2rem",
                  color: "#007bff",
                  marginBottom: "1rem",
                }}
              ></i>
              <h4 style={{ marginBottom: "0.5rem", fontWeight: "600" }}>
                {feature.title}
              </h4>
              <p style={{ color: "#555" }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export { Middle };
