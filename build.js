#!/usr/bin/env node
/**
 * Build Script - Generates HTML pages from config.js
 * Run: node build.js
 * Then commit and push to GitHub Pages
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
function asset(file) {
  const version = crypto
    .createHash("sha256")
    .update(fs.readFileSync(path.join(__dirname, file)))
    .digest("hex")
    .slice(0, 10);
  return `/${file}?v=${version}`;
}

// Load config
const englishConfig = require("./config.js");
let config = structuredClone(englishConfig);
let locale = "en";
function route(page, language = locale) {
  const prefix = language === "es" ? "/es" : "";
  return `${prefix}/${page === "home" ? "" : page + "/"}`;
}
const labels = {
  en: {
    home: "Home",
    privacy: "Privacy",
    support: "Support",
    policy: "Privacy Policy",
    updated: "Updated",
    back: "Back to Home",
    availability: "In development for iPhone.",
    contact: "If you have questions about this Privacy Policy, contact us at",
  },
  es: {
    home: "Inicio",
    privacy: "Privacidad",
    support: "Ayuda",
    policy: "Política de privacidad",
    updated: "Actualizada el",
    back: "Volver al inicio",
    availability: "En desarrollo para iPhone.",
    contact:
      "Si tienes preguntas sobre esta política de privacidad, escríbenos a",
  },
};
const screenshotFeatures = require("./screenshot-features.json");
config.features.items = screenshotFeatures.features;

// Helper to generate meta tags
function generateMetaTags(page) {
  const isHome = page === "home";
  const isPrivacy = page === "privacy";
  const isSupport = page === "support";

  const title = isHome
    ? config.seo.title
    : isPrivacy
      ? `${labels[locale].policy} — ${config.brand.name}`
      : `${labels[locale].support} — ${config.brand.name}`;

  const description = isHome
    ? config.seo.description
    : isPrivacy
      ? `${labels[locale].policy} — ${config.brand.name}`
      : config.support.subtitle;
  const url = config.brand.url + route(page);

  return `    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    ${isHome ? `<meta name="keywords" content="${config.seo.keywords}">` : ""}
    <meta name="author" content="${config.brand.name}">
    <link rel="canonical" href="${url}">
    <link rel="alternate" hreflang="en" href="${config.brand.url}${route(page, "en")}">
    <link rel="alternate" hreflang="es" href="${config.brand.url}${route(page, "es")}">
    <link rel="alternate" hreflang="x-default" href="${config.brand.url}${route(page, "en")}">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="${config.brand.favicon}">
    <link rel="apple-touch-icon" href="${config.brand.favicon}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${config.brand.url}${config.seo.ogImage}">
    ${
      isHome
        ? `<meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">`
        : ""
    }

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${url}">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${config.brand.url}${config.seo.ogImage}">

    <!-- Theme color -->
    <meta name="theme-color" content="${config.colors.blush}">
    ${isHome ? `<meta name="msapplication-TileColor" content="${config.colors.blush}">` : ""}

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="${asset("styles.css")}">

    <!-- GoatCounter: cookieless pageviews, public dashboard -->
    <script data-goatcounter="https://sourpuss.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>`;
}

// Helper to generate nav
function generateNav(activePage) {
  return `    <nav aria-label="${locale === "es" ? "Navegación principal" : "Main navigation"}">
        <a href="${route("home")}"${activePage === "home" ? ' class="active"' : ""}>${labels[locale].home}</a>
        <a href="${route("privacy")}"${activePage === "privacy" ? ' class="active"' : ""}>${labels[locale].privacy}</a>
        <a href="${route("support")}"${activePage === "support" ? ' class="active"' : ""}>${labels[locale].support}</a>
        <a href="${route(activePage, locale === "en" ? "es" : "en")}" lang="${locale === "en" ? "es" : "en"}" class="language-switch">${locale === "en" ? "Español" : "English"}</a>
    </nav>`;
}

// Helper to generate footer
function generateFooter() {
  const links = config.footer.links
    .map((link) => {
      const href = link.url.includes("@")
        ? `mailto:${config.contact.email}`
        : link.url;
      return `            <a href="${href}">${link.text}</a>`;
    })
    .join("\n");

  return `    <footer>
        <div class="footer-logo">${config.brand.name}</div>
        <div class="footer-links">
${links}
        </div>
        <p class="footer-tagline">${config.footer.tagline}</p>
    </footer>`;
}

// Helper to generate brand name with highlight
function generateBrandName() {
  const name = config.brand.name;
  const highlight = config.brand.nameHighlight;
  if (highlight && name.includes(highlight)) {
    const parts = name.split(highlight);
    return `${parts[0]}<span class="highlight">${highlight}</span>${parts[1] || ""}`;
  }
  return name;
}

// Generate index.html
function generateIndex() {
  const features = config.features.items
    .map(
      (f) => `            <div class="feature-card">

                <h3>${f.title}</h3>
                <p>${f.description}</p>
${f.image ? `                <picture>${f.images?.ipad ? `<source media="(min-width: 1100px)" srcset="${f.images.ipad}">` : ""}<img class="feature-screenshot" src="${f.image}" alt="${f.altText}" loading="lazy"></picture>` : ""}
            </div>`,
    )
    .join("\n\n");

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
${generateMetaTags("home")}
</head>
<body class="page-home">
    <div class="cat-toy" id="catToy" aria-hidden="true">
        <svg viewBox="0 0 320 220"><path class="toy-string" d="M 160 0 L 160 160"/></svg>
        <div class="toy-ball"></div>
    </div>
    <!-- Navigation -->
${generateNav("home")}

    <!-- Hero Section -->
    <section class="hero">


        <div class="hero-content">
            <img src="${config.brand.logo}" alt="${config.brand.name}" class="hero-logo">
            <h1>${generateBrandName()}</h1>
            <p class="tagline">${config.brand.tagline}</p>
            <a href="${config.hero.ctaLink}" class="cta-button">
                <span class="icon">${config.hero.ctaIcon}</span>
                ${config.hero.ctaText}
            </a>
            <p class="availability">${labels[locale].availability}</p>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="features">
        <div class="features-header">
            <h2>${config.features.title}</h2>
            <p>${config.features.subtitle}</p>
        </div>
        <div class="features-grid">
${features}
        </div>
    </section>

    <!-- Footer -->
${generateFooter()}

    <!-- Config and App Scripts -->
    <script src="${asset("config.js")}"></script>
    <script src="${asset("toy-physics.js")}"></script>
    <script src="${asset("app.js")}"></script>
</body>
</html>`;
}

// Generate privacy/index.html
function generatePrivacy() {
  const sections = config.privacy.sections
    .map((section) => {
      let content = section.content;
      if (content === "CONTACT_EMAIL_PLACEHOLDER") {
        content = `<p>${labels[locale].contact} <a href="mailto:${config.contact.email}" class="email-link">${config.contact.email}</a></p>`;
      }

      const titleHtml = section.title
        ? `            <h2>${section.icon ? `<span class="icon">${section.icon}</span> ` : ""}${section.title}</h2>\n`
        : "";

      return `        <div class="content-section">
${titleHtml}            ${content}
        </div>`;
    })
    .join("\n\n");

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
${generateMetaTags("privacy")}
</head>
<body class="page-privacy">
    <!-- Navigation -->
${generateNav("privacy")}

    <main>
        <div class="page-header">
            <h1>${labels[locale].policy}</h1>
            <span class="date">${labels[locale].updated} ${config.privacy.lastUpdated}</span>
        </div>

${sections}

        <a href="${route("home")}" class="back-link">${labels[locale].back}</a>
    </main>

    <!-- Footer -->
${generateFooter()}

    <!-- Config and App Scripts -->
    <script src="${asset("config.js")}"></script>
    <script src="${asset("toy-physics.js")}"></script>
    <script src="${asset("app.js")}"></script>
</body>
</html>`;
}

// Generate support/index.html
function generateSupport() {
  const faqs = config.support.faqs
    .map(
      (faq) => `            <div class="faq-item">
                <button class="faq-question">${faq.question}</button>
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            </div>`,
    )
    .join("\n\n");

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
${generateMetaTags("support")}
</head>
<body class="page-support">
    <!-- Navigation -->
${generateNav("support")}

    <main>
        <div class="page-header">
            <h1>${config.support.title}</h1>
            <p>${config.support.subtitle}</p>
        </div>

        <div class="faq-list">
${faqs}
        </div>

        <div class="contact-card">
            <h2>${config.support.contactSection.title}</h2>
            <p>${config.support.contactSection.content}</p>
            <a href="mailto:${config.contact.email}" class="email-link">${config.contact.email}</a>
        </div>

        <a href="${route("home")}" class="back-link">${labels[locale].back}</a>
    </main>

    <!-- Footer -->
${generateFooter()}

    <!-- Config and App Scripts -->
    <script src="${asset("config.js")}"></script>
    <script src="${asset("toy-physics.js")}"></script>
    <script src="${asset("app.js")}"></script>
</body>
</html>`;
}

// Generate sitemap.xml
function generateSitemap() {
  const urls = ["en", "es"].flatMap((language) =>
    ["home", "privacy", "support"].map(
      (page) =>
        `<url><loc>${englishConfig.brand.url}${route(page, language)}</loc></url>`,
    ),
  );
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
}

// Generate robots.txt
function generateRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${config.brand.url}/sitemap.xml`;
}

// Generate llms.txt
function generateLlms() {
  const features = config.features.items
    .map((f) => `- ${f.title}: ${f.description.split(".")[0]}`)
    .join("\n");

  return `# ${config.brand.name}

> ${config.brand.shortTagline || config.brand.tagline.split(".")[0]}

${config.brand.tagline}

## Pages

- [Home](${config.brand.url}/): Main landing page with app features and download link
- [Privacy Policy](${config.brand.url}/privacy): How we collect, use, and protect user data
- [Support](${config.brand.url}/support): FAQs and contact information

## Key Features

${features}

## Contact

- Email: ${config.contact.email}
- Website: ${config.brand.url}

## App Availability

${config.hero.ctaText}.
`;
}

// Main build function
function build() {
  const spanish = require("./config.es.js");
  for (const language of ["en", "es"]) {
    locale = language;
    config = structuredClone(englishConfig);
    if (language === "es") {
      for (const [key, value] of Object.entries(spanish))
        config[key] = { ...config[key], ...value };
    }
    config.features.items =
      language === "en"
        ? screenshotFeatures.features
        : require("./screenshot-features.es.json").features;
    for (const [page, generate] of [
      ["home", generateIndex],
      ["privacy", generatePrivacy],
      ["support", generateSupport],
    ]) {
      const directory = path.join(__dirname, route(page));
      fs.mkdirSync(directory, { recursive: true });
      fs.writeFileSync(path.join(directory, "index.html"), generate());
    }
  }
  locale = "en";
  config = structuredClone(englishConfig);
  config.features.items = screenshotFeatures.features;
  fs.writeFileSync(path.join(__dirname, "sitemap.xml"), generateSitemap());
  fs.writeFileSync(path.join(__dirname, "robots.txt"), generateRobots());
  fs.writeFileSync(path.join(__dirname, "llms.txt"), generateLlms());
  console.log("Built English and Spanish home, support and privacy pages.");
}
build();
