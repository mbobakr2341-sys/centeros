import { useEffect, useMemo, useState } from "react";
import "./PublicSite.css";

const translations = {
  ar: {
    navHome: "الرئيسية",
    navPackages: "الباقات",
    navAbout: "من نحن",
    navContact: "تواصل معنا",
    bookCall: "احجز مكالمة",
    heroBadge: "إدارة تعليمية ذكية",
    heroTitle1: "أدر مركزك",
    heroTitle2: "بذكاء أكبر مع",
    heroTitle3: "Course Center OS",
    heroText:
      "منصة متكاملة لإدارة الطلاب والمدرسين والكورسات والحصص والحضور والمدفوعات وأكثر — كل شيء في مكان واحد.",
    easy: "سهل الاستخدام",
    secure: "آمن وموثوق",
    support: "دعم 24/7",

    completeTitle: "إدارة متكاملة",
    completeText: "أدر كل شيء من الطلاب إلى المدفوعات في منصة واحدة قوية.",
    saveTitle: "وفر وقتك",
    saveText: "أتمت مهامك اليومية وركز على ما يهمك.",
    boostTitle: "ارفع الأداء",
    boostText: "احصل على رؤى فورية واتخذ قرارات أفضل.",
    growTitle: "طوّر مركزك",
    growText: "مصمم للمدارس والمعاهد ومراكز التعليم بمختلف الأحجام.",

    packagesTitle: "باقاتنا",
    packagesText:
      "اختر الباقة التي تناسب احتياجاتك. نقدم باقات مرنة للمراكز بمختلف الأحجام.",
    monthly: "شهري",
    yearly: "سنوي",
    save20: "وفر 20%",
    mostPopular: "الأكثر شعبية",
    getStarted: "ابدأ الآن",
    contactUs: "تواصل معنا",

    starter: "Starter",
    business: "Business",
    professional: "Professional",
    enterprise: "Enterprise",

    starterDesc: "مثالية للمراكز الصغيرة",
    businessDesc: "مثالية للمراكز المتنامية",
    professionalDesc: "للمراكز والمؤسسات الكبيرة",
    enterpriseDesc: "حلول مصممة حسب احتياجاتك",

    launch: "إطلاق الموقع خلال",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني",

    callTitle: "احجز مكالمة",
    callText: "حدد موعدًا مع فريقنا واحصل على كل الإجابات التي تحتاجها.",
    bookNow: "احجز الآن",

    whatsappTitle: "تحدث معنا على WhatsApp",
    whatsappText: "احصل على دعم سريع وإجابات مباشرة.",
    chatNow: "تحدث الآن",

    languageTitle: "اختر اللغة",
    sendInformation: "إرسال المعلومات",

    managerName: "اسم المدير",
    centerName: "اسم المركز / الأكاديمية",
    email: "البريد الإلكتروني",
    branches: "عدد الفروع",
    studentsCount: "عدد الطلاب المتوقع",
    additionalInfo: "معلومات إضافية",
    submitBooking: "إرسال طلب الحجز",
    close: "إغلاق",

    selectBranches: "اختر عدد الفروع",
    selectStudents: "اختر عدد الطلاب",

    successTitle: "تم إرسال طلبك بنجاح",
    successText:
      "شكرًا لك. تم استلام بياناتك، وسيتواصل معك فريق CenterOS قريبًا.",
    continueWhatsapp: "التواصل عبر WhatsApp",

    footerTagline: "إدارة أذكى · مستقبل أفضل",
    rights: "جميع الحقوق محفوظة.",
  },

  en: {
    navHome: "Home",
    navPackages: "Packages",
    navAbout: "About",
    navContact: "Contact",
    bookCall: "Book a Call",
    heroBadge: "Smart Education Management",
    heroTitle1: "Manage Your Center",
    heroTitle2: "Smarter with",
    heroTitle3: "Course Center OS",
    heroText:
      "The all-in-one platform to manage students, teachers, courses, classes, attendance, payments and more — all in one place.",
    easy: "Easy to Use",
    secure: "Secure & Reliable",
    support: "24/7 Support",

    completeTitle: "Complete Management",
    completeText: "Handle everything from students to payments in one powerful platform.",
    saveTitle: "Save Time",
    saveText: "Automate your daily tasks and focus on what matters.",
    boostTitle: "Boost Performance",
    boostText: "Get real-time insights and make better decisions.",
    growTitle: "Grow Your Center",
    growText: "Built for schools, institutes and learning centers of all sizes.",

    packagesTitle: "Our Packages",
    packagesText:
      "Choose the plan that fits your needs. We offer flexible packages for centers of all sizes.",
    monthly: "Monthly",
    yearly: "Yearly",
    save20: "Save 20%",
    mostPopular: "Most Popular",
    getStarted: "Get Started",
    contactUs: "Contact Us",

    starter: "Starter",
    business: "Business",
    professional: "Professional",
    enterprise: "Enterprise",

    starterDesc: "Perfect for small centers",
    businessDesc: "Ideal for growing centers",
    professionalDesc: "For large centers & institutions",
    enterpriseDesc: "Tailored to your needs",

    launch: "Website Launching In",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",

    callTitle: "Book a Call",
    callText: "Schedule a call with our team and get all the answers you need.",
    bookNow: "Book Now",

    whatsappTitle: "Chat on WhatsApp",
    whatsappText: "Get instant support and quick answers.",
    chatNow: "Chat Now",

    languageTitle: "Choose Language",
    sendInformation: "Send Information",

    managerName: "Manager Name",
    centerName: "Center / Academy Name",
    email: "Email Address",
    branches: "Number of Branches",
    studentsCount: "Expected Number of Students",
    additionalInfo: "Additional Information",
    submitBooking: "Send Booking Request",
    close: "Close",

    selectBranches: "Select branches",
    selectStudents: "Select students",

    successTitle: "Request Sent Successfully",
    successText:
      "Thank you. Your information has been received and the CenterOS team will contact you soon.",
    continueWhatsapp: "Continue on WhatsApp",

    footerTagline: "Smarter Management · Brighter Future",
    rights: "All rights reserved.",
  },

  tr: {
    navHome: "Ana Sayfa",
    navPackages: "Paketler",
    navAbout: "Hakkımızda",
    navContact: "İletişim",
    bookCall: "Görüşme Planla",
    heroBadge: "Akıllı Eğitim Yönetimi",
    heroTitle1: "Merkezinizi",
    heroTitle2: "Daha Akıllı Yönetin",
    heroTitle3: "Course Center OS",
    heroText:
      "Öğrencileri, öğretmenleri, kursları, dersleri, yoklamayı, ödemeleri ve daha fazlasını tek bir platformdan yönetin.",
    easy: "Kullanımı Kolay",
    secure: "Güvenli ve Güvenilir",
    support: "7/24 Destek",

    completeTitle: "Eksiksiz Yönetim",
    completeText: "Öğrencilerden ödemelere kadar her şeyi tek platformda yönetin.",
    saveTitle: "Zamandan Tasarruf",
    saveText: "Günlük görevlerinizi otomatikleştirin ve önemli işlere odaklanın.",
    boostTitle: "Performansı Artırın",
    boostText: "Gerçek zamanlı içgörüler alın ve daha iyi kararlar verin.",
    growTitle: "Merkezinizi Büyütün",
    growText: "Her büyüklükteki okul ve eğitim merkezi için tasarlandı.",

    packagesTitle: "Paketlerimiz",
    packagesText:
      "İhtiyaçlarınıza uygun paketi seçin. Her büyüklükteki merkez için esnek paketler sunuyoruz.",
    monthly: "Aylık",
    yearly: "Yıllık",
    save20: "%20 Tasarruf",
    mostPopular: "En Popüler",
    getStarted: "Başlayın",
    contactUs: "Bize Ulaşın",

    starter: "Starter",
    business: "Business",
    professional: "Professional",
    enterprise: "Enterprise",

    starterDesc: "Küçük merkezler için ideal",
    businessDesc: "Büyüyen merkezler için ideal",
    professionalDesc: "Büyük merkezler ve kurumlar için",
    enterpriseDesc: "İhtiyaçlarınıza özel",

    launch: "Web Sitesi Açılışına",
    days: "Gün",
    hours: "Saat",
    minutes: "Dakika",
    seconds: "Saniye",

    callTitle: "Görüşme Planla",
    callText: "Ekibimizle görüşme planlayın ve tüm sorularınıza cevap alın.",
    bookNow: "Şimdi Planla",

    whatsappTitle: "WhatsApp'tan Yazın",
    whatsappText: "Anında destek ve hızlı cevap alın.",
    chatNow: "Şimdi Yaz",

    languageTitle: "Dil Seçin",
    sendInformation: "Bilgi Gönder",

    managerName: "Yönetici Adı",
    centerName: "Merkez / Akademi Adı",
    email: "E-posta",
    branches: "Şube Sayısı",
    studentsCount: "Tahmini Öğrenci Sayısı",
    additionalInfo: "Ek Bilgiler",
    submitBooking: "Rezervasyon Talebi Gönder",
    close: "Kapat",

    selectBranches: "Şube sayısını seçin",
    selectStudents: "Öğrenci sayısını seçin",

    successTitle: "Talebiniz Başarıyla Gönderildi",
    successText:
      "Teşekkür ederiz. Bilgileriniz alındı ve CenterOS ekibimiz kısa süre içinde sizinle iletişime geçecek.",
    continueWhatsapp: "WhatsApp'tan Devam Et",

    footerTagline: "Daha Akıllı Yönetim · Daha Parlak Gelecek",
    rights: "Tüm hakları saklıdır.",
  },
};

