import { useEffect, useState } from "react";
import "./PublicSite.css";

const WHATSAPP_NUMBER = "201109330703";

const translations = {
  ar: {
    dir: "rtl",
    nav: ["الرئيسية", "عن النظام", "الباقات", "الخدمات", "الأسئلة", "تواصل معنا"],
    heroBadge: "منصة إدارة المراكز التعليمية الذكية",
    heroTitle: "إدارة مركزك التعليمي",
    heroTitle2: "بسهولة واحترافية",
    heroText:
      "يوفر CenterOS نظامًا متكاملًا يساعدك على تنظيم الطلاب، المعلمين، المواعيد، الحضور والتقارير بكل سهولة، لتجربة تعليمية أفضل.",
    book: "احجز موعد الآن",
    whatsapp: "تواصل عبر واتساب",
    whyTitle: "لماذا تختار CenterOS؟",
    whyText: "نحن نقدم لك نظامًا متكاملًا لإدارة مركزك التعليمي، مصمم خصيصًا لتلبية احتياجاتك.",
    features: [
      ["توفير الوقت والجهد", "أتمتة العمليات اليومية لتوفير الوقت وزيادة إنتاجية فريقك."],
      ["تنظيم أفضل للطلاب", "إدارة بيانات الطلاب والحضور والمواعيد والمتابعة بكفاءة عالية."],
      ["متوافق مع جميع الأجهزة", "يمكنك استخدام النظام من الكمبيوتر والهاتف والأجهزة الذكية بسهولة."],
      ["تقارير وإحصائيات دقيقة", "تابع أداء مركزك من خلال تقارير مفصلة لتحليل النتائج."],
      ["دعم فني مستمر", "فريق دعم متاح لمساعدتك في أي وقت تحتاج فيه إلى المساعدة."],
      ["أمان عالي للبيانات", "حماية كاملة لبيانات مركزك وبيانات الطلاب مع أعلى معايير الأمان."],
    ],
    packagesTitle: "الباقات المتاحة",
    packagesText: "اختر الباقة المناسبة لاحتياجات مركزك التعليمي",
    monthly: "شهرية",
    yearly: "سنوية",
    month: "شهريًا",
    year: "سنويًا",
    save: "وفر أكثر",
    basic: "الباقة الأساسية",
    professional: "الباقة الاحترافية",
    advanced: "الباقة المتقدمة",
    start: "اختر هذه الباقة",
    featuresTitle: "طريقة الحجز",
    featuresText: "خطوات بسيطة يمكنك تنفيذها لتبدأ باستخدام النظام",
    steps: [
      ["1", "اختر الباقة المناسبة", "تصفح الباقات واختر ما يناسب احتياجات مركزك."],
      ["2", "أرسل معلوماتك", "أدخل بيانات مركزك الأساسية وتفاصيل التواصل."],
      ["3", "أكد الحجز", "راجع بياناتك وأرسل الطلب لفريق CenterOS."],
      ["4", "ابدأ الاستخدام", "سيتم التواصل معك لاستكمال الإعداد والبدء."],
    ],
    ctaTitle: "هل لديك استفسار؟",
    ctaText: "فريقنا مستعد دائمًا لمساعدتك والإجابة على جميع استفساراتك.",
    contact: "تواصل عبر واتساب",
    aboutTitle: "نظام واحد لإدارة مركزك بالكامل",
    aboutText:
      "CenterOS يجمع إدارة الطلاب والمعلمين والكورسات والحضور والمدفوعات والتقارير في منصة واحدة سهلة الاستخدام.",
    bookingTitle: "احجز موعدك",
    bookingText: "اترك بيانات مركزك وسنتواصل معك لمناقشة احتياجاتك.",
    manager: "اسم المسؤول",
    center: "اسم المركز / الأكاديمية",
    email: "البريد الإلكتروني",
    branches: "عدد الفروع",
    students: "عدد الطلاب المتوقع",
    info: "معلومات إضافية",
    select: "اختر",
    submit: "إرسال الطلب",
    close: "إغلاق",
    success: "تم تجهيز طلبك، سيتم تحويلك إلى واتساب للتواصل مع فريق CenterOS.",
    footerText: "منصة CenterOS لإدارة المراكز التعليمية.",
    rights: "جميع الحقوق محفوظة.",
    navigation: "التنقل",
    contactTitle: "تواصل معنا",
    home: "الرئيسية",
    about: "عن النظام",
    packages: "الباقات",
    services: "الخدمات",
    questions: "الأسئلة",
  },
  en: {
    dir: "ltr",
    nav: ["Home", "About", "Packages", "Services", "FAQ", "Contact"],
    heroBadge: "Smart Educational Center Management Platform",
    heroTitle: "Manage Your Educational Center",
    heroTitle2: "Easily & Professionally",
    heroText:
      "CenterOS gives you a complete platform to organize students, teachers, schedules, attendance and reports with ease.",
    book: "Book a Call",
    whatsapp: "Contact via WhatsApp",
    whyTitle: "Why Choose CenterOS?",
    whyText: "A complete educational center management system designed around your daily needs.",
    features: [
      ["Save Time & Effort", "Automate daily operations and improve your team's productivity."],
      ["Better Student Management", "Manage student data, attendance, schedules and follow-ups efficiently."],
      ["Works on Every Device", "Use CenterOS comfortably from computers, phones and smart devices."],
      ["Accurate Reports", "Track your center with detailed reports and useful analytics."],
      ["Continuous Support", "Our support team is available whenever you need assistance."],
      ["High Data Security", "Your center and student data are protected with strong security standards."],
    ],
    packagesTitle: "Available Packages",
    packagesText: "Choose the package that fits your educational center",
    monthly: "Monthly",
    yearly: "Yearly",
    month: "monthly",
    year: "yearly",
    save: "Save more",
    basic: "Basic Package",
    professional: "Professional Package",
    advanced: "Advanced Package",
    start: "Choose Package",
    featuresTitle: "How It Works",
    featuresText: "Four simple steps to start using CenterOS",
    steps: [
      ["1", "Choose Your Package", "Browse the packages and choose what fits your center."],
      ["2", "Send Your Information", "Provide your center details and contact information."],
      ["3", "Confirm Your Request", "Review your information and send your request."],
      ["4", "Start Using CenterOS", "Our team will contact you to complete setup."],
    ],
    ctaTitle: "Have a Question?",
    ctaText: "Our team is ready to help and answer all your questions.",
    contact: "Contact via WhatsApp",
    aboutTitle: "One System for Your Entire Center",
    aboutText:
      "CenterOS brings students, teachers, courses, attendance, payments and reports together in one easy platform.",
    bookingTitle: "Book Your Call",
    bookingText: "Tell us about your center and our team will contact you.",
    manager: "Manager Name",
    center: "Center / Academy Name",
    email: "Email Address",
    branches: "Number of Branches",
    students: "Expected Students",
    info: "Additional Information",
    select: "Select",
    submit: "Submit Request",
    close: "Close",
    success: "Your request is ready. You will be redirected to WhatsApp to contact CenterOS.",
    footerText: "CenterOS educational center management platform.",
    rights: "All rights reserved.",
    navigation: "Navigation",
    contactTitle: "Contact",
    home: "Home",
    about: "About",
    packages: "Packages",
    services: "Services",
    questions: "FAQ",
  },
  tr: {
    dir: "ltr",
    nav: ["Ana Sayfa", "Hakkımızda", "Paketler", "Hizmetler", "SSS", "İletişim"],
    heroBadge: "Akıllı Eğitim Merkezi Yönetim Platformu",
    heroTitle: "Eğitim Merkezinizi",
    heroTitle2: "Kolayca ve Profesyonelce Yönetin",
    heroText:
      "CenterOS; öğrencileri, öğretmenleri, dersleri, devam durumunu ve raporları tek bir sistemde yönetmenizi sağlar.",
    book: "Görüşme Planla",
    whatsapp: "WhatsApp ile İletişim",
    whyTitle: "Neden CenterOS?",
    whyText: "Günlük ihtiyaçlarınıza göre tasarlanmış kapsamlı eğitim merkezi yönetim sistemi.",
    features: [
      ["Zaman ve Efor Tasarrufu", "Günlük işlemleri otomatikleştirin ve ekibinizin verimliliğini artırın."],
      ["Daha İyi Öğrenci Yönetimi", "Öğrenci bilgilerini, devamı ve programları kolayca yönetin."],
      ["Tüm Cihazlarla Uyumlu", "CenterOS'u bilgisayar, telefon ve akıllı cihazlardan kullanın."],
      ["Detaylı Raporlar", "Merkezinizi ayrıntılı raporlarla ve analizlerle takip edin."],
      ["Sürekli Teknik Destek", "İhtiyacınız olduğunda destek ekibimiz yanınızda."],
      ["Yüksek Veri Güvenliği", "Merkez ve öğrenci verileriniz güçlü güvenlik standartlarıyla korunur."],
    ],
    packagesTitle: "Mevcut Paketler",
    packagesText: "Eğitim merkezinize uygun paketi seçin",
    monthly: "Aylık",
    yearly: "Yıllık",
    month: "aylık",
    year: "yıllık",
    save: "Daha fazla tasarruf",
    basic: "Temel Paket",
    professional: "Profesyonel Paket",
    advanced: "Gelişmiş Paket",
    start: "Paketi Seç",
    featuresTitle: "Nasıl Çalışır?",
    featuresText: "CenterOS'u kullanmaya başlamak için dört basit adım",
    steps: [
      ["1", "Paketi Seçin", "Merkezinize uygun paketi seçin."],
      ["2", "Bilgilerinizi Gönderin", "Merkez ve iletişim bilgilerinizi girin."],
      ["3", "Talebinizi Onaylayın", "Bilgilerinizi kontrol edip talebinizi gönderin."],
      ["4", "CenterOS'u Kullanmaya Başlayın", "Ekibimiz kurulum için sizinle iletişime geçecek."],
    ],
    ctaTitle: "Sorunuz mu Var?",
    ctaText: "Ekibimiz size yardımcı olmak ve sorularınızı yanıtlamak için hazır.",
    contact: "WhatsApp ile İletişim",
    aboutTitle: "Merkeziniz İçin Tek Bir Sistem",
    aboutText:
      "CenterOS; öğrencileri, öğretmenleri, dersleri, devam durumunu, ödemeleri ve raporları tek bir platformda birleştirir.",
    bookingTitle: "Görüşme Planla",
    bookingText: "Merkezinizi anlatın, ekibimiz sizinle iletişime geçsin.",
    manager: "Yetkili Adı",
    center: "Merkez / Akademi Adı",
    email: "E-posta Adresi",
    branches: "Şube Sayısı",
    students: "Tahmini Öğrenci Sayısı",
    info: "Ek Bilgiler",
    select: "Seçin",
    submit: "Talep Gönder",
    close: "Kapat",
    success: "Talebiniz hazır. CenterOS ekibiyle iletişim için WhatsApp'a yönlendirileceksiniz.",
    footerText: "CenterOS eğitim merkezi yönetim platformu.",
    rights: "Tüm hakları saklıdır.",
    navigation: "Navigasyon",
    contactTitle: "İletişim",
    home: "Ana Sayfa",
    about: "Hakkımızda",
    packages: "Paketler",
    services: "Hizmetler",
    questions: "SSS",
  },
};

