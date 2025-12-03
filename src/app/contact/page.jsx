"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success / error message

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setStatus({ type: "success", msg: "Your message has been sent successfully!" });

      // clear fields
      setFormData({ name: "", email: "", message: "" });

    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({ type: "error", msg: "Failed to send message. Please try again." });
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">Contact Us</h1>
        <p className="text-muted">We’d love to hear from you. Send us a message below.</p>
      </div>

      <div className="row justify-content-center">
        {/* Left Column – Info */}
        <div className="col-lg-5 mb-4">
          <div className="p-4 shadow rounded-4 bg-white">
            <h4 className="fw-bold mb-3">Get in Touch</h4>
            <p className="text-muted">
              Whether you have questions, suggestions, feedback, partnership offers, 
              or just want to say hello — feel free to contact us.
            </p>

            <div className="mt-4">
              <h6 className="fw-semibold mb-1">📧 Email</h6>
              <p className="text-muted">support@bibrafx.com</p>

              <h6 className="fw-semibold mb-1">🌍 Platform</h6>
              <p className="text-muted">BibraFX Educational Hub</p>
            </div>
          </div>
        </div>

        {/* Right Column – Contact Form */}
        <div className="col-lg-6">
          <div className="p-4 shadow rounded-4 bg-white">

            {/* STATUS ALERT */}
            {status && (
              <div 
                className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"}`}
                role="alert"
              >
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 py-2"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-control {
          border-radius: 12px;
          padding: 12px;
          border: 2px solid var(--border-color);
        }
        .form-control:focus {
          border-color: var(--primary-blue);
          box-shadow: none;
        }
        .btn-primary {
          background: var(--primary-blue);
          border: none;
          border-radius: 12px;
          font-weight: 600;
        }
        .btn-primary:hover {
          background: var(--secondary-blue);
        }
      `}</style>
    </div>
  );
}