const plans = [
  {
    id: "starter",
    icon: "◈",
    price: { monthly: 100,
    yearly: 999, yearly: 999 },
    popular: false,
    titleKey: "starter",
    descKey: "starterDesc",
  },
  {
    id: "business",
    icon: "♔",
    price: { monthly: 120,
    yearly: 1199, yearly: 1199 },
    popular: true,
    titleKey: "business",
    descKey: "businessDesc",
  },
  {
    id: "professional",
    icon: "▦",
    price: { monthly: 170,
    yearly: 1699, yearly: 1699 },
    popular: false,
    titleKey: "professional",
    descKey: "professionalDesc",
  },
  {
    id: "enterprise",
    icon: "◆",
    price: { monthly: null, yearly: null },
    popular: false,
    titleKey: "enterprise",
    descKey: "enterpriseDesc",
  },
];

const studentOptions = [
  "حتى 100 طالب",
  "حتى 200 طالب",
  "حتى 300 طالب",
  "حتى 400 طالب",
  "حتى 500 طالب",
  "أكثر من 500 طالب",
];

function Icon({ type, size = 20 }) {
  const icons = {
    shield: "◈",
    lightning: "ϟ",
    chart: "▥",
    users: "♟",
    calendar: "▣",
    globe: "◎",
    arrow: "→",
    whatsapp: "◉",
    check: "✓",
    moon: "◐",
    mail: "✉",
  };

  return (
    <span
      className={`site-icon site-icon-${type}`}
      style={{ "--icon-size": `${size}px` }}
      aria-hidden="true"
    >
      {icons[type] || "•"}
    </span>
  );
}

