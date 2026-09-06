
    AOS.init({
      once: true,
      duration: 750,
      easing: 'ease-out-cubic',
    });

    // 1. Preloader Execution (>= 2500ms)
    const minPreloaderDuration = 2500;
    const startTimestamp = Date.now();
    const loaderBar = document.getElementById('loader-bar');
    const loaderPercent = document.getElementById('loader-percent');
    const preloaderElement = document.getElementById('preloader');

    const loaderInterval = setInterval(() => {
      const elapsed = Date.now() - startTimestamp;
      const progress = Math.min(Math.floor((elapsed / minPreloaderDuration) * 100), 100);
      
      loaderBar.style.width = `${progress}%`;
      loaderPercent.textContent = `${progress}%`;

      if (progress >= 100) {
        clearInterval(loaderInterval);
        setTimeout(() => {
          preloaderElement.classList.add('opacity-0', 'pointer-events-none');
          setTimeout(() => preloaderElement.remove(), 700);
        }, 150);
      }
    }, 20);

    // 2. Interactive Canvas Particles
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.5 + 0.8;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw(isDark) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.45)' : 'rgba(2, 132, 199, 0.35)';
        ctx.fill();
      }
    }

    for (let i = 0; i < 32; i++) particles.push(new Particle());

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(isDark);
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = isDark 
              ? `rgba(56, 189, 248, ${0.12 * (1 - dist / 110)})` 
              : `rgba(2, 132, 199, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 3. Scroll-to-Top on Brand/Logo Click & Smooth Navigation
    const brandTopBtn = document.getElementById('brand-scroll-top');
    if (brandTopBtn) {
      brandTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    document.querySelectorAll('.nav-scroll-link').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          if (targetId === '#top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          const targetElem = document.querySelector(targetId);
          if (targetElem) {
            const headerOffset = 80;
            const elementPosition = targetElem.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // 4. Interactive Card Click Ripple Animation
    document.querySelectorAll('.interactive-card').forEach(card => {
      card.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;

        const rect = card.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.classList.add('card-ripple');

        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

        card.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 650);
      });
    });

    // 5. Strict Localization
    const cvLocales = {
      en: {
        personal_name: "Kareem Hegazy",
        personal_title: "Software Engineer",
        hero_status: "Available for Front-End & Software Projects",
        loader_welcome: "Welcome to my engineering space",
        nav_about: "About",
        nav_edu: "Education",
        nav_exp: "Experience",
        nav_courses: "Certificates",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_desc: "Computer Science student focused on modern Front-End development with React.js and robust software architectures.",
        btn_contact: "Contact Me",
        btn_work: "View Github Work",
        sec_profile: "PROFILE",
        cv_profile: "Computer Science student at Shorouk Academy (GPA: 3.48) with foundational knowledge in software development, AI concepts, and Front-End technologies. Gained practical experience in Python programming and data exploration through team-based AI projects, and currently building Front-End skills with React.js through the DEPI initiative. Motivated learner with strong problem-solving and team collaboration skills." ,
        sec_education: "EDUCATION",
        degree_name: "B.Sc. Computer Science",
        uni_name: "Shorouk Academy",
        sec_experience: "EXPERIENCE",
        exp_ieee_date: "Feb 2026 - Aug 2026",
        exp_ieee_desc: "Python fundamentals, data analysis with NumPy & Pandas, Data Visualization, Data Preprocessing, Machine Learning & Model Evaluation, and Deployment.",
        exp_ieee_capstone_label: "Final Capstone Project:",
        exp_ieee_capstone_val: "Developing a Machine Learning model for Flight Delay Prediction.",
        sarai_1: "Assisted customers promptly, utilizing strong communication and problem-solving skills.",
        sarai_2: "Maintained full shelf stock by continuously restocking product lines from the warehouse.",
        sarai_3: "Organized aesthetic shelf displays to enhance product visibility and store presentation.",
        sec_courses: "COURSES and CERTIFICATES",
        depi_date: "2026 in progress",
        sec_skills: "SKILLS",
        sk_collab: "Team Collaboration",
        sk_comm: "Effective Communication",
        sk_prob: "Problem Solving",
        sk_detail: "Attention to Detail",
        sec_projects: "PROJECTS",
        proj_1_text: "A collaborative multi-task ML project designed to predict flight delay risks and root causes. Contributed to the project by performing dataset overview and structural exploration using Python and Pandas.",
        proj_2_b1: "Built a CLI tool with 5 modules: basic math, temperature conversion, number systems, GPA calculation, and length conversion.",
        proj_2_b2: "Structured modular code using functions and loops, with exception handling to manage invalid user inputs.",
        proj_3_b1: "Developed a CLI banking application featuring user authentication (registration/login) and account management.",
        proj_3_b2: "Implemented core banking operations: balance inquiry, deposits, withdrawals, fund transfers between accounts, and password updates.",
        contact_badge: "LET'S TEAM UP & SHIP IT",
        contact_title: "Ready to Kick Off Your Next Project? Let's Build It Together",
        contact_sub: "Got an idea in mind, a design waiting for code, or need a developer who gets things done? Let's connect right now, talk details, and bring your vision to life today",
        footer_rights: "All CV specifications preserved."
      },
      ar: {
        personal_name: "كريم حجازي",
        personal_title: "مهندس برمجيات",
        hero_status: "متاح لمشاريع الـ Front-End وتطوير البرمجيات",
        loader_welcome: "مرحباً بك في مساحتي الهندسية والبرمجية",
        nav_about: "الملف الشخصي",
        nav_edu: "التعليم",
        nav_exp: "الخبرات",
        nav_courses: "الشهادات والكورسات",
        nav_skills: "المهارات",
        nav_projects: "المشاريع",
        nav_contact: "تواصل معي",
        hero_desc: "طالب علوم حاسب أركز على تطوير واجهات الويب الحديثة بـ React.js وتصميم البنى البرمجية القوية.",
        btn_contact: "تواصل معي",
        btn_work: "مشاريع Github",
        sec_profile: "الملف الشخصي (PROFILE)",
        cv_profile:" طالب علوم الحاسب في أكاديمية الشروق ( بمعدل تراكمي GPA: 3.48 )، أمتلك معرفة تأسيسية في software development، ومفاهيم الـ AI، وتقنيات الـ Front-End. اكتسبت خبرة عملية في البرمجة بلغة Python واستكشاف البيانات (data Exploration) من خلال مشاريع AI جماعية، وأعمل حالياً على تطوير مهاراتي في الـ Front-End باستخدام React.js عبر مبادرة DEPI. شغوف بالتعلم ومتحمس للتطور، مع تميزي بمهارات قوية في problem-solving والعمل الجماعي.",
        sec_education: "التعليم (EDUCATION)",
        degree_name: "بكالوريوس علوم الحاسب",
        uni_name: "أكاديمية الشروق",
        sec_experience: "الخبرات (EXPERIENCE)",
        exp_ieee_date: "فبراير 2026 - أغسطس 2026",
        exp_ieee_desc: "أساسيات Python، تحليل البيانات بـ NumPy و Pandas، وتصور البيانات (Data Visualization)، ومعالجة البيانات مسبقاً (Data Preprocessing)، وتعلم الآلة وتقييم النماذج والنشر (Deployment).",
        exp_ieee_capstone_label: "مشروع التخرج النهائي للورشة:",
        exp_ieee_capstone_val: "تطوير نموذج Machine Learning للتنبؤ بمخاطر تأخر الرحلات الجوية.",
        sarai_1: "مساعدة العملاء باحترافية وسرعة، باستخدام مهارات التواصل الفعال وحل المشكلات.",
        sarai_2: "الحفاظ على امتلاء الأرفف بالبضائع باستمرار عبر إعادة التخزين المستمر من المستودع.",
        sarai_3: "تنظيم وتنسيق واجهات العرض بشكل جمالي لتعزيز ظهور المنتجات والمظهر العام للمتجر.",
        sec_courses: "الدورات والشهادات (COURSES and CERTIFICATES)",
        depi_date: "2026 - قيد التقدم",
        sec_skills: "المهارات (SKILLS)",
        sk_collab: "العمل الجماعي (Team Collaboration)",
        sk_comm: "التواصل الفعال (Effective Communication)",
        sk_prob: "حل المشكلات (Problem Solving)",
        sk_detail: "الدقة والاهتمام بالتفاصيل (Attention to Detail)",
        sec_projects: "المشاريع (PROJECTS)",
        proj_1_text: "مشروع Machine Learning تعاوني متعدد المهام مصمم للتنبؤ بمخاطر وأسباب تأخر الرحلات الجوية. ساهمت في المشروع بإجراء فحص البيانات والاستكشاف الهيكلي باستخدام Python و Pandas.",
        proj_2_b1: "بناء أداة سطر أوامر (CLI) بـ 5 وحدات: العمليات الحسابية الأساسية، تحويل درجات الحرارة، أنظمة العد، حساب الـ GPA، وتحويل الأطوال.",
        proj_2_b2: "هيكلة كود معياري باستخدام الدوال والتكرار (Loops)، مع معالجة الاستثناءات للتعامل مع مدخلات المستخدم غير الصحيحة.",
        proj_3_b1: "تطوير تطبيق بنكي عبر سطر الأوامر (CLI) يدعم مصادقة المستخدمين (تسجيل الحساب/تسجيل الدخول) وإدارة الحسابات.",
        proj_3_b2: "تنفيذ العمليات المصرفية الأساسية: الاستعلام عن الرصيد، الإيداع، السحب، تحويل الأموال بين الحسابات، وتحديث كلمات المرور.",
        contact_badge: "يلا نبدأ ونشتغل سوا",
        contact_title: "جاهز تبدأ مشروعك القادم؟ يلا نشتغل سوا ونبنيه فوراً",
        contact_sub: "عندك فكرة مشروع في بالك، تصميم مستني الكود، أو محتاج مطور ينجز المطلوب بأعلى كفاءة؟ يلا نتواصل دلوقتي، نتفق على التفاصيل، ونحول فكرتك لواقع تفاعلي يشتغل على طول",
        footer_rights: "جميع مواصفات السيرة الذاتية محفوظة."
      }
    };

    let curLang = localStorage.getItem('kh_lang') || 'en';
    const langBtn = document.getElementById('lang-btn');
    const langIndicator = document.getElementById('lang-indicator');

    function switchLanguage(lang) {
      curLang = lang;
      localStorage.setItem('kh_lang', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      langIndicator.textContent = lang === 'ar' ? 'EN' : 'AR';

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (cvLocales[lang] && cvLocales[lang][key]) {
          el.textContent = cvLocales[lang][key];
        }
      });
    }

    langBtn.addEventListener('click', () => switchLanguage(curLang === 'en' ? 'ar' : 'en'));

    // 6. Dark / Light Mode with Automatic Assets Swapping
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = themeBtn.querySelector('i');
    const navLogo = document.getElementById('navbar-logo');
    const preloaderLogo = document.getElementById('preloader-logo');
    const uniLogo = document.getElementById('university-logo');
    const ieeeLogo = document.getElementById('ieee-logo');

    function applyTheme(isDark) {
      if (isDark) {
        document.documentElement.classList.add('dark');
        themeIcon.className = 'fa-solid fa-sun';
        localStorage.setItem('kh_theme', 'dark');
        if (navLogo) navLogo.src = 'logo.png';
        if (preloaderLogo) preloaderLogo.src = 'logo.png';
        if (uniLogo) uniLogo.src = 'university dark.png';
        if (ieeeLogo) ieeeLogo.src = 'IEEE dark.webp';
      } else {
        document.documentElement.classList.remove('dark');
        themeIcon.className = 'fa-solid fa-moon';
        localStorage.setItem('kh_theme', 'light');
        if (navLogo) navLogo.src = 'logo light.png';
        if (preloaderLogo) preloaderLogo.src = 'logo light.png';
        if (uniLogo) uniLogo.src = 'university.png';
        if (ieeeLogo) ieeeLogo.src = 'IEEE light.webp';
      }
    }

    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      applyTheme(!isDark);
    });

    // 7. Mobile Drawer Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    // Booting Defaults
    const savedTheme = localStorage.getItem('kh_theme') || 'dark';
    applyTheme(savedTheme === 'dark');
    switchLanguage(curLang);
