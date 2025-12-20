# Sourpuss Marketing Site

A config-driven marketing site for cocktail review apps. Easily white-label for different brands.

## Quick Start

1. Clone this repository
2. Edit `config.js` to customize your brand
3. Replace `logo.png` and `og-image.png` with your assets
4. Run `node build.js` to regenerate all pages
5. Commit and push to deploy to GitHub Pages

## File Structure

```
├── config.js           # 🎨 All customizable content (edit this!)
├── build.js            # 🔨 Generates HTML from config
├── index.html          # Home page (generated)
├── privacy/index.html  # Privacy policy (generated)
├── support/index.html  # Support/FAQ page (generated)
├── sitemap.xml         # SEO sitemap (generated)
├── robots.txt          # Search directives (generated)
├── llms.txt            # AI context (generated)
├── app.js              # Runtime interactions (cat toy, FAQ accordion)
├── styles.css          # Shared styles
├── logo.png            # Brand logo
└── og-image.png        # Social sharing image (1200x630)
```

## White-Labeling Guide

### 1. Brand Configuration (`config.js`)

Edit `config.js` to customize:

```javascript
const CONFIG = {
    brand: {
        name: "YourApp",           // App name
        nameHighlight: "App",      // Part to italicize
        tagline: "Your tagline",   // Main tagline
        logo: "/logo.png",         // Logo path
        url: "https://yourapp.com" // Site URL
    },

    colors: {
        blush: "#FFD9D4",     // Primary background
        golden: "#FFB900",    // Accent color
        ink: "#1A1A1A",       // Text color
        // ... more colors
    },

    features: {
        items: [
            { icon: "🗺️", title: "Feature 1", description: "..." },
            // ... more features
        ]
    },

    // ... more sections
};
```

### 2. Replace Assets

- **logo.png**: Your app icon/logo (recommended: 512x512 PNG)
- **og-image.png**: Social sharing preview (1200x630 PNG)

### 3. Update Meta Tags

In each HTML file, update:
- `<title>` tag
- `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:url`)
- Twitter card tags
- `<link rel="canonical">`

### 4. Customize Colors

Edit the `colors` object in `config.js`. Colors are applied as CSS variables:

| Variable | Purpose |
|----------|---------|
| `--blush` | Primary background |
| `--blush-light` | Light background variant |
| `--golden` | Accent/highlight color |
| `--golden-dark` | Dark accent |
| `--ink` | Primary text color |
| `--whisky` | Secondary accent |
| `--cream` | Card backgrounds |

### 5. Customize Content

All text content is configurable in `config.js`:

- **Hero section**: Title, tagline, CTA button
- **Features**: Icons, titles, descriptions
- **Marquee quotes**: Scrolling text messages
- **Footer**: Links and tagline
- **Privacy policy**: All sections with icons
- **Support/FAQ**: Questions and answers

### 6. Cat Toy

The playful cat toy ball can be disabled:

```javascript
catToy: {
    enabled: false  // Set to false to hide
}
```

## Deployment

### GitHub Pages

1. Push to GitHub
2. Go to Settings → Pages
3. Select "Deploy from branch" → main
4. Custom domain (optional): Add CNAME file

### Other Hosts

This is a static site - deploy to:
- Netlify
- Vercel
- Cloudflare Pages
- Any static host

## Development

Open `index.html` in a browser. No build step required.

For local development with live reload:
```bash
npx serve .
```

## License

MIT
