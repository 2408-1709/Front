import React from "react";
import { Helmet } from "react-helmet";

function Banner() {
  return (
    <>
      <Helmet>
        <title>GadgetStore | Home</title>
        <meta
          name="description"
          content="Explore the latest digital gadgets that make your life smarter and easier. Shop now for the best deals!"
        />
      </Helmet>

      <section className="hero-banner">
        <div className="banner-overlay"></div>

        <div className="banner-content">
          <h1>Everything You Need, All in One Place</h1>
          <p>
            Discover the latest digital gadgets designed to make your life smarter,
            faster, and more fun — all in one store.
          </p>
          <a href="#shop" className="cta-btn">Shop Now</a>
        </div>
      </section>
    </>
  );
}

export { Banner };
