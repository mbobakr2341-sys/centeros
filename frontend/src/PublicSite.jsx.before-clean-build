import { useEffect, useState } from "react";
import "./PublicSite.css";

const plans = [
  {
    name: "Starter",
    price: "999",
    description: "For small centers getting started.",
    features: [
      "Student management",
      "Teacher management",
      "Courses & classes",
      "Attendance management",
      "Basic reports",
    ],
  },
  {
    name: "Business",
    price: "1199",
    description: "For growing educational centers.",
    popular: true,
    features: [
      "Everything in Starter",
      "Multiple branches",
      "Payments & revenue",
      "Advanced reports",
      "Staff management",
    ],
  },
  {
    name: "Professional",
    price: "1699",
    description: "For professional center operations.",
    features: [
      "Everything in Business",
      "Advanced analytics",
      "Subscriptions",
      "Notifications",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: null,
    description: "A tailored solution for large organizations.",
    features: [
      "Everything in Professional",
      "Custom configuration",
      "Dedicated support",
      "Advanced integrations",
      "Custom requirements",
    ],
  },
];

function Header({ language, setLanguage }) {
  const [open, setOpen] = useState(false);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#home" className="brand">
          <img src="/newlogo.png" alt="CenterOS" />
          <span>CenterOS</span>
        </a>

        <nav className="desktop-nav">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#packages">Packages</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <div className="language">
            <button
              className="language-button"
              onClick={() => setOpen(!open)}
              aria-label="Language"
            >
              {language.toUpperCase()}
            </button>

            {open && (
              <div className="language-menu">
                <button onClick={() => changeLanguage("ar")}>
                  العربية
                </button>
                <button onClick={() => changeLanguage("en")}>
                  English
                </button>
                <button onClick={() => changeLanguage("tr")}>
                  Türkçe
                </button>
              </div>
            )}
          </div>

          <a href="#booking" className="header-button">
            Book a Call
          </a>
        </div>
      </div>
    </header>
  );
}

