import { useEffect, useMemo, useState } from "react";
import "./PublicSite.css";

const plans = [
  {
    key: "starter",
    name: "Starter",
    subtitle: "للأكاديميات والمراكز الصغيرة",
    monthly: 100,
    yearly: 999,
    accent: "green",
    features: [
      "حتى 200 طالب",
      "حتى 10 معلمين",
      "حتى 15 كورس",
      "فرع واحد",
      "حتى 5 مستخدمين إداريين",
      "إدارة الطلاب والمعلمين",
      "إدارة الدروس والجداول",
      "الحضور والغياب",
      "إدارة المدفوعات",
      "تقارير أساسية",
      "دعم عبر البريد الإلكتروني",
    ],
  },
  {
    key: "business",
    name: "Business",
    subtitle: "للأكاديميات المتوسطة",
    monthly: 120,
    yearly: 1199,
    accent: "blue",
    features: [
      "حتى 500 طالب",
      "حتى 30 معلم",
      "كورسات غير محدودة",
      "فرع واحد",
      "حتى 15 مستخدمًا إداريًا",
      "صلاحيات متقدمة",
      "أدوار مخصصة",
      "سجل النشاط",
      "تقارير حضور متقدمة",
      "تقارير مالية متقدمة",
      "تحليلات الطلاب والحضور",
      "دعم ذو أولوية",
    ],
  },
  {
    key: "professional",
    name: "Professional",
    subtitle: "للأكاديميات الكبيرة",
    monthly: 170,
    yearly: 1699,
    accent: "purple",
    popular: true,
    features: [
      "حتى 1,500 طالب",
      "معلمون غير محدودين",
      "كورسات غير محدودة",
      "حتى 3 فروع",
      "مستخدمون إداريون غير محدودين",
      "إدارة متعددة الفروع",
      "مديرو الفروع",
      "مقارنة أداء الفروع",
      "تحليلات متقدمة",
      "تقارير قابلة للتخصيص",
      "API Access",
      "تخصيص الهوية والألوان",
      "Onboarding Assistance",
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    subtitle: "للمؤسسات والأكاديميات الكبيرة",
    enterprise: true,
    accent: "orange",
    features: [
      "عدد طلاب مخصص",
      "فروع غير محدودة حسب الاتفاق",
      "White Label",
      "Custom Domain",
      "تطبيقات مخصصة",
      "Workflows مخصصة",
      "Integrations",
      "Advanced API",
      "تقارير مخصصة",
      "ترحيل البيانات",
      "تدريب الموظفين",
      "Dedicated Support",
      "SLA",
      "بنية تحتية مخصصة عند الحاجة",
    ],
  },
];

const features = [
  {
    title: "إدارة متكاملة",
    text: "أدر الطلاب والمعلمين والكورسات والدروس والجداول من مكان واحد.",
    icon: "▦",
  },
  {
    title: "حضور دقيق",
    text: "سجل الحضور والغياب والتأخير وتابع تاريخ حضور كل طالب.",
    icon: "✓",
  },
  {
    title: "تقارير واضحة",
    text: "احصل على رؤية أوضح للأداء والحضور والمدفوعات والنمو.",
    icon: "▥",
  },
  {
    title: "أمان وخصوصية",
    text: "بيانات مؤسستك في نظام مصمم لإدارة الوصول والصلاحيات بأمان.",
    icon: "◇",
  },
];

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function AppMockup() {
  const isArabic = document.documentElement.lang === "ar";
  const language = document.documentElement.lang;

  const text = {
    ar: {
      home: "الرئيسية",
      students: "الطلاب",
      teachers: "المعلمون",
      lessons: "الدروس",
      attendance: "الحضور",
      payments: "المدفوعات",
      reports: "التقارير",
      settings: "الإعدادات",
      dashboard: "لوحة التحكم",
      welcome: "مرحبًا بك في CenterOS",
      summary: "إليك ملخص أداء الأكاديمية اليوم",
      live: "مباشر",
      studentsCount: "الطلاب",
      teachersCount: "المعلمون",
      courses: "الكورسات",
      attendanceRate: "نسبة الحضور",
      attendanceOverview: "نظرة عامة على الحضور",
      thisWeek: "هذا الأسبوع",
      recentActivity: "آخر العمليات",
      newStudent: "تسجيل طالب جديد",
      paymentUpdate: "تحديث دفعة",
      addLesson: "إضافة حصة",
      minutes8: "منذ 8 دقائق",
      minutes21: "منذ 21 دقيقة",
      minutes35: "منذ 35 دقيقة",
      monthlyRevenue: "الإيرادات الشهرية",
    },
    tr: {
      home: "Ana Sayfa",
      students: "Öğrenciler",
      teachers: "Öğretmenler",
      lessons: "Dersler",
      attendance: "Yoklama",
      payments: "Ödemeler",
      reports: "Raporlar",
      settings: "Ayarlar",
      dashboard: "Kontrol Paneli",
      welcome: "CenterOS'a hoş geldiniz",
      summary: "Akademinizin bugünkü performans özeti",
      live: "Canlı",
      studentsCount: "Öğrenciler",
      teachersCount: "Öğretmenler",
      courses: "Kurslar",
      attendanceRate: "Yoklama oranı",
      attendanceOverview: "Yoklama genel görünümü",
      thisWeek: "Bu hafta",
      recentActivity: "Son işlemler",
      newStudent: "Yeni öğrenci kaydı",
      paymentUpdate: "Ödeme güncellemesi",
      addLesson: "Ders ekleme",
      minutes8: "8 dakika önce",
      minutes21: "21 dakika önce",
      minutes35: "35 dakika önce",
      monthlyRevenue: "Aylık gelir",
    },
    en: {
      home: "Home",
      students: "Students",
      teachers: "Teachers",
      lessons: "Lessons",
      attendance: "Attendance",
      payments: "Payments",
      reports: "Reports",
      settings: "Settings",
      dashboard: "Dashboard",
      welcome: "Welcome to CenterOS",
      summary: "Here is your academy's performance summary for today",
      live: "Live",
      studentsCount: "Students",
      teachersCount: "Teachers",
      courses: "Courses",
      attendanceRate: "Attendance rate",
      attendanceOverview: "Attendance overview",
      thisWeek: "This week",
      recentActivity: "Recent activity",
      newStudent: "New student registration",
      paymentUpdate: "Payment update",
      addLesson: "Lesson added",
      minutes8: "8 minutes ago",
      minutes21: "21 minutes ago",
      minutes35: "35 minutes ago",
      monthlyRevenue: "Monthly revenue",
    },
  };

  const t = text[language] || text.en;

  return (
    <div className="mockup-shell">
      <div className="mockup-glow" />

      <div className="dashboard-window">
        <div className="dashboard-top">
          <div className="mock-logo">
            <img src="/logo.png" alt="CenterOS" />
            <strong>CenterOS</strong>
          </div>

          <div className="mock-top-actions">
            <span className="mock-search" />
            <span className="mock-circle" />
            <span className="mock-avatar" />
          </div>
        </div>

        <div className="dashboard-body">
          <aside className="mock-sidebar">
            <div className="side-active">{t.home}</div>
            <div>{t.students}</div>
            <div>{t.teachers}</div>
            <div>{t.lessons}</div>
            <div>{t.attendance}</div>
            <div>{t.payments}</div>
            <div>{t.reports}</div>
            <div>{t.settings}</div>
          </aside>

          <main className="mock-content">
            <div className="mock-welcome">
              <div>
                <small>{t.dashboard}</small>
                <h3>{t.welcome}</h3>
                <p>{t.summary}</p>
              </div>
              <span className="mock-status">{t.live}</span>
            </div>

            <div className="mock-stats">
              <div>
                <small>{t.studentsCount}</small>
                <strong>1,248</strong>
                <span>+12.5%</span>
              </div>

              <div>
                <small>{t.teachersCount}</small>
                <strong>86</strong>
                <span>+8.2%</span>
              </div>

              <div>
                <small>{t.courses}</small>
                <strong>32</strong>
                <span>+4.1%</span>
              </div>

              <div>
                <small>{t.attendanceRate}</small>
                <strong>91%</strong>
                <span>+6.4%</span>
              </div>
            </div>

            <div className="mock-chart-card">
              <div className="mock-card-title">
                <strong>{t.attendanceOverview}</strong>
                <span>{t.thisWeek}</span>
              </div>

              <div className="fake-chart">
                <div className="chart-line">
                  <i style={{ left: "4%", bottom: "34%" }} />
                  <i style={{ left: "18%", bottom: "52%" }} />
                  <i style={{ left: "32%", bottom: "44%" }} />
                  <i style={{ left: "47%", bottom: "66%" }} />
                  <i style={{ left: "62%", bottom: "59%" }} />
                  <i style={{ left: "77%", bottom: "79%" }} />
                  <i style={{ left: "92%", bottom: "75%" }} />
                </div>

                <div className="chart-grid" />
              </div>
            </div>

            <div className="mock-bottom-grid">
              <div className="mock-list">
                <strong>{t.recentActivity}</strong>

                <div>
                  <span>{t.newStudent}</span>
                  <b>{t.minutes8}</b>
                </div>

                <div>
                  <span>{t.paymentUpdate}</span>
                  <b>{t.minutes21}</b>
                </div>

                <div>
                  <span>{t.addLesson}</span>
                  <b>{t.minutes35}</b>
                </div>
              </div>

              <div className="mock-mini-card">
                <small>{t.monthlyRevenue}</small>
                <strong>$18,420</strong>

                <div className="mini-bars">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Countdown() {
  const launchDate = useMemo(
    () => new Date("2026-12-04T00:00:00+03:00"),
    []
  );

  const calculate = () => {
    const difference = Math.max(0, launchDate.getTime() - Date.now());

    return {
      days: Math.floor(difference / 86400000),
      hours: Math.floor((difference / 3600000) % 24),
      minutes: Math.floor((difference / 60000) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calculate);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculate());
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const items = [
    ["يوم", time.days],
    ["ساعة", time.hours],
    ["دقيقة", time.minutes],
    ["ثانية", time.seconds],
  ];

  return (
    <div className="countdown">
      {items.map(([label, value]) => (
        <div className="countdown-item" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function PublicSite() {
  const [language, setLanguage] = useState("ar");
  const [billing, setBilling] = useState("monthly");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const isArabic = language === "ar";

  const t = {
    navHome: isArabic ? "الرئيسية" : language === "tr" ? "Ana Sayfa" : "Home",
    navFeatures: isArabic ? "المميزات" : language === "tr" ? "Özellikler" : "Features",
    navPricing: isArabic ? "الأسعار" : language === "tr" ? "Fiyatlandırma" : "Pricing",
    navAddons: isArabic ? "الإضافات" : language === "tr" ? "Eklentiler" : "Add-ons",
    navAbout: isArabic ? "عن النظام" : language === "tr" ? "Sistem Hakkında" : "About",
    navContact: isArabic ? "تواصل معنا" : language === "tr" ? "İletişim" : "Contact",
    book: isArabic ? "احجز مكانك الآن" : language === "tr" ? "Şimdi Yer Ayırt" : "Book Your Place",

    featuresTitle: isArabic ? "لماذا تختار CenterOS؟" : language === "tr" ? "Neden CenterOS?" : "Why choose CenterOS?",
    featuresText: isArabic
      ? "أدوات واضحة تساعدك على إدارة مؤسستك التعليمية بكفاءة أكبر."
      : language === "tr"
      ? "Eğitim kurumunuzu daha verimli yönetmenize yardımcı olan araçlar."
      : "Clear tools to manage your educational organization more efficiently.",

    pricingTitle: isArabic ? "خطط مرنة تناسب احتياجاتك" : language === "tr" ? "İhtiyaçlarınıza uygun esnek planlar" : "Flexible plans that fit your needs",
    pricingText: isArabic
      ? "اختر الخطة المناسبة لحجم مؤسستك التعليمية."
      : language === "tr"
      ? "Eğitim kurumunuzun büyüklüğüne uygun planı seçin."
      : "Choose the plan that fits your educational organization.",

    monthly: isArabic ? "شهري" : language === "tr" ? "Aylık" : "Monthly",
    yearly: isArabic ? "سنوي" : language === "tr" ? "Yıllık" : "Yearly",
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="public-site">
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />

      <header className="site-header">
        <div className="container header-inner">
          <button className="brand" onClick={() => scrollTo("home")}>
            <img src="/logo.png" alt="CenterOS" />
            <span>CenterOS</span>
          </button>

          <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
            <button onClick={() => scrollTo("home")}>{t.navHome}</button>
            <button onClick={() => scrollTo("features")}>{t.navFeatures}</button>
            <button onClick={() => scrollTo("pricing")}>{t.navPricing}</button>
            <button onClick={() => scrollTo("addons")}>{t.navAddons}</button>
            <button onClick={() => scrollTo("about")}>{t.navAbout}</button>
            <button onClick={() => scrollTo("contact")}>{t.navContact}</button>
          </nav>

          <div className="header-actions">
            <div className="language-switcher">
              {["ar", "en", "tr"].map((lang) => (
                <button
                  key={lang}
                  className={language === lang ? "active" : ""}
                  onClick={() => setLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <button className="header-book" onClick={() => scrollTo("contact")}>
              {t.book}
            </button>

            <button
              className="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">CENTER MANAGEMENT PLATFORM</div>

              <h1>
                CenterOS
                <span>
                  {isArabic
                    ? "منصة إدارة متكاملة للأكاديميات"
                    : language === "tr"
                    ? "Akademiler için kapsamlı yönetim platformu"
                    : "Complete management platform for academies"}
                </span>
                <em>
                  {isArabic
                    ? "وتنمو بثقة"
                    : language === "tr"
                    ? "ve güvenle büyüyün"
                    : "and grow with confidence"}
                </em>
              </h1>

              <p className="hero-description">
                {isArabic
                  ? "كل ما تحتاجه لإدارة الطلاب، المعلمين، الدروس، الحضور، المدفوعات والتقارير في منصة واحدة سهلة وآمنة."
                  : language === "tr"
                  ? "Öğrencileri, öğretmenleri, dersleri, yoklamayı, ödemeleri ve raporları tek bir kolay ve güvenli platformdan yönetin."
                  : "Everything you need to manage students, teachers, lessons, attendance, payments, and reports in one simple and secure platform."}
              </p>

              <div className="hero-points">
                <span>
                  {isArabic
                    ? "يعمل على جميع الأجهزة"
                    : language === "tr"
                    ? "Tüm cihazlarda çalışır"
                    : "Works on all devices"}
                </span>

                <span>
                  {isArabic
                    ? "أمان وخصوصية"
                    : language === "tr"
                    ? "Güvenlik ve gizlilik"
                    : "Security & privacy"}
                </span>

                <span>
                  {isArabic
                    ? "دعم مستمر"
                    : language === "tr"
                    ? "Sürekli destek"
                    : "Ongoing support"}
                </span>
              </div>

              <div className="launch-card">
                <div className="launch-header">
                  <div>
                    <small>
                      {isArabic
                        ? "الإطلاق الرسمي"
                        : language === "tr"
                        ? "Resmi lansman"
                        : "Official launch"}
                    </small>

                    <strong>
                      {isArabic
                        ? "متبقي حتى الإطلاق"
                        : language === "tr"
                        ? "Lansmana kalan süre"
                        : "Time until launch"}
                    </strong>
                  </div>

                  <span className="launch-badge">
                    {isArabic
                      ? "90 يوم"
                      : language === "tr"
                      ? "90 gün"
                      : "90 days"}
                  </span>
                </div>

                <Countdown />

                <p>
                  {isArabic
                    ? "احجز مكانك مبكرًا واحصل على أولوية الوصول عند إطلاق CenterOS."
                    : language === "tr"
                    ? "Erken rezervasyon yapın ve CenterOS lansmanında öncelikli erişim elde edin."
                    : "Reserve your place early and get priority access when CenterOS launches."}
                </p>
              </div>

              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() => scrollTo("contact")}
                >
                  {isArabic
                    ? "احجز مكانك الآن"
                    : language === "tr"
                    ? "Şimdi yerinizi ayırtın"
                    : "Book your place now"}
                </button>

                <a
                  className="whatsapp-button"
                  href="https://wa.me/201109330703"
                  target="_blank"
                  rel="noreferrer"
                >
                  تواصل عبر واتساب
                </a>

                <button
                  className="secondary-button"
                  onClick={() => scrollTo("features")}
                >
                  {isArabic
                    ? "تعرف على المزيد"
                    : language === "tr"
                    ? "Daha fazla bilgi"
                    : "Learn more"}
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <AppMockup />
            </div>
          </div>
        </section>

        <section id="features" className="section">
          <div className="container">
            <div className="section-heading">
              <span>WHY CENTEROS</span>
              <h2>{t.featuresTitle}</h2>
              <p>{t.featuresText}</p>
            </div>

            <div className="features-grid">
              {features.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>

            <div className="trust-strip">
              <div>
                <strong>99.9%</strong>
                <span>استقرار النظام</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>إمكانية الوصول</span>
              </div>
              <div>
                <strong>1</strong>
                <span>منصة لإدارة عملياتك</span>
              </div>
              <div>
                <strong>∞</strong>
                <span>رؤية أوضح لبياناتك</span>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="section pricing-section">
          <div className="container">
            <div className="section-heading">
              <span>PRICING</span>
              <h2>{t.pricingTitle}</h2>
              <p>{t.pricingText}</p>
            </div>

            <div className="billing-toggle">
              <button
                className={billing === "monthly" ? "active" : ""}
                onClick={() => setBilling("monthly")}
              >
                شهري
              </button>
              <button
                className={billing === "yearly" ? "active" : ""}
                onClick={() => setBilling("yearly")}
              >
                سنوي
                <span>وفر أكثر</span>
              </button>
            </div>

            <div className="pricing-grid">
              {plans.map((plan) => {
                const price = billing === "monthly" ? plan.monthly : plan.yearly;

                return (
                  <article
                    className={`pricing-card ${plan.popular ? "popular" : ""} accent-${plan.accent}`}
                    key={plan.key}
                  >
                    {plan.popular && <div className="popular-label">الأكثر طلبًا</div>}

                    <div className="plan-head">
                      <h3>{plan.name}</h3>
                      <p>{plan.subtitle}</p>
                    </div>

                    {plan.enterprise ? (
                      <div className="enterprise-price">
                        <strong>تواصل معنا</strong>
                        <span>Custom Pricing</span>
                      </div>
                    ) : (
                      <div className="price">
                        <strong>${formatNumber(price)}</strong>
                        <span>/{billing === "monthly" ? "شهر" : "سنة"}</span>
                      </div>
                    )}

                    {billing === "yearly" && !plan.enterprise && (
                      <div className="yearly-note">
                        خطة سنوية
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

                    <button
                      className="plan-button"
                      onClick={() => scrollTo("contact")}
                    >
                      {plan.enterprise ? "تواصل معنا" : "اختر الخطة"}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="addons" className="section addons-section">
          <div className="container">
            <div className="section-heading">
              <span>ADD-ONS</span>
              <h2>إضافات عند الحاجة</h2>
              <p>يمكن توسيع النظام بإضافات وخدمات إضافية حسب احتياج مؤسستك.</p>
            </div>

            <div className="addons-card">
              <div>
                <strong>خدمات وإضافات مخصصة</strong>
                <p>
                  إذا كنت تحتاج إلى تكامل إضافي، فرع جديد، نظام دفع، إشعارات،
                  أو احتياج خاص بمؤسستك، تواصل معنا لمناقشة المتطلبات.
                </p>
              </div>

              <button onClick={() => scrollTo("contact")}>ناقش احتياجاتك</button>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="about-copy">
              <span className="section-label">ABOUT CENTEROS</span>
              <h2>إدارة مؤسستك التعليمية أصبحت أوضح.</h2>
              <p>
                CenterOS منصة مخصصة لمساعدة الأكاديميات والمراكز التعليمية
                على تنظيم عملياتها اليومية في مكان واحد.
              </p>
              <p>
                من إدارة الطلاب والمعلمين إلى الحضور والمدفوعات والتقارير،
                تم تصميم النظام ليكون واضحًا وسهل الاستخدام وقابلًا للتوسع.
              </p>
            </div>

            <div className="about-panel">
              <div>
                <span>01</span>
                <strong>إدارة مركزية</strong>
                <p>بياناتك وعملياتك في مكان واحد.</p>
              </div>
              <div>
                <span>02</span>
                <strong>صلاحيات واضحة</strong>
                <p>تحكم أفضل في وصول فريق العمل.</p>
              </div>
              <div>
                <span>03</span>
                <strong>تقارير عملية</strong>
                <p>معلومات تساعدك على اتخاذ القرار.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-card">
            <div className="contact-intro">
              <span>GET STARTED</span>
              <h2>احجز مكانك الآن</h2>
              <p>
                اترك بياناتك وسنتواصل معك لمناقشة احتياجات الأكاديمية
                وتفاصيل الاشتراك.
              </p>

              <div className="contact-email">
                <small>البريد الرسمي</small>
                <strong>centeros@centeros.online</strong>
              </div>
            </div>

            <form
              className="booking-form"
              onSubmit={async (event) => {
                event.preventDefault();

                const form = event.currentTarget;
                const button = form.querySelector('button[type="submit"]');

                const data = {
                  ManagerName: form.elements.name.value.trim(),
                  CenterName: form.elements.academy.value.trim(),
                  Email: form.elements.email.value.trim(),
                  Branches: form.elements.branches.value.trim(),
                  ExpectedStudents: form.elements.students.value.trim(),
                  AdditionalInfo: form.elements.message.value.trim(),
                };

                try {
                  button.disabled = true;
                  button.textContent = "جاري الإرسال...";

                  const response = await fetch(
                    "/api/booking",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data),
                    }
                  );

                  if (!response.ok) {
                    throw new Error("Booking request failed");
                  }

                  form.reset();
                  alert("تم إرسال طلبك بنجاح. سيتم التواصل معك قريبًا.");
                } catch (error) {
                  console.error("Booking error:", error);

                  const notice = document.createElement("div");
                  notice.className = "booking-error-overlay";
                  notice.innerHTML = `
                    <div class="booking-error-card" dir="rtl">
                      <button class="booking-error-close" aria-label="إغلاق">×</button>
                      <div class="booking-error-icon">!</div>
                      <h3>تعذر إرسال الطلب</h3>
                      <p>حدثت مشكلة أثناء إرسال بياناتك.</p>
                      <p>يمكنك التواصل معنا مباشرة لإتمام الحجز.</p>
                      <a href="tel:01109330703" class="booking-error-phone">
                        01109330703
                      </a>
                      <button class="booking-error-dismiss">حسنًا</button>
                    </div>
                  `;

                  document.body.appendChild(notice);

                  const closeNotice = () => notice.remove();
                  notice.querySelector(".booking-error-close").onclick = closeNotice;
                  notice.querySelector(".booking-error-dismiss").onclick = closeNotice;
                } finally {
                  button.disabled = false;
                  button.textContent = "احجز مكانك الآن";
                }
              }}
            >
              <div className="form-row">
                <label>
                  الاسم الكامل
                  <input type="text" name="name" required />
                </label>

                <label>
                  اسم الأكاديمية / المؤسسة
                  <input type="text" name="academy" required />
                </label>
              </div>

              <div className="form-row">
                <label>
                  البريد الإلكتروني
                  <input type="email" name="email" required />
                </label>

                <label>
                  عدد الفروع
                  <select name="branches" defaultValue="">
                    <option value="" disabled>اختر عدد الفروع</option>
                    <option>فرع واحد</option>
                    <option>2 - 3 فروع</option>
                    <option>4 - 10 فروع</option>
                    <option>أكثر من 10 فروع</option>
                  </select>
                </label>
              </div>

              <label>
                عدد الطلاب المتوقع
                <input type="number" name="students" min="1" placeholder="مثال: 500" />
              </label>

              <label>
                معلومات إضافية
                <textarea
                  name="message"
                  rows="4"
                  placeholder="اكتب أي تفاصيل أو احتياجات إضافية..."
                />
              </label>

              <button type="submit" className="submit-button">
                احجز مكانك الآن
              </button>

              <small className="form-note">
                بإرسال النموذج، أنت توافق على التواصل معك بخصوص CenterOS.
              </small>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img src="/logo.png" alt="CenterOS" />
            <strong>CenterOS</strong>
            <p>منصة إدارة متكاملة للأكاديميات والمراكز التعليمية.</p>
          </div>

          <div className="footer-links">
            <button onClick={() => scrollTo("home")}>الرئيسية</button>
            <button onClick={() => scrollTo("features")}>المميزات</button>
            <button onClick={() => scrollTo("pricing")}>الأسعار</button>
            <button onClick={() => scrollTo("about")}>عن النظام</button>
            <button onClick={() => scrollTo("contact")}>تواصل معنا</button>
          </div>

          <div className="footer-contact">
            <small>تواصل معنا</small>
            <strong>centeros@centeros.online</strong>
          </div>
        </div>

        <div className="container copyright">
          © {new Date().getFullYear()} CenterOS. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  );
}

export default PublicSite;
