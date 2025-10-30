import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Repliesget() {
    const [replies, setReplies] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch replies
   useEffect(() => {
  async function fetchReplies() {
    const userEmail = localStorage.getItem("userEmail");
    console.log("📩 LocalStorage userEmail:", userEmail); // ✅ Debug log
    if (!userEmail) {
      alert("User email not found in localStorage");
      return;
    }

    try {
      const res = await fetch(`https://backend-cpcx.vercel.app/RelyDetails/getReplies/${userEmail}`);
      if (!res.ok) throw new Error(`Replies fetch failed: ${res.status}`);
      const json = await res.json();
      console.log("Replies response:", json); // ✅ Debug log
      setReplies(Array.isArray(json.data) ? json.data : []);
    } catch (err) {
      console.error("Error fetching replies:", err);
      setReplies([]);
    } finally {
      setLoading(false);
    }
  }

  fetchReplies();
}, []);



    // Fetch messages (enquiries)
    useEffect(() => {
        async function fetchMessages() {
            try {
                const res = await fetch("https://backend-cpcx.vercel.app/EnquiryDetails/GetEnquiry");
                if (!res.ok) throw new Error(`Messages fetch failed: ${res.status}`);
                const json = await res.json();
                console.log("Messages response:", json);
                // IMPORTANT: set the array, not the whole object
                setMessages(Array.isArray(json) ? json : json.data || []);
            } catch (err) {
                console.error("Error fetching messages:", err);
                setMessages([]);
            }
        }
        fetchMessages();
    }, []);

    if (loading) return <p>Loading replies...</p>;

    return (
        <div className="Repliesss">
            <h1 className="rpl-head">Replies</h1>

            {messages.length === 0 ? (
                <p>No messages found.</p>
            ) : (
                messages.map((msg, index) => (
                    <div key={msg._id || msg.id || index} className="reply-item">
                        <div className="Your-message">
                            <h5>Q: {msg.message}</h5>
                        </div>
                        <div className="Your-Answer">
                            <p>
                                Answer: {replies[index]?.Replies ? replies[index].Replies : "No reply yet."}
                            </p>
                        </div>
                    </div>
                ))
            )}

            <Link
                to="/home"
                style={{
                    display: "inline-block",
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    marginTop: "20px",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
                Close
            </Link>

        </div>
    );
}

export { Repliesget };