const plans = [
  {
    id: "basic",
    price: { monthly: "100", yearly: "999" },
    features: ["إدارة الطلاب", "إدارة المعلمين", "إدارة الكورسات", "الحضور", "التقارير الأساسية"],
  },
  {
    id: "professional",
    price: { monthly: "120", yearly: "1199" },
    features: ["كل مميزات الأساسية", "الفروع المتعددة", "المدفوعات والإيرادات", "تقارير متقدمة", "إدارة الموظفين"],
    popular: true,
  },
  {
    id: "advanced",
    price: { monthly: "170", yearly: "1699" },
    features: ["كل مميزات الاحترافية", "التحليلات المتقدمة", "الاشتراكات", "الإشعارات", "دعم أولوية"],
  },
];

function Icon({ type, size = 22 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="3" />
        <path d="M17 8a3 3 0 0 1 0 6" />
        <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
      </>
    ),
    devices: (
      <>
        <rect x="3" y="4" width="13" height="10" rx="1.5" />
        <path d="M8 18h3M5 14h9" />
        <rect x="18" y="7" width="3" height="8" rx="1" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 3-4 3 2 5-7" />
      </>
    ),
    support: (
      <>
        <path d="M4 13a8 8 0 0 1 16 0" />
        <path d="M4 13v3a2 2 0 0 0 2 2h1v-5H4Z" />
        <path d="M20 13v3a2 2 0 0 1-2 2h-1v-5h3Z" />
        <path d="M15 19c-.7 1-1.8 1.5-3 1.5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 20 6v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  };

  return <svg {...common}>{paths[type] || paths.shield}</svg>;
}

function Header({ t, language, setLanguage, onBook }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="brand" onClick={() => go("home")}>
          <img src="/newlogo.png" alt="CenterOS" />
          <span>
            <strong>CenterOS</strong>
            <small>Smart Education Management</small>
          </span>
        </button>

        <nav className="desktop-nav">
          <button onClick={() => go("home")}>{t.home}</button>
          <button onClick={() => go("about")}>{t.about}</button>
          <button onClick={() => go("packages")}>{t.packages}</button>
          <button onClick={() => go("services")}>{t.services}</button>
          <button onClick={() => go("questions")}>{t.questions}</button>
          <button onClick={() => go("contact")}>{t.contactTitle}</button>
        </nav>

        <div className="header-actions">
          <div className="language-switcher">
            <button className="language-current">{language === "ar" ? "العربية" : language === "tr" ? "Türkçe" : "English"}</button>
            <div className="language-menu">
              <button onClick={() => setLanguage("ar")}>العربية</button>
              <button onClick={() => setLanguage("en")}>English</button>
              <button onClick={() => setLanguage("tr")}>Türkçe</button>
            </div>
          </div>

          <button className="header-book" onClick={onBook}>{t.book}</button>

          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-nav">
          {[
            ["home", t.home],
            ["about", t.about],
            ["packages", t.packages],
            ["services", t.services],
            ["questions", t.questions],
            ["contact", t.contactTitle],
          ].map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
          <button className="mobile-book" onClick={() => { setMenuOpen(false); onBook(); }}>{t.book}</button>
        </div>
      )}
    </header>
  );
}

