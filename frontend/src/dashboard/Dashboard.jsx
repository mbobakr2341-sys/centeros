import { useEffect, useState } from "react";
import "./Dashboard.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8080";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch(`${API_URL}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setUser)
      .catch(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  };

  if (!user) return null;

  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <img src="/newlogo.png" alt="CenterOS" />
          <span>CenterOS</span>
        </div>

        <nav>
          <button className="active">Overview</button>
          <button>Students</button>
          <button>Teachers</button>
          <button>Courses</button>
          <button>Classes</button>
          <button>Attendance</button>
          <button>Payments</button>
          <button>Subscriptions</button>
        </nav>

        <button className="logout" onClick={logout}>
          Sign out
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Overview</h1>
            <p>Welcome back, {user.name || user.email}</p>
          </div>

          <div className="dashboard-user">
            <strong>{user.name || "User"}</strong>
            <span>{user.role}</span>
          </div>
        </header>

        <section className="dashboard-stats">
          <article>
            <span>Students</span>
            <strong>0</strong>
          </article>
          <article>
            <span>Teachers</span>
            <strong>0</strong>
          </article>
          <article>
            <span>Courses</span>
            <strong>0</strong>
          </article>
          <article>
            <span>Monthly Revenue</span>
            <strong>EGP 0</strong>
          </article>
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-card">
            <h2>Upcoming Classes</h2>
            <p>No upcoming classes yet.</p>
          </article>

          <article className="dashboard-card">
            <h2>Recent Activity</h2>
            <p>No recent activity yet.</p>
          </article>
        </section>
      </main>
    </div>
  );
}
