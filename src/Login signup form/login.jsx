import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Login() {
  const goto = useNavigate();
  const [useremail2, setEmail2] = useState("");
  const [userpassword2, setPassword2] = useState("");

  async function Login2(e) {
    e.preventDefault();
    try {
      const rep = await fetch("https://backend-cpcx.vercel.app/sendUsers/alldata");
      if (!rep.ok) throw new Error("Failed to fetch user data");

      const rep2 = await rep.json();
      console.log("📦 Backend response:", rep2);

      // ✅ Adjust depending on your backend response
      const usersArray = Array.isArray(rep2)
        ? rep2
        : rep2.users || rep2.data || [];

      // ✅ Match user by email and password
      const Finddata = usersArray.find(
        (item) => item.email === useremail2 && item.password === userpassword2
      );

      if (Finddata) {
        const capitalUsername =
          Finddata.username.charAt(0).toUpperCase() +
          Finddata.username.slice(1);

        alert(`${capitalUsername}, you logged in successfully!`);

        // ✅ Save full user info
        localStorage.setItem("id", Finddata._id || Finddata.id);
        localStorage.setItem("userEmail", Finddata.email);
        localStorage.setItem("userName", capitalUsername);

        console.log("✅ Saved in LocalStorage:", {
          id: Finddata._id,
          email: Finddata.email,
          username: capitalUsername,
        });

        setTimeout(() => goto("/home"), 1000);
      } else {
        alert("Check your details carefully.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error! Please try again later.");
    }
  }

  return (
    <>
      <Helmet>
        <title>Login | Gadget Store</title>
        <meta
          name="description"
          content="Login to your Gadget Store account to access exclusive deals and track your orders."
        />
        <meta name="keywords" content="Login, Account, Gadget Store, Sign in" />
      </Helmet>

      <div className="Login12">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={Login2}>
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail2(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword2(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <Link to="/signup" className="signup-link">
            Don't have an account? Signup
          </Link>
        </div>
      </div>
    </>
  );
}

export { Login };
