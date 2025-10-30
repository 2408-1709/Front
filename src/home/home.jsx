import React from "react";
import { Helmet } from "react-helmet";
import { Header } from "../components/header";
import { Banner } from "../components/banner";
import { Banner2 } from "../components/banner2";
import { Footer } from "../components/footer";
import { Middle } from "../components/middle";
import { Upper } from "../components/upper";
import { Feedback } from "../feedback/feedback";

function Home() {
  return (
    <>
      <Helmet>
        <title>GadgetStore | Latest Electronics & Accessories</title>
        <meta
          name="description"
          content="Shop the latest gadgets, electronics, and accessories at GadgetStore. Get exclusive deals, fast delivery, and reliable customer service."
        />
        <meta
          name="keywords"
          content="gadgets, electronics, online shopping, mobile accessories, laptops, headphones"
        />
        <meta property="og:title" content="GadgetStore - Shop Smart Gadgets Online" />
        <meta
          property="og:description"
          content="Discover trending gadgets and electronics at the best prices on GadgetStore."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:5173/home" />
        <meta
          property="og:image"
          content="https://yourcdnlink.com/gadgetstore-preview.jpg"
        />
      </Helmet>

      <Header />
      <Banner />
      <Upper />
      <Banner2 />
      <Middle />
      <Feedback />
      <Footer />
    </>
  );
}

export { Home };
