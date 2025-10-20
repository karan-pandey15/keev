"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import Navbar from "../navbar/page";
import Footer from "../footer/page";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px", 
    marginTop:"50px"
  };

  const cardStyle = {
    maxWidth: "1000px",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const leftStyle = {
    backgroundColor: "#047F05",
    color: "white",
    flex: "1 1 300px",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const rightStyle = {
    flex: "1 1 300px",
    padding: "40px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "16px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#047F05",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px", // gap between icon and text
  };

  const iconTextStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  };

  return (
  <div>
    <Navbar />

  <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Left Section */}
        <div style={leftStyle}>
          <h2 style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "20px" }}>
            Contact Us
          </h2>
          <p style={{ marginBottom: "30px" }}>
            Have questions about our products or services? Reach out to us — we’d love to help!
          </p>

          <div>
            <div style={iconTextStyle}>
              <Phone size={20} />
              <span>+91 7275759000</span>
            </div>
            <div style={iconTextStyle}>
              <Mail size={20} />
              <span>kanahaiyapandey822@gmail.com</span>
            </div>
            <div style={iconTextStyle}>
              <MapPin size={20} />
              <span>Balipur, Pratapgarh 230001, Near Durga Mandir</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div style={rightStyle}>
          <h3 style={{ fontSize: "24px", marginBottom: "20px" }}>Send us a message</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              style={inputStyle}
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>
      </div>

      <p style={{ marginTop: "20px", color: "#6b7280", fontSize: "14px" }}>
        © {new Date().getFullYear()} Mamta Hardware. All rights reserved.
      </p>
    </div>

    <Footer />
    </div>

  );
}
