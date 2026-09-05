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
            <div className="side-active">الرئيسية</div>
            <div>الطلاب</div>
            <div>المعلمون</div>
            <div>الدروس</div>
            <div>الحضور</div>
            <div>المدفوعات</div>
            <div>التقارير</div>
            <div>الإعدادات</div>
          </aside>

          <main className="mock-content">
            <div className="mock-welcome">
              <div>
                <small>لوحة التحكم</small>
                <h3>مرحبًا بك في CenterOS</h3>
                <p>إليك ملخص أداء الأكاديمية اليوم</p>
              </div>
              <span className="mock-status">مباشر</span>
            </div>

            <div className="mock-stats">
              <div>
                <small>الطلاب</small>
                <strong>1,248</strong>
                <span>+12.5%</span>
              </div>
              <div>
                <small>المعلمون</small>
                <strong>86</strong>
                <span>+8.2%</span>
              </div>
              <div>
                <small>الكورسات</small>
                <strong>32</strong>
                <span>+4.1%</span>
              </div>
              <div>
                <small>نسبة الحضور</small>
                <strong>91%</strong>
                <span>+6.4%</span>
              </div>
            </div>

            <div className="mock-chart-card">
              <div className="mock-card-title">
                <strong>نظرة عامة على الحضور</strong>
                <span>هذا الأسبوع</span>
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
                <strong>آخر العمليات</strong>
                <div><span>تسجيل طالب جديد</span><b>منذ 8 دقائق</b></div>
                <div><span>تحديث دفعة</span><b>منذ 21 دقيقة</b></div>
                <div><span>إضافة حصة</span><b>منذ 35 دقيقة</b></div>
              </div>

              <div className="mock-mini-card">
                <small>الإيرادات الشهرية</small>
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
  const launchDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 90);
    return date;
  }, []);

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
                <span>منصة إدارة متكاملة للأكاديميات</span>
                <em>وتنمو بثقة</em>
              </h1>

              <p className="hero-description">
                كل ما تحتاجه لإدارة الطلاب، المعلمين، الدروس، الحضور،
                المدفوعات والتقارير في منصة واحدة سهلة وآمنة.
              </p>

              <div className="hero-points">
                <span>يعمل على جميع الأجهزة</span>
                <span>أمان وخصوصية</span>
                <span>دعم مستمر</span>
              </div>

              <div className="launch-card">
                <div className="launch-header">
                  <div>
                    <small>الإطلاق الرسمي</small>
                    <strong>متبقي حتى الإطلاق</strong>
                  </div>
                  <span className="launch-badge">90 يوم</span>
                </div>

                <Countdown />

                <p>
                  احجز مكانك مبكرًا واحصل على أولوية الوصول عند إطلاق CenterOS.
                </p>
              </div>

              <div className="hero-actions">
                <button className="primary-button" onClick={() => scrollTo("contact")}>
                  احجز مكانك الآن
                </button>
                <button className="secondary-button" onClick={() => scrollTo("features")}>
                  تعرف على المزيد
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
              <h2>لماذا تختار CenterOS؟</h2>
              <p>أدوات واضحة تساعدك على إدارة مؤسستك التعليمية بكفاءة أكبر.</p>
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
              <h2>خطط مرنة تناسب احتياجاتك</h2>
              <p>اختر الخطة المناسبة لحجم مؤسستك التعليمية.</p>
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
                    "http://localhost:8080/api/v1/public/booking",
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