function AppMockup({ t }) {
  return (
    <div className="hero-visual">
      <div className="hero-orb orb-one" />
      <div className="hero-orb orb-two" />

      <div className="mockup-main">
        <div className="mockup-top">
          <div className="mockup-brand">
            <img src="/newlogo.png" alt="CenterOS" />
            <div>
              <strong>Course CenterOS</strong>
              <span>Management System</span>
            </div>
          </div>

          <div className="mockup-dots">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="mockup-body">
          <aside className="mockup-sidebar">
            <div className="mock-nav active">
              <Icon type="chart" size={15} />
              <span>Dashboard</span>
            </div>
            <div className="mock-nav">
              <Icon type="users" size={15} />
              <span>Students</span>
            </div>
            <div className="mock-nav">
              <Icon type="users" size={15} />
              <span>Teachers</span>
            </div>
            <div className="mock-nav">
              <Icon type="calendar" size={15} />
              <span>Courses</span>
            </div>
            <div className="mock-nav">
              <Icon type="check" size={15} />
              <span>Attendance</span>
            </div>
            <div className="mock-nav">
              <Icon type="mail" size={15} />
              <span>Payments</span>
            </div>
          </aside>

          <div className="mock-content">
            <div className="mock-heading">
              <div>
                <span>Overview</span>
                <strong>Center Dashboard</strong>
              </div>
              <button type="button">This Month</button>
            </div>

            <div className="mock-stats">
              <div>
                <span>Students</span>
                <strong>1,248</strong>
                <small>↗ 12%</small>
              </div>
              <div>
                <span>Teachers</span>
                <strong>86</strong>
                <small>↗ 8%</small>
              </div>
              <div>
                <span>Courses</span>
                <strong>42</strong>
                <small>↗ 14%</small>
              </div>
            </div>

            <div className="mock-chart-card">
              <div className="mock-chart-head">
                <strong>Monthly Performance</strong>
                <span>2026</span>
              </div>

              <svg
                className="mock-chart"
                viewBox="0 0 600 180"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="mockGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c4dff" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#7c4dff" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <polygon
                  points="0,150 70,132 140,138 210,94 280,108 350,70 420,82 490,38 600,52 600,180 0,180"
                  fill="url(#mockGradient)"
                />

                <polyline
                  points="0,150 70,132 140,138 210,94 280,108 350,70 420,82 490,38 600,52"
                  fill="none"
                  stroke="#744cff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="floating-stat floating-students">
        <div className="floating-icon">
          <Icon type="users" size={18} />
        </div>
        <div>
          <span>Students</span>
          <strong>1,248</strong>
        </div>
        <b>↗ 12%</b>
      </div>

      <div className="floating-stat floating-chart">
        <div className="mini-chart">
          <svg viewBox="0 0 120 45" preserveAspectRatio="none">
            <polyline
              points="0,35 18,29 34,31 52,15 68,21 84,8 100,14 120,4"
              fill="none"
              stroke="#744cff"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <div className="floating-menu">
        {["Students", "Teachers", "Courses", "Attendance", "Payments"].map(
          (item, index) => (
            <div key={item}>
              <Icon
                type={
                  index === 0
                    ? "users"
                    : index === 1
                      ? "users"
                      : index === 2
                        ? "calendar"
                        : index === 3
                          ? "check"
                          : "mail"
                }
                size={15}
              />
              <span>{item}</span>
            </div>
          )
        )}
      </div>

      <div className="mockup-message">
        Better Education
        <br />
        Brighter Future
      </div>
    </div>
  );
}

