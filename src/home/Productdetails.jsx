import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function DetailedProducts() {
  const goto = useNavigate();
  const [product, setProduct] = useState(null);
  const { productname } = useParams(); 

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://backend-cpcx.vercel.app/ProductDetails/getProducts/${productname}`);
        const data = await response.json();
        if (response.ok) {
          setProduct(data);
        } else {
          console.error("Failed to fetch product:", data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, [productname]);

  if (!product)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{product.productname} | GadgetStore</title>
        <meta
          name="description"
          content={`Buy ${product.productname} at ₹${product.price}. Category: ${product.category}. Rating: ${product.rating}/5`}
        />
      </Helmet>

      <div className="overlay">
        <div className="detail-card">
          <img width={300} src={product.imageurl} alt={product.productname} />
          <h2>{product.productname}</h2>
          <p>About: {product.description}</p>
          <h4>Price: ₹{product.price}</h4>
          <p>Category: {product.category}</p>
          <h6>Rating: {product.rating}</h6>
          <p>Colors: {product.color}</p>
          <h6>Offers Available: {product.offer}</h6>
          <button onClick={() => goto("/home")}>Close</button>
        </div>
      </div>
    </>
  );
}

export { DetailedProducts };
