import React, { useState } from "react";
import { Helmet } from "react-helmet";

function Feedback() {
  const [getFeedback, setFeedback] = useState({
    name: "",
    email: "",
    gadget: "",
    rating: "",
    comments: ""
  });

  const [enquiry, setEnquiry] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnquiryChange2 = (e) => {
    const { name, value } = e.target;
    setEnquiry((prev) => ({ ...prev, [name]: value }));
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://backend-cpcx.vercel.app/FeedbackDetails/setFeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getFeedback),
      });
      if (res.ok) {
        alert("Feedback submitted successfully!");
        window.location.reload();
      } else {
        alert("Something went wrong with feedback submission.");
      }
    } catch (error) {
      alert("Error submitting feedback.");
    }
  };

  const submitEnquiry = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://backend-cpcx.vercel.app/EnquiryDetails/SetEnquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      if (res.ok) {
        alert("Enquiry submitted successfully!");
        window.location.reload();
      } else {
        alert("Something went wrong with enquiry submission.");
      }
    } catch (error) {
      alert("Error submitting enquiry.");
    }
  };

  return (
    <>
      
      <Helmet>
        <title>Feedback & Enquiry | GadgetStore</title>
        <meta
          name="description"
          content="Share your feedback or make an enquiry at GadgetStore. We value your thoughts and are here to assist with your queries."
        />
        <meta
          name="keywords"
          content="feedback, enquiry, contact gadgetstore, product review, support"
        />
        <meta property="og:title" content="Feedback & Enquiry - GadgetStore" />
        <meta
          property="og:description"
          content="Let us know your experience or reach out for product enquiries. GadgetStore values your opinion!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:5173/feedback" />
        <meta
          property="og:image"
          content="https://yourcdnlink.com/gadgetstore-feedback.jpg"
        />
      </Helmet>

      <div className="main-container" style={{ display: "flex" }}>
      
        <div className="container22" style={{ width: "50%" }}>
          <div className="container23">
            <h2>Digital Gadget Feedback</h2>
            <form>
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
                onChange={handleFeedbackChange}
              />

              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                onChange={handleFeedbackChange}
              />

              <label htmlFor="gadget">Gadget Type:</label>
              <select
                id="gadget"
                name="gadget"
                required
                onChange={handleFeedbackChange}
              >
                <option value="">-- Select --</option>
                <option value="smartphone">Smartphone</option>
                <option value="laptop">Laptop</option>
                <option value="tablet">Tablet</option>
                <option value="smartwatch">Smartwatch</option>
                <option value="other">Other</option>
              </select>

              <label htmlFor="rating">Overall Rating:</label>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={num}>
                    <input
                      type="radio"
                      name="rating"
                      value={num}
                      required
                      onChange={handleFeedbackChange}
                    />{" "}
                    {num}
                  </label>
                ))}
              </div>

              <label htmlFor="comments">Comments / Suggestions:</label>
              <textarea
                id="comments"
                name="comments"
                rows="5"
                placeholder="Your feedback here..."
                onChange={handleFeedbackChange}
              ></textarea>

              <button type="submit" onClick={submitFeedback}>
                Submit Feedback
              </button>
            </form>
          </div>
        </div>

 
        <div className="form-container" style={{ width: "50%" }}>
          <form className="enquiry-form">
            <h2>Enquiry Form</h2>

            <label htmlFor="enquiry-name">Full Name</label>
            <input
              type="text"
              id="enquiry-name"
              name="name"
              placeholder="Vikas Singh Shekhawat"
              required
              onChange={handleEnquiryChange2}
            />

            <label htmlFor="enquiry-email">Email Address</label>
            <input
              type="email"
              id="enquiry-email"
              name="email"
              placeholder="vikas@example.com"
              required
              onChange={handleEnquiryChange2}
            />

            <label htmlFor="phone">Contact Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+91 8767999999"
              required
              onChange={handleEnquiryChange2}
            />

            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Your subject here..."
              required
              onChange={handleEnquiryChange2}
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Your message here..."
              required
              onChange={handleEnquiryChange2}
            ></textarea>

            <button type="submit" onClick={submitEnquiry}>
              Submit Enquiry
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export { Feedback };
