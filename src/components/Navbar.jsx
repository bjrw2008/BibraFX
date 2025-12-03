// src/components/Navbar.jsx  (or wherever your Navbar lives)
"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { searchDocuments } from "@/lib/searchDocuments";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Search state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close results if clicked outside
  const containerRef = useRef(null);
  useEffect(() => {
    function onDocClick(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        // clear results but keep query text
        setResults([]);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // Debounced search effect (client side)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query || query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchDocuments(query);
        setResults(res);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350); // 350ms debounce

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="container">
        {/* Brand Logo */}
        <Link href="/" className="navbar-brand">
          <div className="d-flex align-items-center">
            <div className="brand-logo me-2">
              <i className="fas fa-chart-line text-warning"></i>
            </div>
            <span className="fw-bold fs-3 text-gradient">BibraFX</span>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Navigation Links (unchanged) */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link">
                <i className="fas fa-home me-2"></i>Home
              </Link>
            </li>

            {/* Forex Categories Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i className="fas fa-coins me-2"></i>
                Forex Trading
              </a>
              <ul className="dropdown-menu">
                <li><Link href="/forex-trading" className="dropdown-item">All Forex Materials</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link href="/forex-trading" className="dropdown-item">Technical Analysis</Link></li>
                <li><Link href="/forex-trading" className="dropdown-item">Fundamental Analysis</Link></li>
                <li><Link href="/forex-trading" className="dropdown-item">Risk Management</Link></li>
                <li><Link href="/forex-trading" className="dropdown-item">Trading Psychology</Link></li>
              </ul>
            </li>

            {/* Other Subjects Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i className="fas fa-graduation-cap me-2"></i>
                Other Subjects
              </a>
              <ul className="dropdown-menu">
                <li><Link href="/computer-science" className="dropdown-item">Computer Science</Link></li>
                <li><Link href="/mathematics" className="dropdown-item">Mathematics</Link></li>
                <li><Link href="/economics" className="dropdown-item">Economics</Link></li>
                <li><Link href="/business" className="dropdown-item">Business</Link></li>
                <li><Link href="/all-subjects" className="dropdown-item">View All Subjects</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link href="/about" className="nav-link">
                <i className="fas fa-info-circle me-2"></i>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">
                <i className="fas fa-envelope me-2"></i>
                Contact
              </Link>
            </li>
          </ul>

          {/* Search Box (keeps your same markup & style) */}
          <div className="d-flex align-items-center" ref={containerRef} style={{ position: "relative" }}>
            <div className="input-group search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Search documents..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="button" onClick={() => {/* optional explicit search */}}>
                <i className="fas fa-search"></i>
              </button>
            </div>

            {/* Results dropdown (preserves your visual style) */}
            {query.trim().length >= 2 && (
              <div className="search-results shadow" style={{
                position: "absolute",
                top: "48px",
                right: 0,
                width: 340,
                background: "#fff",
                borderRadius: 10,
                zIndex: 10000,
                maxHeight: 360,
                overflowY: "auto",
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
              }}>
                {loading && <div className="p-3 text-muted">Searching...</div>}

                {!loading && results.length === 0 && (
                  <div className="p-3 text-muted">No results found</div>
                )}

                {!loading && results.map((r, i) => (
                  <Link
                    key={`${r.collection}-${r.id}`}
                    href={`/${r.collection}/${r.slug}`}
                    className="d-block p-3 text-decoration-none"
                    onClick={() => { setQuery(""); setResults([]); }}
                    style={{ borderBottom: "1px solid #f1f1f1", color: "#222" }}
                  >
                    <div className="d-flex align-items-start gap-2">
                      {r.thumbnailUrl ? (
                        <img src={r.thumbnailUrl} alt={r.title} style={{ width: 56, height: 40, objectFit: "cover", borderRadius: 6 }} />
                      ) : (
                        <div style={{ width: 56, height: 40, background: "#f2f2f2", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6 }}>
                          <i className="fas fa-file-pdf text-muted"></i>
                        </div>
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600 }}>{r.title}</div>
                        <div style={{ fontSize: 12, color: "#6b7280" }}>{r.collection.replace("-", " ") } • {r.author || ""}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Styles — your original styles preserved */}
      <style jsx>{`
        .navbar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          padding: 1rem 0;
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }

        .navbar-scrolled {
          background: rgba(255, 255, 255, 0.98);
          padding: 0.5rem 0;
          box-shadow: 0 4px 30px rgba(0,0,0,0.15);
        }

        .brand-logo {
          width: 40px;
          height: 40px;
          background: var(--gradient-primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-logo i {
          font-size: 1.2rem;
          color: white;
        }

        .nav-link {
          font-weight: 500;
          color: var(--text-dark) !important;
          transition: all 0.3s ease;
          margin: 0 0.5rem;
        }

        .nav-link:hover {
          color: var(--primary-blue) !important;
          transform: translateY(-2px);
        }

        .search-box {
          width: 300px;
        }

        .search-box input {
          border-radius: 25px 0 0 25px;
          border: 2px solid var(--border-color);
          border-right: none;
        }

        .search-box button {
          border-radius: 0 25px 25px 0;
          border: 2px solid var(--primary-blue);
          background: var(--primary-blue);
          color: white;
        }

        .search-box button:hover {
          background: var(--secondary-blue);
        }

        @media (max-width: 991px) {
          .search-box {
            width: 100%;
            margin-top: 1rem;
          }
        }
      `}</style>
    </nav>
  );
}
