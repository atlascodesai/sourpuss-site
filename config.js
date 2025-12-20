// Site Configuration - Edit this file to white-label the site
const CONFIG = {
    // Brand
    brand: {
        name: "Sourpuss",
        nameHighlight: "puss", // Part of name to highlight (italic + underline)
        tagline: "Find and rate the best whisky sours in your city. A community for discerning sippers.",
        shortTagline: "Find and rate the best whisky sours in your city",
        logo: "/logo.png",
        favicon: "/logo.png",
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
        ctaText: "Coming Soon to App Store",
        ctaLink: "#",
        ctaIcon: "" // Apple icon
    },

    // Features
    features: {
        title: "Everything you need",
        subtitle: "Your pocket guide to the perfect pour",
        items: [
            {
                icon: "🗺️",
                title: "Find Bars",
                description: "Discover cocktail bars near you with real ratings from fellow enthusiasts. Never settle for a mediocre drink again."
            },
            {
                icon: "⭐",
                title: "Rate & Review",
                description: "Share your cocktail experiences with the community. Your taste matters—help others find their next favorite spot."
            },
            {
                icon: "🏆",
                title: "Leaderboards",
                description: "See the top-rated bars and most active reviewers in your area. Competition makes everything more fun."
            },
            {
                icon: "❤️",
                title: "Save Favorites",
                description: "Bookmark the bars you love or want to visit. Build your personal cocktail bucket list."
            }
        ]
    },

    // Marquee quotes
    marquee: {
        quotes: [
            { text: "*sips judgmentally*", icon: "🐱" },
            { text: "meow.", icon: "🥃" },
            { text: "I'll be the judge of that", icon: "🐱" },
            { text: "Purrfection or nothing", icon: "🥃" },
            { text: "This better be good", icon: "🐱" },
            { text: "*judges silently*", icon: "🥃" }
        ]
    },

    // Floating decorations in hero
    floaters: ["🥃", "🍋", "🧊", "🐱", "🥃", "✨"],

    // Footer
    footer: {
        tagline: "Made with whisky and cats",
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
        lastUpdated: "December 20, 2025",
        sections: [
            {
                content: 'Sourpuss ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.'
            },
            {
                icon: "📱",
                title: "Information We Collect",
                content: "<p><strong>Account Information:</strong> When you sign in with Apple or email, we collect:</p><ul><li>Your Apple ID identifier (anonymized by Apple) or email address</li><li>Username you choose during onboarding</li><li>Country you select (optional)</li></ul><p><strong>User-Generated Content:</strong></p><ul><li>Reviews and ratings you submit</li><li>Photos you upload</li><li>Comments you post</li></ul><p><strong>Location Data:</strong> With your permission, we access your location to show nearby bars. Location is used only while the app is active and is not stored on our servers.</p>"
            },
            {
                icon: "🎯",
                title: "How We Use Your Information",
                content: "<ul><li>To provide and maintain our service</li><li>To display your reviews and profile to other users</li><li>To show you nearby venues</li><li>To calculate leaderboards and statistics</li></ul>"
            },
            {
                icon: "💾",
                title: "Data Storage",
                content: "<p>Your data is stored securely using Convex, a cloud database service. We implement appropriate security measures to protect your personal information.</p>"
            },
            {
                icon: "🔗",
                title: "Third-Party Services",
                content: "<ul><li><strong>Apple Sign In:</strong> For authentication</li><li><strong>Apple Maps / Google Maps:</strong> For venue search and display</li><li><strong>Convex:</strong> For data storage and real-time sync</li></ul>"
            },
            {
                icon: "🤝",
                title: "Data Sharing",
                content: "<p>We do not sell your personal information. Your public profile (username, reviews) is visible to other users. We may share anonymized, aggregate data for analytics purposes.</p>"
            },
            {
                icon: "✨",
                title: "Your Rights",
                content: "<p>You can:</p><ul><li>Delete your account and all associated data from Settings</li><li>Export your data from Settings</li><li>Update your profile information at any time</li></ul>"
            },
            {
                icon: "📧",
                title: "Contact Us",
                content: "CONTACT_EMAIL_PLACEHOLDER"
            }
        ]
    },

    // Support / FAQ
    support: {
        title: "Support",
        subtitle: "We're here to help! Find answers to common questions below.",
        faqs: [
            {
                question: "How do I create an account?",
                answer: "Download Sourpuss from the App Store and tap \"Sign in with Apple\" to create your account instantly. You'll then choose a username and optionally select your country."
            },
            {
                question: "How do I add a review?",
                answer: "Tap the + button on the map screen, search for the bar you visited, rate your whisky sour from 1-5, add optional photos and notes, then submit your review."
            },
            {
                question: "Can I edit or delete my reviews?",
                answer: "Yes! Go to your profile, find the review you want to modify, and tap the edit or delete button. Note that deleted reviews cannot be recovered."
            },
            {
                question: "How are bar ratings calculated?",
                answer: "Bar ratings are the average of all whisky sour reviews for that location. The more reviews a bar has, the more reliable its rating becomes."
            },
            {
                question: "How do I report inappropriate content?",
                answer: "Tap the three dots on any review and select \"Report\". Our moderation team reviews all reports within 24 hours."
            },
            {
                question: "How do I delete my account?",
                answer: "Go to Profile → Settings → Delete Account. This will permanently remove your account and all associated data including reviews, photos, and comments."
            }
        ],
        contactSection: {
            title: "Still need help?",
            content: ""
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
