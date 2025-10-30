import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { Helmet } from "react-helmet";
function Header() {
    const navigate = useNavigate();
    const [userProfile, setProfile] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [showProfile2, setShowProfile2] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartUp, setCartUp] = useState([]);
    const { items } = useCart();
    const [getRply, setRply] = useState([]);
    const [Editdt, setEdit] = useState({
        username: "",
        email: "",
        contact: ""
    });
    async function fetchProfile() {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return console.log("No userId found");

            const res = await fetch(`https://backend-cpcx.vercel.app/sendUsers/alldata/${userId}`);
            if (!res.ok) throw new Error("Failed to fetch profile");

            const profile = await res.json();

            if (profile) {
                setProfile(profile);
                setEdit({
                    username: profile.username,
                    email: profile.email,
                    contact: profile.contact,
                });
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
        }
    }
    async function fetchCart() {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return console.log("No userId found");
            const res = await fetch(`https://backend-cpcx.vercel.app/Carts/Cart/${userId}`);
            const cartData = await res.json();
            setCartUp(cartData.cartItems);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }
    useEffect(() => {
        fetchProfile();
        fetchCart();
    }, []);

    useEffect(() => {
        console.log("Fetched userProfile:", userProfile);
    }, [userProfile]);
    async function Edit() {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return alert("User ID not found");

            const patchapi = await fetch(`https://backend-cpcx.vercel.app/sendUsers/alldata/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Editdt),
            });

            if (patchapi.ok) {
                alert("Profile updated successfully");
                fetchProfile(); // refresh updated data without full reload
                setShowProfile2(false);
            } else {
                const errRes = await patchapi.json();
                console.error("Failed to update:", errRes.message);
                alert("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }

    useEffect(() => {
        async function fetchReplies() {
            try {
                const res = await fetch("https://backend-cpcx.vercel.app/RelyDetails/getReplies");
                if (!res.ok) throw new Error("Failed to fetch replies");

                const data = await res.json();
                setRply(data.data); // 'data' is array from backend response
            } catch (err) {
                console.error("Error fetching replies:", err);
            }
        }

        fetchReplies();
    }, []);
const handleProfileClick = async () => {
  await fetchProfile();
  setShowProfile((prev) => !prev);
};
    const handleProfileClick2 = () => setShowProfile2((prev) => !prev);
    const handleLogout = () => navigate("/");
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const HandleEdit = (e) => {
        const { name, value } = e.target;
        setEdit((dt) => ({ ...dt, [name]: value }));
    };

    return (
        <>{/* 🧠 Meta Info */}
            <Helmet>
                <title>GadgetStore | Your Smart Shopping Header</title>
                <meta
                    name="description"
                    content="Explore your cart, wishlist, and profile from the GadgetStore header."
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
                    crossOrigin="anonymous"
                />
            </Helmet>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
                integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />
            <header className="header" id="fixed-header">
                <div className="logo">
                    <Link to={"/home"}>GADGETS</Link>
                </div>

                <div className="menu-toggle" onClick={toggleMenu}>&#9776;</div>

                <nav className={`navbar ${menuOpen ? "show" : ""}`}>
                    <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/upper" onClick={() => setMenuOpen(false)}>Services</Link>
                    <Link to="/middle" onClick={() => setMenuOpen(false)}>About</Link>
                    <div className="wishlist12">
                        <Link to={"/wishlist"}><i class="fas fa-heart" style={{ fontSize: "24px" }}></i></Link>
                        {/* <span className="Cartnum0">{items.length}</span> */}
                    </div>
                    <div className="enquirydata12">
                        <Link to={"/replies"}><i class="fa-solid fa-envelope" style={{ fontSize: "24px" }}></i></Link>
                        {/* <span className="Cartnum1">{getRply.length}</span> */}
                    </div>
                    <div className="cart-wrapper">
                        <Link to="/cart2">
                            <i className="fas fa-shopping-cart" style={{ fontSize: "24px" }}></i>
                        </Link>
                        <span className="Cartnum">{cartUp.length}</span>
                    </div>

                    <div style={{ position: "relative", display: "inline-block" }}>
                        <i
                            className="fas fa-user-alt"
                            onClick={handleProfileClick}
                            style={{ fontSize: "24px", cursor: "pointer" }}
                        ></i>

                        {showProfile && userProfile && (
                            <div className="profile-box22 show" id="Log-outbtn12">
                                <p><strong>Username:</strong> {userProfile.username}</p>
                                <p><strong>Email:</strong> {userProfile.email}</p>
                                <p><strong>Contact:</strong> {userProfile.contact}</p>
                                <button className="logout-button2" onClick={handleLogout}>Log Out</button>
                                <button className="edit-button" onClick={handleProfileClick2}>Edit</button>
                            </div>
                        )}
                    </div>

                    <div style={{ position: "relative", display: "block" }}>
                        {showProfile2 && (
                            <div className="profile-box21 show" id="Edit-data">
                                <label><strong>Name</strong></label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter your name"
                                    value={Editdt.username}
                                    onChange={HandleEdit}
                                />
                                <label><strong>Email</strong></label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter your Email"
                                    value={Editdt.email}
                                    onChange={HandleEdit}
                                />
                                <label><strong>Contact</strong></label>
                                <input
                                    type="text"
                                    name="contact"
                                    placeholder="Enter your Contact"
                                    value={Editdt.contact}
                                    onChange={HandleEdit}
                                />
                                <button onClick={Edit} className="edit-button2">Update</button>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
}

export { Header };