function PublicSite() {
  const [language, setLanguage] = useState("ar");
  const [billing, setBilling] = useState("monthly");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const t = translations[language];
  const isArabic = language === "ar";

  const [form, setForm] = useState({
    managerName: "",
    centerName: "",
    email: "",
    branches: "",
    studentsCount: "",
    additionalInfo: "",
  });

  const launchDate = useMemo(
    () => new Date("2026-12-04T00:00:00+03:00"),
    []
  );

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";

    return () => {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    };
  }, [language, isArabic]);

  useEffect(() => {
    const updateCountdown = () => {
      const difference = launchDate.getTime() - Date.now();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();

    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, [launchDate]);

  const openBooking = () => {
    setMenuOpen(false);
    setBookingOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeBooking = () => {
    setBookingOpen(false);
    document.body.style.overflow = "";
  };

  const closeSuccess = () => {
    setSuccessOpen(false);
    document.body.style.overflow = "";
  };

  const updateForm = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleBooking = async (event) => {
    event.preventDefault();

    if (sending) return;

    setSending(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Booking request failed");
      }

      closeBooking();
      setSuccessOpen(true);

      const whatsappMessage =
        language === "ar"
          ? `مرحبًا CenterOS، أرسلت طلب حجز.\n\nاسم المدير: ${form.managerName}\nاسم المركز: ${form.centerName}\nالبريد: ${form.email}\nعدد الفروع: ${form.branches}\nعدد الطلاب المتوقع: ${form.studentsCount}\nمعلومات إضافية: ${form.additionalInfo || "لا يوجد"}`
          : language === "tr"
            ? `Merhaba CenterOS, bir görüşme talebi gönderdim.\n\nYönetici: ${form.managerName}\nMerkez: ${form.centerName}\nE-posta: ${form.email}\nŞube sayısı: ${form.branches}\nTahmini öğrenci: ${form.studentsCount}\nEk bilgi: ${form.additionalInfo || "Yok"}`
            : `Hello CenterOS, I submitted a booking request.\n\nManager: ${form.managerName}\nCenter: ${form.centerName}\nEmail: ${form.email}\nBranches: ${form.branches}\nExpected students: ${form.studentsCount}\nAdditional info: ${form.additionalInfo || "None"}`;

      window.open(
        `https://wa.me/201109330703?text=${encodeURIComponent(whatsappMessage)}`,
        "_blank",
        "noopener,noreferrer"
      );

      setForm({
        managerName: "",
        centerName: "",
        email: "",
        branches: "",
        studentsCount: "",
        additionalInfo: "",
      });
    } catch {
      setErrorOpen(true);
      document.body.style.overflow = "hidden";
    } finally {
      setSending(false);
    }
  };

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className={`public-site ${isArabic ? "site-rtl" : "site-ltr"}`}>
      <div className="site-background">
        <div className="background-blob blob-purple" />
        <div className="background-blob blob-blue" />
        <div className="background-grid" />
      </div>

      <header className="site-header">
        <div className="site-nav">
          <button
            className="site-logo"
            type="button"
            onClick={() => goTo("home")}
            aria-label="CenterOS"
          >
            <img src="/newlogo.png" alt="CenterOS" />
            <span>
              <strong>Course</strong>
              <b>CenterOS</b>
            </span>
          </button>

          <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
            <button type="button" onClick={() => goTo("home")}>
              {t.navHome}
            </button>
            <button type="button" onClick={() => goTo("packages")}>
              {t.navPackages}
            </button>
            <button type="button" onClick={() => goTo("about")}>
              {t.navAbout}
            </button>
            <button type="button" onClick={() => goTo("contact")}>
              {t.navContact}
            </button>
          </nav>

          <div className="nav-actions">
            <div className="language-switcher">
              <Icon type="globe" size={17} />
              {["en", "ar", "tr"].map((lang) => (
                <button
                  type="button"
                  key={lang}
                  className={language === lang ? "active" : ""}
                  onClick={() => setLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              className="theme-button"
              type="button"
              aria-label="Theme"
            >
              <Icon type="moon" size={18} />
            </button>

            <button className="header-call-button" type="button" onClick={openBooking}>
              <Icon type="calendar" size={16} />
              {t.bookCall}
            </button>

            <button
              className="mobile-menu-button"
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <section className="hero-section section-shell" id="home">
        <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="badge-spark">✦</span>
              {t.heroBadge}
            </div>

            <h1>
              {t.heroTitle1}
              <br />
              {t.heroTitle2}
              <br />
              <span>{t.heroTitle3}</span>
            </h1>

            <p>{t.heroText}</p>

            <div className="hero-benefits">
              <div>
                <Icon type="lightning" size={16} />
                <span>{t.easy}</span>
              </div>
              <div>
                <Icon type="shield" size={16} />
                <span>{t.secure}</span>
              </div>
              <div>
                <Icon type="support" size={16} />
                <span>{t.support}</span>
              </div>
            </div>
          </div>

          <AppMockup t={t} />
        </div>

        <div className="hero-bottom-line" />
      </section>

      <section className="features-section section-shell" id="about">
        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-icon">
              <Icon type="shield" size={25} />
            </div>
            <div>
              <h3>{t.completeTitle}</h3>
              <p>{t.completeText}</p>
            </div>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <Icon type="lightning" size={27} />
            </div>
            <div>
              <h3>{t.saveTitle}</h3>
              <p>{t.saveText}</p>
            </div>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <Icon type="chart" size={25} />
            </div>
            <div>
              <h3>{t.boostTitle}</h3>
              <p>{t.boostText}</p>
            </div>
          </article>

          <article className="feature-card">
            <div className="feature-icon">
              <Icon type="users" size={25} />
            </div>
            <div>
              <h3>{t.growTitle}</h3>
              <p>{t.growText}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="packages-section section-shell" id="packages">
        <div className="section-heading">
          <div>
            <h2>{t.packagesTitle}</h2>
            <p>{t.packagesText}</p>
            <span className="heading-line" />
          </div>

          <div className="billing-switch">
            <button
              type="button"
              className={billing === "monthly" ? "active" : ""}
              onClick={() => setBilling("monthly")}
            >
              {t.monthly}
            </button>
            <button
              type="button"
              className={billing === "yearly" ? "active" : ""}
              onClick={() => setBilling("yearly")}
            >
              {t.yearly}
            </button>
            <span>{t.save20}</span>
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => {
            const price = plan.price[billing];

            return (
              <article
                className={`pricing-card ${plan.popular ? "popular" : ""}`}
                key={plan.id}
              >
                {plan.popular && (
                  <div className="popular-label">{t.mostPopular}</div>
                )}

                <div className="pricing-icon">
                  <span>{plan.icon}</span>
                </div>

                <h3>{t[plan.titleKey]}</h3>
                <p>{t[plan.descKey]}</p>

                <div className="pricing-price">
                  {price === null ? (
                    <strong>Custom</strong>
                  ) : (
                    <>
                      <strong>${price.toLocaleString("en-US")}</strong>
                      <span>
                        /{billing === "monthly" ? t.monthly.toLowerCase() : t.yearly.toLowerCase()}
                      </span>
                    </>
                  )}
                </div>

                <div className="pricing-divider" />

                <ul>
                  <li>
                    <Icon type="check" size={14} />
                    <span>
                      {plan.id === "starter"
                        ? "Up to 200 students"
                        : plan.id === "business"
                          ? "Up to 500 students"
                          : plan.id === "professional"
                            ? "Up to 1,000 students"
                            : "Unlimited students"}
                    </span>
                  </li>
                  <li>
                    <Icon type="check" size={14} />
                    <span>
                      {plan.id === "starter"
                        ? "Basic reports"
                        : plan.id === "business"
                          ? "Advanced reports"
                          : plan.id === "professional"
                            ? "Full features access"
                            : "Dedicated account manager"}
                    </span>
                  </li>
                  <li>
                    <Icon type="check" size={14} />
                    <span>
                      {plan.id === "starter"
                        ? "Attendance tracking"
                        : plan.id === "business"
                          ? "Teacher management"
                          : plan.id === "professional"
                            ? "Multi-branch support"
                            : "Custom integrations"}
                    </span>
                  </li>
                  <li>
                    <Icon type="check" size={14} />
                    <span>
                      {plan.id === "starter"
                        ? "Email support"
                        : plan.id === "business"
                          ? "Priority support"
                          : plan.id === "professional"
                            ? "24/7 support"
                            : "Advanced security"}
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="pricing-button"
                  onClick={plan.id === "enterprise" ? openBooking : openBooking}
                >
                  {plan.id === "enterprise" ? t.contactUs : t.getStarted}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bottom-tools section-shell" id="contact">
        <article className="tool-card countdown-card">
          <div className="tool-card-heading">
            <div className="tool-icon">
              <Icon type="lightning" size={22} />
            </div>
            <span>{t.launch}</span>
          </div>

          <div className="countdown-grid">
            <div>
              <strong>{String(timeLeft.days).padStart(2, "0")}</strong>
              <span>{t.days}</span>
            </div>
            <div>
              <strong>{String(timeLeft.hours).padStart(2, "0")}</strong>
              <span>{t.hours}</span>
            </div>
            <div>
              <strong>{String(timeLeft.minutes).padStart(2, "0")}</strong>
              <span>{t.minutes}</span>
            </div>
            <div>
              <strong>{String(timeLeft.seconds).padStart(2, "0")}</strong>
              <span>{t.seconds}</span>
            </div>
          </div>
        </article>

        <article className="tool-card call-card">
          <div className="tool-icon">
            <Icon type="calendar" size={22} />
          </div>
          <div>
            <h3>{t.callTitle}</h3>
            <p>{t.callText}</p>
            <button type="button" onClick={openBooking}>
              {t.bookNow}
              <Icon type="arrow" size={15} />
            </button>
          </div>
        </article>

        <article className="tool-card whatsapp-card">
          <div className="tool-icon whatsapp-icon">
            <Icon type="whatsapp" size={23} />
          </div>
          <div>
            <h3>{t.whatsappTitle}</h3>
            <p>{t.whatsappText}</p>
            <a
              href="https://wa.me/201109330703"
              target="_blank"
              rel="noreferrer"
            >
              <Icon type="whatsapp" size={15} />
              {t.chatNow}
            </a>
          </div>
        </article>

        <article className="tool-card language-card">
          <div className="tool-icon">
            <Icon type="globe" size={22} />
          </div>
          <div>
            <h3>{t.languageTitle}</h3>

            <div className="language-select">
              {["en", "ar", "tr"].map((lang) => (
                <button
                  type="button"
                  key={lang}
                  className={language === lang ? "selected" : ""}
                  onClick={() => setLanguage(lang)}
                >
                  {lang === "en" ? "English" : lang === "ar" ? "العربية" : "Türkçe"}
                  {language === lang && <span>✓</span>}
                </button>
              ))}
            </div>

            <button type="button" className="information-button" onClick={openBooking}>
              <Icon type="mail" size={15} />
              {t.sendInformation}
            </button>
          </div>
        </article>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <button
            className="footer-brand"
            type="button"
            onClick={() => goTo("home")}
          >
            <img src="/newlogo.png" alt="CenterOS" />
            <span>
              <strong>Course</strong>
              <b>CenterOS</b>
              <small>{t.footerTagline}</small>
            </span>
          </button>

          <div className="footer-links">
            <button type="button" onClick={() => goTo("home")}>
              {t.navHome}
            </button>
            <button type="button" onClick={() => goTo("packages")}>
              {t.navPackages}
            </button>
            <button type="button" onClick={() => goTo("about")}>
              {t.navAbout}
            </button>
            <button type="button" onClick={() => goTo("contact")}>
              {t.navContact}
            </button>
          </div>

          <div className="footer-social">
            <span aria-hidden="true">𝕏</span>
            <span aria-hidden="true">◎</span>
            <span aria-hidden="true">▶</span>
          </div>

          <p>© 2026 Course Center OS. {t.rights}</p>
        </div>
      </footer>

      {bookingOpen && (
        <div className="modal-backdrop" role="presentation">
          <div className="booking-modal" role="dialog" aria-modal="true">
            <button
              type="button"
              className="modal-close"
              onClick={closeBooking}
              aria-label={t.close}
            >
              ×
            </button>

            <div className="modal-heading">
              <div className="modal-icon">
                <Icon type="calendar" size={24} />
              </div>
              <h2>{t.bookCall}</h2>
              <p>{t.callText}</p>
            </div>

            <form onSubmit={handleBooking}>
              <div className="form-grid">
                <label>
                  <span>{t.managerName}</span>
                  <input
                    required
                    value={form.managerName}
                    onChange={(e) => updateForm("managerName", e.target.value)}
                  />
                </label>

                <label>
                  <span>{t.centerName}</span>
                  <input
                    required
                    value={form.centerName}
                    onChange={(e) => updateForm("centerName", e.target.value)}
                  />
                </label>

                <label>
                  <span>{t.email}</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                </label>

                <label>
                  <span>{t.branches}</span>
                  <select
                    required
                    value={form.branches}
                    onChange={(e) => updateForm("branches", e.target.value)}
                  >
                    <option value="">{t.selectBranches}</option>
                    <option value="1">1</option>
                    <option value="2-3">2–3</option>
                    <option value="4-5">4–5</option>
                    <option value="6+">6+</option>
                  </select>
                </label>

                <label>
                  <span>{t.studentsCount}</span>
                  <select
                    required
                    value={form.studentsCount}
                    onChange={(e) =>
                      updateForm("studentsCount", e.target.value)
                    }
                  >
                    <option value="">{t.selectStudents}</option>
                    {studentOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="full-field">
                  <span>{t.additionalInfo}</span>
                  <textarea
                    rows="4"
                    value={form.additionalInfo}
                    onChange={(e) =>
                      updateForm("additionalInfo", e.target.value)
                    }
                  />
                </label>
              </div>

              <button
                type="submit"
                className="submit-booking-button"
                disabled={sending}
              >
                {sending ? "..." : t.submitBooking}
                {!sending && <Icon type="arrow" size={17} />}
              </button>
            </form>
          </div>
        </div>
      )}

      {successOpen && (
        <div className="modal-backdrop">
          <div className="success-modal" role="dialog" aria-modal="true">
            <div className="success-icon">
              <Icon type="check" size={30} />
            </div>
            <h2>{t.successTitle}</h2>
            <p>{t.successText}</p>

            <div className="success-actions">
              <a
                href="https://wa.me/201109330703"
                target="_blank"
                rel="noreferrer"
                className="success-whatsapp"
              >
                <Icon type="whatsapp" size={17} />
                {t.continueWhatsapp}
              </a>

              <button type="button" onClick={closeSuccess}>
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {errorOpen && (
        <div className="modal-backdrop">
          <div className="error-modal" role="dialog" aria-modal="true">
            <div className="error-icon">!</div>

            <h2>
              {language === "ar"
                ? "حدث خطأ"
                : language === "tr"
                  ? "Bir hata oluştu"
                  : "Something went wrong"}
            </h2>

            <p>
              {language === "ar"
                ? "تعذر إرسال الطلب حاليًا. يمكنك التواصل معنا مباشرة عبر WhatsApp."
                : language === "tr"
                  ? "Talep gönderilemedi. WhatsApp üzerinden bizimle doğrudan iletişime geçebilirsiniz."
                  : "We couldn't send your request. You can contact us directly on WhatsApp."}
            </p>

            <div className="error-actions">
              <a
                href="https://wa.me/201109330703"
                target="_blank"
                rel="noreferrer"
              >
                <Icon type="whatsapp" size={17} />
                01109330703
              </a>

              <button
                type="button"
                onClick={() => {
                  setErrorOpen(false);
                  document.body.style.overflow = "";
                }}
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default PublicSite;
