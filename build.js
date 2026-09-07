#!/usr/bin/env node
/**
 * Build Script - Generates HTML pages from config.js
 * Run: node build.js
 * Then commit and push to GitHub Pages
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
function asset(file) {
    const version = crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, file))).digest('hex').slice(0, 10);
    return `/${file}?v=${version}`;
}

// Load config
const config = require('./config.js');

// Helper to generate meta tags
function generateMetaTags(page) {
    const isHome = page === 'home';
    const isPrivacy = page === 'privacy';
    const isSupport = page === 'support';

    const title = isHome ? config.seo.title :
                  isPrivacy ? `Privacy Policy — ${config.brand.name}` :
                  `Support — ${config.brand.name}`;

    const description = isHome ? config.seo.description :
                        isPrivacy ? `Privacy Policy for ${config.brand.name} - ${config.seo.description.split('.')[0].toLowerCase()}.` :
                        `Get help with ${config.brand.name}. Find answers to FAQs or contact our support team.`;

    const url = isHome ? config.brand.url :
                isPrivacy ? `${config.brand.url}/privacy` :
                `${config.brand.url}/support`;

    return `    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    ${isHome ? `<meta name="keywords" content="${config.seo.keywords}">` : ''}
    <meta name="author" content="${config.brand.name}">
    <link rel="canonical" href="${url}">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="${config.brand.favicon}">
    <link rel="apple-touch-icon" href="${config.brand.favicon}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${config.brand.url}${config.seo.ogImage}">
    ${isHome ? `<meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">` : ''}

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${url}">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${config.brand.url}${config.seo.ogImage}">

    <!-- Theme color -->
    <meta name="theme-color" content="${config.colors.blush}">
    ${isHome ? `<meta name="msapplication-TileColor" content="${config.colors.blush}">` : ''}

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="${asset('styles.css')}">`;
}

// Helper to generate nav
function generateNav(activePage) {
    return `    <nav>
        <a href="/"${activePage === 'home' ? ' class="active"' : ''}>Home</a>
        <a href="/privacy"${activePage === 'privacy' ? ' class="active"' : ''}>Privacy</a>
        <a href="/support"${activePage === 'support' ? ' class="active"' : ''}>Support</a>
    </nav>`;
}

// Helper to generate footer
function generateFooter() {
    const links = config.footer.links.map(link => {
        const href = link.url.includes('@') ? `mailto:${config.contact.email}` : link.url;
        return `            <a href="${href}">${link.text}</a>`;
    }).join('\n');

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
        return `${parts[0]}<span class="highlight">${highlight}</span>${parts[1] || ''}`;
    }
    return name;
}

// Generate index.html
function generateIndex() {
    const features = config.features.items.map(f => `            <div class="feature-card">

                <h3>${f.title}</h3>
                <p>${f.description}</p>
            </div>`).join('\n\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
${generateMetaTags('home')}
</head>
<body class="page-home">
    <!-- Navigation -->
${generateNav('home')}

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
            <p class="availability">In development for iPhone.</p>
        </div>
        <div class="toy-stage">
            <div class="cat-toy" id="catToy">
                <svg viewBox="0 0 400 420" aria-hidden="true"><path class="toy-string" d="M 200 0 L 200 260"/></svg>
                <button type="button" class="toy-ball" aria-label="Play with the wool ball" aria-describedby="toyHint"><span class="toy-ball-connector"></span></button>
            </div>
            <p id="toyHint">Go on. Give it a tug.</p>
            <p class="toy-help">Drag &amp; release. Or use the arrow keys.</p>
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
    <script src="${asset('config.js')}"></script>
    <script src="${asset('toy-physics.js')}"></script>
    <script src="${asset('app.js')}"></script>
</body>
</html>`;
}

// Generate privacy/index.html
function generatePrivacy() {
    const sections = config.privacy.sections.map(section => {
        let content = section.content;
        if (content === 'CONTACT_EMAIL_PLACEHOLDER') {
            content = `<p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:${config.contact.email}" class="email-link">${config.contact.email}</a></p>`;
        }

        const titleHtml = section.title ?
            `            <h2>${section.icon ? `<span class="icon">${section.icon}</span> ` : ''}${section.title}</h2>\n` : '';

        return `        <div class="content-section">
${titleHtml}            ${content}
        </div>`;
    }).join('\n\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
${generateMetaTags('privacy')}
</head>
<body class="page-privacy">
    <!-- Navigation -->
${generateNav('privacy')}

    <main>
        <div class="page-header">
            <h1>Privacy Policy</h1>
            <span class="date">Updated ${config.privacy.lastUpdated}</span>
        </div>

${sections}

        <a href="/" class="back-link">← Back to Home</a>
    </main>

    <!-- Footer -->
${generateFooter()}

    <!-- Config and App Scripts -->
    <script src="${asset('config.js')}"></script>
    <script src="${asset('toy-physics.js')}"></script>
    <script src="${asset('app.js')}"></script>
</body>
</html>`;
}

// Generate support/index.html
function generateSupport() {
    const faqs = config.support.faqs.map(faq => `            <div class="faq-item">
                <button class="faq-question">${faq.question}</button>
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            </div>`).join('\n\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
${generateMetaTags('support')}
</head>
<body class="page-support">
    <!-- Navigation -->
${generateNav('support')}

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

        <a href="/" class="back-link">← Back to Home</a>
    </main>

    <!-- Footer -->
${generateFooter()}

    <!-- Config and App Scripts -->
    <script src="${asset('config.js')}"></script>
    <script src="${asset('toy-physics.js')}"></script>
    <script src="${asset('app.js')}"></script>
</body>
</html>`;
}

// Generate sitemap.xml
function generateSitemap() {
    const today = new Date().toISOString().split('T')[0];
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${config.brand.url}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${config.brand.url}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${config.brand.url}/support</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
}

// Generate robots.txt
function generateRobots() {
    return `User-agent: *
Allow: /

Sitemap: ${config.brand.url}/sitemap.xml`;
}

// Generate llms.txt
function generateLlms() {
    const features = config.features.items.map(f => `- ${f.title}: ${f.description.split('.')[0]}`).join('\n');

    return `# ${config.brand.name}

> ${config.brand.shortTagline || config.brand.tagline.split('.')[0]}

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
    console.log('🔨 Building site from config.js...\n');

    // Generate and write index.html
    fs.writeFileSync(path.join(__dirname, 'index.html'), generateIndex());
    console.log('✅ index.html');

    // Ensure privacy directory exists
    const privacyDir = path.join(__dirname, 'privacy');
    if (!fs.existsSync(privacyDir)) {
        fs.mkdirSync(privacyDir);
    }
    fs.writeFileSync(path.join(privacyDir, 'index.html'), generatePrivacy());
    console.log('✅ privacy/index.html');

    // Ensure support directory exists
    const supportDir = path.join(__dirname, 'support');
    if (!fs.existsSync(supportDir)) {
        fs.mkdirSync(supportDir);
    }
    fs.writeFileSync(path.join(supportDir, 'index.html'), generateSupport());
    console.log('✅ support/index.html');

    // Generate sitemap.xml
    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), generateSitemap());
    console.log('✅ sitemap.xml');

    // Generate robots.txt
    fs.writeFileSync(path.join(__dirname, 'robots.txt'), generateRobots());
    console.log('✅ robots.txt');

    // Generate llms.txt
    fs.writeFileSync(path.join(__dirname, 'llms.txt'), generateLlms());
    console.log('✅ llms.txt');

    console.log('\n🎉 Build complete! Commit and push to deploy.');
}

build();
