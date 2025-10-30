import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const passwordValue = watch("password");
  const [passwordStrength, setPasswordStrength] = useState(null);

  useEffect(() => {
    if (passwordValue) {
      const checks = [
        passwordValue.length >= 8,
        /[A-Z]/.test(passwordValue),
        /[a-z]/.test(passwordValue),
        /\d/.test(passwordValue),
        /[@$!%*?&]/.test(passwordValue),
      ];
      const score = checks.filter(Boolean).length;
      let strength = {};
      if (score <= 2) strength = { color: "red", label: "Weak" };
      else if (score <= 4) strength = { color: "orange", label: "Medium" };
      else strength = { color: "green", label: "Strong" };
      setPasswordStrength(strength);
    } else setPasswordStrength(null);
  }, [passwordValue]);

  async function onSubmit(userData) {
    try {
      const response = await fetch("https://backend-cpcx.vercel.app/sendUsers/alldata");
      if (!response.ok) throw new Error("Failed to fetch user data");
      const usersData = await response.json();

      const emailExists = usersData.users.find(
        (user) => user.email === userData.email
      );
      if (emailExists) {
        alert("Email already exists");
        return;
      }

      const signupResponse = await fetch("http://localhost:7000/sendUsers/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (signupResponse.ok) {
        const createdUser = await signupResponse.json();
        localStorage.setItem("userId", createdUser.user._id); // store userId in localStorage

        alert("Signup successful!");
        reset();
        setTimeout(() => navigate("/"), 1000);
      } else {
        alert("Signup failed! Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error! Please check your connection.");
    }
  }

  return (
    <>

      <Helmet>
        <title>Signup | Gadget Store</title>
        <meta
          name="description"
          content="Create a new account on Gadget Store to access exclusive deals and track your orders."
        />
        <meta name="keywords" content="Signup, Register, Gadget Store, Create Account" />
        <meta property="og:title" content="Signup | Gadget Store" />
        <meta
          property="og:description"
          content="Join Gadget Store and start shopping the latest gadgets today!"
        />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Helmet>

      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p>{errors.username.message}</p>}

          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}

          <input
            type="tel"
            placeholder="Contact Number"
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            })}
          />
          {errors.contact && <p>{errors.contact.message}</p>}

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Must include uppercase, lowercase, number, special character, and 8+ characters.",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}

          {passwordStrength && (
            <p style={{ color: passwordStrength.color }}>
              {passwordStrength.label} Password
            </p>
          )}

          <button type="submit">Create Account</button>
          <Link to="/" className="signup-link">
            Already have an account?
          </Link>
        </form>
      </div>
    </>
  );
}

export { Signup };
