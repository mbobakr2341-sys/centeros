import { useState } from "react";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8080";

const translations = {
  ar: {
    welcome: "مرحبًا بعودتك",
    subtitle: "سجّل دخولك للوصول إلى حساب مركزك وإدارة جميع بياناتك بسهولة.",
    login: "تسجيل الدخول",
    email: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    password: "كلمة المرور",
    passwordPlaceholder: "أدخل كلمة المرور",
    signIn: "تسجيل الدخول",
    signingIn: "جاري تسجيل الدخول...",
    error: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    network: "تعذر الاتصال بالخادم. حاول مرة أخرى.",
    brand: "إدارة المراكز التعليمية",
  },
  en: {
    welcome: "Welcome back",
    subtitle:
      "Sign in to access your center account and manage everything with ease.",
    login: "Sign in",
    email: "Email address",
    emailPlaceholder: "Enter your email address",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    signIn: "Sign in",
    signingIn: "Signing in...",
    error: "Invalid email or password.",
    network: "Unable to connect to the server. Please try again.",
    brand: "Smart Education Management",
  },
  tr: {
    welcome: "Tekrar hoş geldiniz",
    subtitle:
      "Merkez hesabınıza erişmek ve tüm verilerinizi kolayca yönetmek için giriş yapın.",
    login: "Giriş yap",
    email: "E-posta adresi",
    emailPlaceholder: "E-posta adresinizi girin",
    password: "Şifre",
    passwordPlaceholder: "Şifrenizi girin",
    signIn: "Giriş yap",
    signingIn: "Giriş yapılıyor...",
    error: "E-posta veya şifre hatalı.",
    network: "Sunucuya bağlanılamadı. Lütfen tekrar deneyin.",
    brand: "Akıllı Eğitim Yönetimi",
  },
};

export default function Login() {
  const [language, setLanguage] = useState("ar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const t = translations[language];

  const changeLanguage = (lang) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError(t.error);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.access_token) {
        setError(data.message || data.error || t.error);
        return;
      }

      localStorage.setItem("access_token", data.access_token);

      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }

      window.location.replace("/dashboard");
    } catch {
      setError(t.network);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`login-page ${language === "ar" ? "rtl" : "ltr"}`}>
      <div className="login-background-shape login-shape-one" />
      <div className="login-background-shape login-shape-two" />

      <header className="login-topbar">
        <div className="login-language-switcher">
          <button
            className={language === "en" ? "active" : ""}
            onClick={() => changeLanguage("en")}
            type="button"
          >
            English
          </button>

          <button
            className={language === "tr" ? "active" : ""}
            onClick={() => changeLanguage("tr")}
            type="button"
          >
            Türkçe
          </button>

          <button
            className={language === "ar" ? "active" : ""}
            onClick={() => changeLanguage("ar")}
            type="button"
          >
            العربية
          </button>
        </div>

        <div className="login-brand">
          <img src="/newlogo.png" alt="CenterOS" />
          <div>
            <strong>CenterOS</strong>
            <span>{t.brand}</span>
          </div>
        </div>
      </header>

      <section className="login-content">
        <div className="login-card">
          <div className="login-card-logo">
            <img src="/newlogo.png" alt="CenterOS" />
          </div>

          <h1>{t.welcome}</h1>
          <p className="login-subtitle">{t.subtitle}</p>

          <form onSubmit={handleSubmit} className="login-form">
            <label>
              <span>{t.email}</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                autoComplete="username"
                disabled={loading}
                dir="ltr"
              />
            </label>

            <label>
              <span>{t.password}</span>

              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  autoComplete="current-password"
                  disabled={loading}
                  dir="ltr"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <button className="login-submit" type="submit" disabled={loading}>
              {loading ? t.signingIn : t.signIn}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