function DashboardPreview() {
  return (
    <div className="dashboard-preview">
      <div className="preview-header">
        <div className="preview-brand">
          <img src="/newlogo.png" alt="" />
          <strong>CenterOS</strong>
        </div>

        <div className="preview-user">
          <span />
          Admin
        </div>
      </div>

      <div className="preview-body">
        <aside className="preview-sidebar">
          <div className="side-active">Overview</div>
          <div>Students</div>
          <div>Teachers</div>
          <div>Courses</div>
          <div>Attendance</div>
          <div>Payments</div>
          <div>Reports</div>
        </aside>

        <main className="preview-content">
          <div className="preview-title">
            <div>
              <small>Dashboard</small>
              <h3>Good morning, Admin</h3>
            </div>
            <button>+ Add Student</button>
          </div>

          <div className="preview-stats">
            <div>
              <small>Total Students</small>
              <strong>1,248</strong>
              <span>+12.4%</span>
            </div>

            <div>
              <small>Active Teachers</small>
              <strong>48</strong>
              <span>+5.2%</span>
            </div>

            <div>
              <small>Today's Classes</small>
              <strong>24</strong>
              <span>+8.1%</span>
            </div>

            <div>
              <small>Monthly Revenue</small>
              <strong>86,420</strong>
              <span>+14.8%</span>
            </div>
          </div>

          <div className="preview-grid">
            <div className="chart-card">
              <div className="card-heading">
                <strong>Revenue Overview</strong>
                <span>Last 6 months</span>
              </div>

              <div className="fake-chart">
                <i style={{ height: "38%" }} />
                <i style={{ height: "51%" }} />
                <i style={{ height: "43%" }} />
                <i style={{ height: "67%" }} />
                <i style={{ height: "61%" }} />
                <i style={{ height: "84%" }} />
                <i style={{ height: "76%" }} />
                <i style={{ height: "94%" }} />
              </div>
            </div>

            <div className="activity-card">
              <div className="card-heading">
                <strong>Recent Activity</strong>
                <span>View all</span>
              </div>

              <div className="activity-row">
                <b>AH</b>
                <div>
                  <strong>New student registered</strong>
                  <small>Ahmed Hassan · 5 min ago</small>
                </div>
              </div>

              <div className="activity-row">
                <b>SA</b>
                <div>
                  <strong>Payment received</strong>
                  <small>Sarah Ali · 18 min ago</small>
                </div>
              </div>

              <div className="activity-row">
                <b>OM</b>
                <div>
                  <strong>Class completed</strong>
                  <small>Omar Mohamed · 32 min ago</small>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function PublicSite() {
  const [language, setLanguage] = useState("en");
  const [billing, setBilling] = useState("yearly");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <div className="public-site">
      <div className="launch-bar">
        <div className="container launch-inner">
          <span>Website Launching In</span>

          <div className="countdown">
            <div>
              <strong>89</strong>
              <small>Days</small>
            </div>
            <div>
              <strong>14</strong>
              <small>Hours</small>
            </div>
            <div>
              <strong>32</strong>
              <small>Minutes</small>
            </div>
            <div>
              <strong>18</strong>
              <small>Seconds</small>
            </div>
          </div>
        </div>
      </div>

      <Header
        language={language}
        setLanguage={setLanguage}
      />

      <main>
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <div className="eyebrow">
                COURSE CENTER MANAGEMENT SYSTEM
              </div>

              <h1>
                Manage Your Center
                <br />
                <span>Smarter with CenterOS</span>
              </h1>

              <p>
                A complete management platform designed to help
                educational centers organize students, teachers,
                courses, attendance, payments and daily operations
                from one powerful system.
              </p>

              <div className="hero-actions">
                <a href="#booking" className="primary-button">
                  Book a Call
                </a>

                <a href="#features" className="secondary-button">
                  Explore Features
                </a>
              </div>

              <div className="hero-benefits">
                <div>
                  <span>✓</span>
                  Simple center management
                </div>

                <div>
                  <span>✓</span>
                  Multi-branch support
                </div>

                <div>
                  <span>✓</span>
                  Secure & organized data
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <DashboardPreview />
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="container">
            <div className="section-heading">
              <span>POWERFUL FEATURES</span>
              <h2>Everything your center needs</h2>
              <p>
                CenterOS brings the most important parts of your
                center together in one clean workspace.
              </p>
            </div>

            <div className="features-grid">
              <article className="feature-card">
                <div className="feature-icon">01</div>
                <h3>Student Management</h3>
                <p>
                  Manage student profiles, enrollments, attendance
                  and academic information efficiently.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">02</div>
                <h3>Teachers & Staff</h3>
                <p>
                  Organize teachers, employees, schedules and
                  responsibilities from one dashboard.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">03</div>
                <h3>Courses & Classes</h3>
                <p>
                  Create courses, schedule classes and keep your
                  entire academic operation organized.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">04</div>
                <h3>Payments & Reports</h3>
                <p>
                  Track payments, revenue and important business
                  information through clear reports.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="packages" className="packages-section">
          <div className="container">
            <div className="section-heading">
              <span>OUR PACKAGES</span>
              <h2>Choose the right plan for your center</h2>
              <p>
                Flexible packages designed for centers of different
                sizes and operational needs.
              </p>
            </div>

            <div className="billing-switch">
              <button
                className={billing === "monthly" ? "active" : ""}
                onClick={() => setBilling("monthly")}
              >
                Monthly
              </button>

              <button
                className={billing === "yearly" ? "active" : ""}
                onClick={() => setBilling("yearly")}
              >
                Yearly
                <span>Save more</span>
              </button>
            </div>

            <div className="pricing-grid">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`pricing-card ${
                    plan.popular ? "popular" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="popular-label">
                      Most Popular
                    </div>
                  )}

                  <h3>{plan.name}</h3>

                  <p>{plan.description}</p>

                  {plan.price ? (
                    <div className="price">
                      <strong>
                        {billing === "yearly"
                          ? plan.price
                          : plan.name === "Starter"
                          ? "100"
                          : plan.name === "Business"
                          ? "120"
                          : "170"}
                      </strong>

                      <span>
                        {billing === "yearly"
                          ? " EGP / year"
                          : " USD / month"}
                      </span>
                    </div>
                  ) : (
                    <div className="custom-price">
                      Custom
                    </div>
                  )}

                  <div className="plan-divider" />

                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <span>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a href="#booking" className="plan-button">
                    Get Started
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="container about-grid">
            <div>
              <span className="section-label">ABOUT CENTEROS</span>

              <h2>
                Built to make center management
                <br />
                simpler.
              </h2>

              <p>
                CenterOS is designed around the real daily workflow
                of educational centers. Instead of managing your
                operation across different tools, CenterOS gives
                your team one organized platform.
              </p>

              <p>
                From student registration to attendance, classes,
                payments and reports, everything stays connected.
              </p>
            </div>

            <div className="about-panel">
              <div>
                <strong>01</strong>
                <span>One organized platform</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Designed for growing centers</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Professional & secure</span>
              </div>

              <div>
                <strong>04</strong>
                <span>Easy to use for your entire team</span>
              </div>
            </div>
          </div>
        </section>

        <section id="booking" className="booking-section">
          <div className="container booking-grid">
            <div className="booking-info">
              <span className="section-label">
                GET STARTED
              </span>

              <h2>
                Ready to manage your center smarter?
              </h2>

              <p>
                Tell us a little about your center and our team
                will contact you to discuss the best CenterOS
                package for your needs.
              </p>

              <div className="contact-details">
                <div>
                  <small>Email</small>
                  <strong>centeros@centeros.online</strong>
                </div>

                <div>
                  <small>Response time</small>
                  <strong>Usually within one business day</strong>
                </div>
              </div>
            </div>

            <form
              className="booking-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Booking request submitted successfully.");
              }}
            >
              <div className="form-row">
                <label>
                  Manager Name
                  <input
                    required
                    placeholder="Enter your name"
                  />
                </label>

                <label>
                  Center / Academy Name
                  <input
                    required
                    placeholder="Enter center name"
                  />
                </label>
              </div>

              <label>
                Email Address
                <input
                  required
                  type="email"
                  placeholder="you@example.com"
                />
              </label>

              <div className="form-row">
                <label>
                  Number of Branches
                  <select required defaultValue="">
                    <option value="" disabled>
                      Select
                    </option>
                    <option>1</option>
                    <option>2-3</option>
                    <option>4-5</option>
                    <option>6+</option>
                  </select>
                </label>

                <label>
                  Expected Students
                  <select required defaultValue="">
                    <option value="" disabled>
                      Select
                    </option>
                    <option>Up to 100 students</option>
                    <option>Up to 200 students</option>
                    <option>Up to 300 students</option>
                    <option>Up to 400 students</option>
                    <option>Up to 500 students</option>
                    <option>More than 500 students</option>
                  </select>
                </label>
              </div>

              <label>
                Additional Information
                <textarea
                  rows="5"
                  placeholder="Tell us anything else about your center..."
                />
              </label>

              <button type="submit" className="submit-button">
                Submit Request
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">
              <img src="/newlogo.png" alt="CenterOS" />
              <strong>CenterOS</strong>
            </div>

            <p>
              Course center management, simplified.
            </p>
          </div>

          <div>
            <h4>Navigation</h4>
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#packages">Packages</a>
            <a href="#about">About</a>
          </div>

          <div>
            <h4>Contact</h4>
            <a href="mailto:centeros@centeros.online">
              centeros@centeros.online
            </a>
            <a href="#booking">Book a Call</a>
          </div>
        </div>

        <div className="container footer-bottom">
          © 2026 CenterOS. All rights reserved.
        </div>
      </footer>

      {menuOpen && (
        <div className="mobile-menu-overlay">
          <button onClick={() => setMenuOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default PublicSite;