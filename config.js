// Site Configuration - Edit this file to white-label the site
const CONFIG = {
    // Brand
    brand: {
        name: "Sourpuss",
        nameHighlight: "", // Part of name to highlight (italic + underline)
        tagline: "A good whisky sour is worth remembering. Find your next one. Keep notes on the last.",
        shortTagline: "Find and rate the best whisky sours in your city",
        logo: "/logo.png",
        favicon: "",
        url: "https://sourpuss.app"
    },

    // Colors (CSS variables)
    colors: {
        blush: "#FFD9D4",        // Primary background
        blushLight: "#FFF0ED",   // Light background variant
        golden: "#FFB900",       // Accent color
        goldenDark: "#E6A700",   // Dark accent
        ink: "#1A1A1A",          // Text color
        whisky: "#8B4513",       // Secondary accent
        whiskyLight: "#A0522D",  // Light secondary
        cream: "#FFF8F5"         // Card backgrounds
    },

    // Hero Section
    hero: {
        badge: "Whisky Sour Reviews",
        ctaText: "Explore Sourpuss",
        ctaLink: "#features",
        ctaIcon: "" // Apple icon
    },

    // Features
    features: {
        title: "For the next round.",
        subtitle: "A map of places to try. A journal of drinks worth remembering.",
        items: [
            {
                icon: "",
                title: "Find a place",
                description: "Look around the map, read reviews and pick somewhere for a whisky sour."
            },
            {
                icon: "",
                title: "Remember the drink",
                description: "The balance, the glass, the first sip. Save a rating, a few notes and a photo. Keep it private or share it."
            },
            {
                icon: "",
                title: "Compare notes",
                description: "See which places other reviewers rate. Find a favourite you might have walked past."
            },
            {
                icon: "",
                title: "Keep a short list",
                description: "Save places for another night, and keep the ones you would go back to close at hand."
            }
        ]
    },

    // Marquee quotes
    marquee: {
        quotes: [
            { text: "*sips judgmentally*", icon: "" },
            { text: "meow.", icon: "" },
            { text: "I'll be the judge of that", icon: "" },
            { text: "Purrfection or nothing", icon: "" },
            { text: "This better be good", icon: "" },
            { text: "*judges silently*", icon: "" }
        ]
    },

    // Floating decorations in hero
    floaters: [],

    // Footer
    footer: {
        tagline: "Good drinks. Strong opinions.",
        links: [
            { text: "Privacy Policy", url: "/privacy" },
            { text: "Support", url: "/support" },
            { text: "Contact", url: "mailto:support@sourpuss.app" }
        ]
    },

    // Contact
    contact: {
        email: "support@sourpuss.app"
    },

    // SEO
    seo: {
        title: "Sourpuss — Whisky Sour Reviews",
        description: "Find and rate the best whisky sours in your city. A community app for discerning cocktail enthusiasts.",
        keywords: "whisky sour, cocktail reviews, bar finder, cocktail app, drink ratings",
        ogImage: "/og-image.png"
    },

    // Privacy Policy
    privacy: {
        lastUpdated: "September 7, 2026",
        sections: [
            {
                content: "This policy explains how Sourpuss handles information when you use the app and this website. For questions or an account-data request, contact support@sourpuss.app."
            },
            {
                icon: "",
                title: "Account and contributions",
                content: "<p>Clerk manages sign-in with email or Apple. Our Convex backend stores your sign-in identifier and the account information you provide, such as your email, username, name or photo, country, and preferences.</p><p>When you use the app, we store your contributions and activity, including reviews, ratings, photos, comments, saved places, visits, follows, events, and corrections to place information. We also store reports you submit, moderation decisions, and your blocked-user preferences.</p>"
            },
            {
                icon: "",
                title: "Location and places",
                content: "<p>With your permission, we use your current location for nearby discovery and directions. Search, geocoding, and directions requests may be processed by our backend and Apple or Google map services.</p><p>Saved home or viewing cities, recent cities, and venue-related contributions or visits can remain associated with your account. You can change location permission in your device settings.</p>"
            },
            {
                icon: "",
                title: "Visibility and sharing",
                content: "<p>Your profile and contributions have visibility settings. Profile settings and review visibility are separate: changing your profile visibility does not necessarily change every review.</p><p>A public profile can show information such as your username, name or photo, country, and visible contributions. Account email addresses and sign-in identifiers are not included in public profile responses. Reports and block preferences are not public. Moderators can inspect reported shared content and submissions held for publication review. We do not sell your personal information.</p>"
            },
            {
                icon: "",
                title: "Services that process information",
                content: "<ul><li><strong>Clerk:</strong> sign-in and account authentication.</li><li><strong>Convex:</strong> account data, contributions, uploaded files, and backend requests.</li><li><strong>Apple Maps and Google Maps:</strong> map display, place discovery, geocoding, and directions.</li><li><strong>RevenueCat:</strong> subscription purchases, entitlement status, and restoration, linked to your Clerk user identifier. Store payment processing and transaction records are handled by Apple or Google.</li><li><strong>Sentry, when enabled:</strong> error and performance diagnostics. The app removes credential-like values and clears configured user identity from these reports.</li><li><strong>PostHog, when enabled:</strong> usage events associated with an app user identifier and properties such as country, platform, and onboarding status. Session replay is disabled in the app configuration.</li></ul><p>This website is hosted on GitHub Pages and loads fonts from Google Fonts. Those services receive normal web requests, including network and browser information. These providers also handle information under their own privacy policies.</p>"
            },
            {
                icon: "",
                title: "Why we use information",
                content: "<p>We use information to operate sign-in and app features, display contributions according to their visibility settings, find places, maintain rankings and account preferences, deliver subscriptions, respond to support requests, and investigate service errors and abuse.</p>"
            },
            {
                icon: "",
                title: "Export and retention",
                content: "<p>You can export your app account data from Settings without a paid subscription. This JSON export includes app records and uploaded-media information; it is not a complete export of records separately held by your app store or every service provider.</p><p>Removing an individual review hides it from normal display and is different from deleting your account. Removed reviews may remain available to administrators for restoration. Account records remain while your account is active or while requested deletion is being completed.</p>"
            },
            {
                icon: "",
                title: "Deleting your account",
                content: "<p>You can request account deletion in Settings. Our deletion workflow removes your sign-in and first-party account records, including owned contributions and uploads, and requests cleanup from configured subscription and analytics services.</p><p>If a cleanup step fails, the app provides retry or support instructions. A recovery record can remain while cleanup is retried. Contact support if you cannot sign back in to retry.</p><p><strong>Deleting your Sourpuss account does not cancel an App Store or Google Play subscription.</strong> Manage renewal with the store. Store transaction records are handled under the store’s own policies.</p>"
            },
            {
                icon: "",
                title: "Contact us",
                content: "CONTACT_EMAIL_PLACEHOLDER"
            }
        ]
    },

    // Support / FAQ
    support: {
        title: "Support",
        subtitle: "Questions about your account, reviews, or Network Pro? Start here.",
        faqs: [
            {
                question: "How do I create an account?",
                answer: "Open Sourpuss and choose an available sign-in method, such as email or Sign in with Apple. Follow the on-screen steps, then choose your username and account preferences. Public App Store availability will be announced on this website."
            },
            {
                question: "How do I add a review?",
                answer: "Open the Review tab, choose a place, and record your cocktail with a rating, notes, and optional photos. Check the selected catalog and visibility before submitting. Shared submissions may be held for moderation before publication; Settings shows pending submissions and lets you withdraw them."
            },
            {
                question: "Can I edit or remove my reviews?",
                answer: "Find your review on your profile and use its edit or remove action. Removing a review hides it from normal display; it is not the same as deleting your account, and an administrator may be able to restore it."
            },
            {
                question: "How are venue ratings calculated?",
                answer: "Venue ratings use eligible community reviews within the selected catalog. Coffee, food, and cocktail ratings are kept separate."
            },
            {
                question: "How do I report a problem or inappropriate content?",
                answer: "While signed in, use Report or block on a review, comment, event, or profile in a follow list. Choose a reason and send your report, or confirm a block. Manage blocked users in Settings. You can also email support@sourpuss.app with the relevant content and a description of the problem. Do not send passwords or payment-card details."
            },
            {
                question: "What does Network Pro include?",
                answer: "Network Pro is an optional auto-renewing subscription that unlocks a portable HTML journal of your reviews and events. Your full-record account JSON export remains free. The paywall shows the price and renewal terms before purchase."
            },
            {
                question: "How do I restore or cancel a subscription?",
                answer: "Use Restore Purchases in Sourpuss to restore access for the same store account. Use Manage Subscription to review or cancel renewal with Apple or Google. Deleting your Sourpuss account does not cancel store renewal."
            },
            {
                question: "How do I export or delete my account?",
                answer: "Open Settings from your profile to export your app data or request account deletion. If cleanup fails, follow the retry instructions or email support@sourpuss.app. Manage any subscription separately with your app store."
            }
        ],
        contactSection: {
            title: "Still need help?",
            content: "Contact support@sourpuss.app. Include your app version and a description of the issue, but never send passwords or payment details."
        }
    },

    // Cat toy (playful element)
    catToy: {
        enabled: true,
        ballColor: {
            primary: "#E88D9C",
            secondary: "#D4707F",
            tertiary: "#B84D5D"
        },
        stringColor: "#8B4513"
    }
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.SITE_CONFIG = CONFIG;
}

// Export for Node.js build scripts
if (typeof module !== 'undefined') {
    module.exports = CONFIG;
}
