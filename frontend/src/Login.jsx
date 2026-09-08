import { useState } from "react";
import "./Login.css";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8080";

export default function Login() {
  const [language, setLanguage] = useState("ar");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isArabic = language === "ar";

  const content = {
    ar: {
      title: "تسجيل الدخول",
      welcome: "مرحبًا بك مرة أخرى، يرجى إدخال بياناتك للمتابعة",
      email: "البريد الإلكتروني أو رقم الهاتف",
      emailPlaceholder: "example@centeros.com",
      password: "كلمة المرور",
      passwordPlaceholder: "أدخل كلمة المرور",
      remember: "تذكرني",
      forgot: "نسيت كلمة المرور؟",
      login: "تسجيل الدخول",
      or: "أو",
      welcomeTitle: "مرحبًا بعودتك",
      welcomeText:
        "سجل دخولك إلى حسابك للوصول إلى جميع بيانات وإدارة مركزك التعليمي بسهولة.",
      feature1: "إدارة متكاملة",
      feature1Text: "إدارة جميع جوانب المركز التعليمي من مكان واحد",
      feature2: "تقارير دقيقة",
      feature2Text: "تقارير وإحصائيات تساعدك على اتخاذ قرارات أفضل",
      feature3: "متابعة مستمرة",
      feature3Text: "متابعة الطلاب والحضور والمواعيد بسهولة ومرونة",
      feature4: "دعم دائم",
      feature4Text: "فريق دعم متخصص جاهز لمساعدتك في أي وقت",
      footer: "© 2025 CenterOS. جميع الحقوق محفوظة.",
      terms: "الشروط والأحكام",
      privacy: "سياسة الخصوصية",
      invalid: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      unavailable: "الحساب غير متاح حاليًا. يرجى التواصل مع فريق دعم CenterOS.",
      network: "تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى."
    },
    en: {
      title: "Sign In",
      welcome: "Welcome back, please enter your details to continue",
      email: "Email or phone number",
      emailPlaceholder: "example@centeros.com",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      remember: "Remember me",
      forgot: "Forgot password?",
      login: "Sign In",
      or: "or",
      welcomeTitle: "Welcome Back",
      welcomeText:
        "Sign in to your account to access and manage all your education center data with ease.",
      feature1: "Complete Management",
      feature1Text: "Manage every aspect of your education center from one place",
      feature2: "Accurate Reports",
      feature2Text: "Reports and analytics to help you make better decisions",
      feature3: "Continuous Tracking",
      feature3Text: "Track students, attendance and schedules with ease",
      feature4: "Dedicated Support",
      feature4Text: "A specialized support team ready to help whenever you need",
      footer: "© 2025 CenterOS. All rights reserved.",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      invalid: "Invalid email or password.",
      unavailable: "This account is currently unavailable. Please contact CenterOS support.",
      network: "Unable to connect to the server. Please try again."
    },
    tr: {
      title: "Giriş Yap",
      welcome: "Tekrar hoş geldiniz, devam etmek için bilgilerinizi girin",
      email: "E-posta veya telefon numarası",
      emailPlaceholder: "example@centeros.com",
      password: "Şifre",
      passwordPlaceholder: "Şifrenizi girin",
      remember: "Beni hatırla",
      forgot: "Şifrenizi mi unuttunuz?",
      login: "Giriş Yap",
      or: "veya",
      welcomeTitle: "Tekrar Hoş Geldiniz",
      welcomeText:
        "Eğitim merkezinize ait tüm verilere erişmek ve yönetmek için hesabınıza giriş yapın.",
      feature1: "Eksiksiz Yönetim",
      feature1Text: "Eğitim merkezinizin tüm işlemlerini tek bir yerden yönetin",
      feature2: "Detaylı Raporlar",
      feature2Text: "Daha iyi kararlar almanıza yardımcı olan raporlar ve analizler",
      feature3: "Sürekli Takip",
      feature3Text: "Öğrencileri, yoklamaları ve ders programlarını kolayca takip edin",
      feature4: "Sürekli Destek",
      feature4Text: "Her zaman yardımcı olmaya hazır uzman destek ekibi",
      footer: "© 2025 CenterOS. Tüm hakları saklıdır.",
      terms: "Şartlar ve Koşullar",
      privacy: "Gizlilik Politikası",
      invalid: "E-posta veya şifre hatalı.",
      unavailable: "Hesap şu anda kullanılamıyor. Lütfen CenterOS destek ekibiyle iletişime geçin.",
      network: "Sunucuya bağlanılamadı. Lütfen tekrar deneyin."
    }
  };

  const t = content[language];

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password
        })
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        if (response.status === 401) {
          setError(t.invalid);
        } else if (response.status === 403) {
          setError(t.unavailable);
        } else {
          setError(data.message || data.error || t.invalid);
        }
        return;
      }

      if (data.access_token) {
        localStorage.setItem("centeros_access_token", data.access_token);
      }

      if (data.refresh_token) {
        localStorage.setItem("centeros_refresh_token", data.refresh_token);
      }

      window.location.href = "/dashboard";
    } catch {
      setError(t.network);
    } finally {
      setLoading(false);
    }
  }

  const features = [
    ["shield", t.feature1, t.feature1Text],
    ["chart", t.feature2, t.feature2Text],
    ["calendar", t.feature3, t.feature3Text],
    ["support", t.feature4, t.feature4Text]
  ];

  return (
    <div className={`login-page ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <header className="login-header">
        <a className="login-brand" href="/">
          <img src="/newlogo.png" alt="CenterOS" />
          <div>
            <strong>CenterOS</strong>
            <span>Smart Education Management</span>
          </div>
        </a>

        <div className="language-switcher">
          <span className="globe">●</span>
          {["ar", "tr", "en"].map((item) => (
            <button
              key={item}
              type="button"
              className={language === item ? "active" : ""}
              onClick={() => setLanguage(item)}
            >
              {item === "ar" ? "العربية" : item === "tr" ? "Türkçe" : "English"}
            </button>
          ))}
        </div>
      </header>

      <main className="login-main">
        <section className="login-card">
          <div className="login-info">
            <div className="info-brand">
              <img src="/newlogo.png" alt="CenterOS" />
              <strong>CenterOS</strong>
              <span>Smart Education Management</span>
            </div>

            <h1>{t.welcomeTitle}</h1>
            <p className="info-description">{t.welcomeText}</p>

            <div className="features">
              {features.map(([icon, title, description]) => (
                <div className="feature" key={icon}>
                  <div className={`feature-icon ${icon}`}>
                    {icon === "shield" && "◇"}
                    {icon === "chart" && "▥"}
                    {icon === "calendar" && "□"}
                    {icon === "support" && "◆"}
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="login-form-side">
            <div className="form-inner">
              <h2>{t.title}</h2>
              <p className="form-subtitle">{t.welcome}</p>

              <form onSubmit={handleSubmit}>
                <label htmlFor="login-email">{t.email}</label>
                <div className="input-wrapper">
                  <span className="input-icon">♙</span>
                  <input
                    id="login-email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    autoComplete="username"
                    required
                  />
                </div>

                <label htmlFor="login-password">{t.password}</label>
                <div className="input-wrapper">
                  <span className="input-icon">▣</span>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "◉" : "◎"}
                  </button>
                </div>

                {error && <div className="login-error">{error}</div>}

                <div className="form-options">
                  <label className="remember">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    <span>{t.remember}</span>
                  </label>

                  <button type="button" className="forgot">
                    {t.forgot}
                  </button>
                </div>

                <button className="login-button" type="submit" disabled={loading}>
                  {loading ? "..." : t.login}
                  <span>→</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="login-footer">
        <span>{t.footer}</span>
        <div>
          <button type="button">{t.privacy}</button>
          <i>|</i>
          <button type="button">{t.terms}</button>
        </div>
      </footer>
    </div>
  );
}