function PublicSite() {
  const [language, setLanguage] = useState(() => localStorage.getItem("centeros-language") || "ar");
  const [billing, setBilling] = useState("yearly");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const t = translations[language] || translations.ar;

  useEffect(() => {
    localStorage.setItem("centeros-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = t.dir;
  }, [language, t.dir]);

  const openBooking = (plan = "") => {
    setSelectedPlan(plan);
    setBookingOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeBooking = () => {
    setBookingOpen(false);
    document.body.style.overflow = "";
  };

  const submitBooking = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const manager = String(form.get("manager") || "").trim();
    const center = String(form.get("center") || "").trim();
    const email = String(form.get("email") || "").trim();
    const branches = String(form.get("branches") || "").trim();
    const students = String(form.get("students") || "").trim();
    const info = String(form.get("info") || "").trim();

    const message = [
      "طلب حجز جديد - CenterOS",
      "",
      `اسم المسؤول: ${manager}`,
      `اسم المركز: ${center}`,
      `البريد الإلكتروني: ${email}`,
      `عدد الفروع: ${branches}`,
      `عدد الطلاب المتوقع: ${students}`,
      `الباقة: ${selectedPlan || "لم يتم تحديدها"}`,
      `معلومات إضافية: ${info || "لا يوجد"}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );

    closeBooking();
  };

  return (
    <div className="public-site">
      <Header
        t={t}
        language={language}
        setLanguage={setLanguage}
        onBook={() => openBooking()}
      />

      <main>
        <section id="home" className="hero">
          <div className="hero-shape hero-shape-one" />
          <div className="hero-shape hero-shape-two" />

          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="hero-badge">{t.heroBadge}</span>

              <h1>
                {t.heroTitle}
                <br />
                <span>{t.heroTitle2}</span>
              </h1>

              <p>{t.heroText}</p>

              <div className="hero-actions">
                <button className="primary-button" onClick={() => openBooking()}>
                  {t.book}
                  <span>↗</span>
                </button>

                <a
                  className="secondary-button"
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.whatsapp}
                </a>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-card art-main">
                <div className="art-icon"><Icon type="chart" size={28} /></div>
                <strong>CenterOS</strong>
                <span>Smart Management</span>
              </div>
              <div className="art-card art-small art-small-one"><Icon type="users" /></div>
              <div className="art-card art-small art-small-two"><Icon type="shield" /></div>
            </div>
          </div>
        </section>

        <section id="services" className="features-section section">
          <div className="container">
            <div className="section-heading">
              <span>{t.services}</span>
              <h2>{t.whyTitle}</h2>
              <p>{t.whyText}</p>
            </div>

            <div className="features-grid">
              {t.features.map(([title, text], index) => (
                <article className="feature-card" key={title}>
                  <div className="feature-number">{String(index + 1).padStart(2, "0")}</div>
                  <div className="feature-icon">
                    <Icon type={["clock", "users", "devices", "chart", "support", "shield"][index]} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="packages" className="packages-section section">
          <div className="container">
            <div className="section-heading">
              <span>{t.packages}</span>
              <h2>{t.packagesTitle}</h2>
              <p>{t.packagesText}</p>
            </div>

            <div className="billing-toggle">
              <button className={billing === "monthly" ? "active" : ""} onClick={() => setBilling("monthly")}>
                {t.monthly}
              </button>
              <button className={billing === "yearly" ? "active" : ""} onClick={() => setBilling("yearly")}>
                {t.yearly}
                <small>{t.save}</small>
              </button>
            </div>

            <div className="pricing-grid">
              {plans.map((plan, index) => {
                const title = plan.id === "basic" ? t.basic : plan.id === "professional" ? t.professional : t.advanced;
                return (
                  <article className={`pricing-card ${plan.popular ? "popular" : ""}`} key={plan.id}>
                    {plan.popular && <div className="popular-badge">الأكثر طلبًا</div>}

                    <div className="pricing-top">
                      <div className="pricing-icon"><Icon type="users" size={20} /></div>
                      <h3>{title}</h3>
                    </div>

                    <div className="price">
                      <strong>{plan.price[billing]}</strong>
                      <span> $ / {billing === "yearly" ? t.year : t.month}</span>
                    </div>

                    <div className="pricing-divider" />

                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <span>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button className="plan-button" onClick={() => openBooking(title)}>
                      {t.start}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="about-section section">
          <div className="container about-grid">
            <div className="about-copy">
              <span className="section-kicker">{t.about}</span>
              <h2>{t.aboutTitle}</h2>
              <p>{t.aboutText}</p>

              <div className="about-points">
                <div><span>✓</span> إدارة مركزك من مكان واحد</div>
                <div><span>✓</span> تجربة واضحة وسهلة لفريقك</div>
                <div><span>✓</span> متاح على الأجهزة المختلفة</div>
              </div>
            </div>

            <div className="devices-showcase">
              <div className="device-glow" />
              <img className="mac-image" src="/mac.png" alt="CenterOS dashboard" />
              <img className="phone-image" src="/phone.png" alt="CenterOS mobile dashboard" />
            </div>
          </div>
        </section>

        <section id="questions" className="steps-section section">
          <div className="container">
            <div className="section-heading">
              <span>{t.questions}</span>
              <h2>{t.featuresTitle}</h2>
              <p>{t.featuresText}</p>
            </div>

            <div className="steps-grid">
              {t.steps.map(([number, title, text]) => (
                <article className="step-card" key={number}>
                  <div className="step-number">{number}</div>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="cta-section">
          <div className="container cta-inner">
            <div className="cta-icon"><Icon type="support" size={30} /></div>
            <div>
              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaText}</p>
            </div>
            <div className="cta-actions">
              <button className="cta-book" onClick={() => openBooking()}>{t.book}</button>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">{t.contact}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/newlogo.png" alt="CenterOS" />
            <div>
              <strong>CenterOS</strong>
              <span>Smart Education Management</span>
            </div>
            <p>{t.footerText}</p>
          </div>

          <div>
            <h4>{t.navigation}</h4>
            <button onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}>{t.home}</button>
            <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>{t.about}</button>
            <button onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}>{t.packages}</button>
          </div>

          <div>
            <h4>{t.contactTitle}</h4>
            <a href="mailto:centeros@centeros.online">centeros@centeros.online</a>
            <button onClick={() => openBooking()}>{t.book}</button>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            © {new Date().getFullYear()} CenterOS — {t.rights}
          </div>
        </div>
      </footer>

      {bookingOpen && (
        <div className="booking-overlay" onMouseDown={(e) => e.target === e.currentTarget && closeBooking()}>
          <div className="booking-modal" role="dialog" aria-modal="true">
            <button className="modal-close" onClick={closeBooking} aria-label={t.close}>×</button>

            <div className="modal-header">
              <span>{t.book}</span>
              <h2>{t.bookingTitle}</h2>
              <p>{t.bookingText}</p>
            </div>

            <form className="booking-form" onSubmit={submitBooking}>
              <div className="form-row">
                <label>
                  {t.manager}
                  <input name="manager" required />
                </label>
                <label>
                  {t.center}
                  <input name="center" required />
                </label>
              </div>

              <label>
                {t.email}
                <input name="email" type="email" required />
              </label>

              <div className="form-row">
                <label>
                  {t.branches}
                  <select name="branches" required defaultValue="">
                    <option value="" disabled>{t.select}</option>
                    <option>1</option>
                    <option>2-3</option>
                    <option>4-5</option>
                    <option>6+</option>
                  </select>
                </label>

                <label>
                  {t.students}
                  <select name="students" required defaultValue="">
                    <option value="" disabled>{t.select}</option>
                    <option>حتى 100 طالب</option>
                    <option>حتى 200 طالب</option>
                    <option>حتى 300 طالب</option>
                    <option>حتى 400 طالب</option>
                    <option>حتى 500 طالب</option>
                    <option>أكثر من 500 طالب</option>
                  </select>
                </label>
              </div>

              <label>
                {t.info}
                <textarea name="info" rows="4" />
              </label>

              <button className="submit-booking" type="submit">{t.submit}</button>
              <small className="modal-note">{t.success}</small>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicSite;
