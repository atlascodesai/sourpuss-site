// Site Application - Applies config to the page
(function() {
    const config = window.SITE_CONFIG;
    if (!config) {
        console.error('Config not loaded');
        return;
    }

    // Apply CSS variables for colors
    function applyColors() {
        const root = document.documentElement;
        root.style.setProperty('--blush', config.colors.blush);
        root.style.setProperty('--blush-light', config.colors.blushLight);
        root.style.setProperty('--golden', config.colors.golden);
        root.style.setProperty('--golden-dark', config.colors.goldenDark);
        root.style.setProperty('--ink', config.colors.ink);
        root.style.setProperty('--whisky', config.colors.whisky);
        root.style.setProperty('--whisky-light', config.colors.whiskyLight);
        root.style.setProperty('--cream', config.colors.cream);
    }

    // Apply brand name with highlight
    function applyBrandName(element) {
        if (!element) return;
        const name = config.brand.name;
        const highlight = config.brand.nameHighlight;

        if (highlight && name.includes(highlight)) {
            const parts = name.split(highlight);
            element.innerHTML = parts[0] + '<span class="highlight">' + highlight + '</span>' + (parts[1] || '');
        } else {
            element.textContent = name;
        }
    }

    // Render features grid
    function renderFeatures() {
        const grid = document.querySelector('.features-grid');
        if (!grid) return;

        grid.innerHTML = config.features.items.map(feature => `
            <div class="feature-card reveal">
                <div class="feature-icon">${feature.icon}</div>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        `).join('');
    }

    // Render marquee
    function renderMarquee() {
        const marquee = document.querySelector('.marquee');
        if (!marquee) return;

        // Double the quotes for seamless loop
        const quotes = [...config.marquee.quotes, ...config.marquee.quotes];
        marquee.innerHTML = quotes.map(q => `
            <div class="marquee-item">${q.text} <span>${q.icon}</span></div>
        `).join('');
    }

    // Render floaters
    function renderFloaters() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Remove existing floaters
        hero.querySelectorAll('.floater').forEach(f => f.remove());

        // Add new floaters
        config.floaters.forEach(emoji => {
            const floater = document.createElement('div');
            floater.className = 'floater';
            floater.textContent = emoji;
            hero.insertBefore(floater, hero.firstChild);
        });
    }

    // Render footer
    function renderFooter() {
        const footerLogo = document.querySelector('.footer-logo');
        const footerLinks = document.querySelector('.footer-links');
        const footerTagline = document.querySelector('.footer-tagline');

        if (footerLogo) {
            footerLogo.innerHTML = '🐱 ' + config.brand.name;
        }

        if (footerLinks) {
            footerLinks.innerHTML = config.footer.links.map(link =>
                `<a href="${link.url}">${link.text}</a>`
            ).join('');
        }

        if (footerTagline) {
            footerTagline.textContent = config.footer.tagline;
        }
    }

    // Render privacy policy sections
    function renderPrivacyPolicy() {
        const main = document.querySelector('main');
        if (!main || !document.body.classList.contains('page-privacy')) return;

        const header = main.querySelector('.page-header');
        if (header) {
            header.querySelector('.date').textContent = 'Updated ' + config.privacy.lastUpdated;
        }

        // Remove existing sections (keep header)
        main.querySelectorAll('.content-section').forEach(s => s.remove());

        // Add sections from config
        config.privacy.sections.forEach(section => {
            const div = document.createElement('div');
            div.className = 'content-section';

            let html = '';
            if (section.title) {
                html += `<h2>${section.icon ? `<span class="icon">${section.icon}</span>` : ''} ${section.title}</h2>`;
            }

            let content = section.content;
            // Replace contact email placeholder
            if (content === 'CONTACT_EMAIL_PLACEHOLDER') {
                content = `<p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:${config.contact.email}" class="email-link">${config.contact.email}</a></p>`;
            }
            html += content;

            div.innerHTML = html;
            main.querySelector('.back-link').before(div);
        });
    }

    // Render support/FAQ page
    function renderSupport() {
        const main = document.querySelector('main');
        if (!main || !document.body.classList.contains('page-support')) return;

        const subtitle = main.querySelector('.page-header p');
        if (subtitle) {
            subtitle.textContent = config.support.subtitle;
        }

        const faqList = main.querySelector('.faq-list');
        if (faqList) {
            faqList.innerHTML = config.support.faqs.map(faq => `
                <div class="faq-item">
                    <button class="faq-question">${faq.question}</button>
                    <div class="faq-answer">
                        <p>${faq.answer}</p>
                    </div>
                </div>
            `).join('');

            // Re-attach event listeners
            faqList.querySelectorAll('.faq-question').forEach(btn => {
                btn.addEventListener('click', () => {
                    const item = btn.parentElement;
                    const wasOpen = item.classList.contains('open');
                    faqList.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
                    if (!wasOpen) item.classList.add('open');
                });
            });
        }

        const contactSection = main.querySelector('.contact-card');
        if (contactSection) {
            const title = contactSection.querySelector('h2');
            const content = contactSection.querySelector('p');
            const emailLink = contactSection.querySelector('.email-link');

            if (title) title.innerHTML = `<span class="icon">💬</span> ${config.support.contactSection.title}`;
            if (content) content.textContent = config.support.contactSection.content;
            if (emailLink) {
                emailLink.href = `mailto:${config.contact.email}`;
                emailLink.textContent = config.contact.email;
            }
        }
    }

    // Update meta tags dynamically (for SPA-like behavior)
    function updateMeta() {
        // Update favicon
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) favicon.href = config.brand.favicon;

        const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
        if (appleTouchIcon) appleTouchIcon.href = config.brand.favicon;
    }

    // Initialize scroll reveal
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        const revealOnScroll = () => {
            reveals.forEach(el => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < windowHeight - 100) {
                    el.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();
    }

    // Initialize cat toy
    function initCatToy() {
        if (!config.catToy.enabled) {
            const catToy = document.getElementById('catToy');
            if (catToy) catToy.style.display = 'none';
            return;
        }

        const catToy = document.getElementById('catToy');
        if (!catToy) return;

        const toyString = catToy.querySelector('.toy-string');
        const toyBall = catToy.querySelector('.toy-ball');

        if (!toyString || !toyBall) return;

        let isSwinging = false;
        let swingPhase = 0;
        let swingVelocity = 0;
        let animationFrame;

        function updateString(offset) {
            const controlX = 50 + offset * 0.6;
            const endX = 50 + offset;
            toyString.setAttribute('d', `M 50 0 Q ${controlX} 75 ${endX} 150`);
            toyBall.style.left = `calc(50% + ${offset}px)`;
            toyBall.style.transform = `translateX(-50%) rotate(${offset * 0.4}deg)`;
        }

        function animateSwing() {
            if (Math.abs(swingVelocity) < 0.1 && Math.abs(swingPhase) < 0.5) {
                swingPhase = 0;
                swingVelocity = 0;
                updateString(0);
                isSwinging = false;
                return;
            }

            swingVelocity += -swingPhase * 0.06;
            swingVelocity *= 0.97;
            swingPhase += swingVelocity;

            updateString(swingPhase);
            animationFrame = requestAnimationFrame(animateSwing);
        }

        function triggerSwing(direction = 1) {
            if (isSwinging) return;
            isSwinging = true;
            swingVelocity = direction * 10;
            cancelAnimationFrame(animationFrame);
            animateSwing();
        }

        document.addEventListener('mousemove', (e) => {
            const rect = catToy.getBoundingClientRect();
            const ballCenterX = rect.left + rect.width / 2;
            const ballCenterY = rect.top + 180;
            const distance = Math.sqrt(Math.pow(e.clientX - ballCenterX, 2) + Math.pow(e.clientY - ballCenterY, 2));

            if (distance < 150 && !isSwinging) {
                const direction = e.clientX > ballCenterX ? -1 : 1;
                triggerSwing(direction);
            }
        });

        setTimeout(() => triggerSwing(1), 600);
    }

    // Main initialization
    function init() {
        applyColors();
        updateMeta();

        // Home page specific
        const heroLogo = document.querySelector('.hero-logo');
        if (heroLogo) heroLogo.src = config.brand.logo;

        const brandTitle = document.querySelector('.hero h1');
        applyBrandName(brandTitle);

        const tagline = document.querySelector('.tagline');
        if (tagline) tagline.textContent = config.brand.tagline;

        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.href = config.hero.ctaLink;
            const icon = ctaButton.querySelector('.icon');
            if (icon) icon.textContent = config.hero.ctaIcon;
            ctaButton.childNodes[ctaButton.childNodes.length - 1].textContent = config.hero.ctaText;
        }

        const featuresTitle = document.querySelector('.features-header h2');
        if (featuresTitle) featuresTitle.textContent = config.features.title;

        const featuresSubtitle = document.querySelector('.features-header p');
        if (featuresSubtitle) featuresSubtitle.textContent = config.features.subtitle;

        renderFeatures();
        renderMarquee();
        renderFloaters();
        renderFooter();
        renderPrivacyPolicy();
        renderSupport();
        initScrollReveal();
        initCatToy();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
