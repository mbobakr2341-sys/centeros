import PublicSite from "./PublicSite";
import LoginPage from "./Login";
import DashboardPage from "./dashboard/Dashboard";

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/login") {
    return <LoginPage />;
  }

  if (path === "/dashboard") {
    return <DashboardPage />;
  }

  return <PublicSite />;
}

export default App;
