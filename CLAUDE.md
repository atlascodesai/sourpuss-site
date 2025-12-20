# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

A config-driven marketing site for the Sourpuss whisky sour review app. Designed for easy white-labeling.

## Build Commands

```bash
# Regenerate all pages from config
node build.js

# Local development
npx serve .
```

## Architecture

**Config-driven static site** - All content lives in `config.js`, build script generates HTML.

### File Structure

```
├── config.js           # All customizable content (edit this!)
├── build.js            # Node.js script that generates all pages
├── styles.css          # Shared styles with CSS variables
├── app.js              # Runtime JS (cat toy, FAQ accordion)
├── index.html          # Generated home page
├── privacy/index.html  # Generated privacy policy
├── support/index.html  # Generated support/FAQ page
├── sitemap.xml         # Generated SEO sitemap
├── robots.txt          # Generated search directives
├── llms.txt            # Generated AI context file
├── logo.png            # Brand logo (512x512 recommended)
├── og-image.png        # Social sharing image (1200x630)
└── CNAME               # GitHub Pages custom domain
```

### Workflow

1. Edit `config.js` to change any content
2. Run `node build.js` to regenerate all pages
3. Commit and push to deploy via GitHub Pages

## White-Labeling

To create a new brand version:

1. **Edit `config.js`**:
   - `brand`: name, tagline, logo, URL
   - `colors`: all color variables
   - `features`: feature list with icons
   - `marquee`: scrolling quotes
   - `privacy`: privacy policy sections
   - `support.faqs`: FAQ items

2. **Replace assets**:
   - `logo.png` - App icon (512x512 PNG)
   - `og-image.png` - Social preview (1200x630 PNG)

3. **Run build**: `node build.js`

## Key Features

- **SEO optimized**: Meta tags, Open Graph, Twitter Cards, sitemap, robots.txt
- **Mobile responsive**: Tested on iPhone viewport sizes
- **llms.txt**: AI assistant context file for the site
- **Cat paw cursor**: Custom 4-toe paw cursor (dark for body, golden for links)
- **Cat toy**: Optional bouncing ball animation (toggle in config)

## Deployment

Deployed via GitHub Pages with custom domain (sourpuss.app).

Push to `main` branch triggers automatic deployment.

## Notes

- The cat paw cursor has 4 toe beans (anatomically correct for cats)
- All HTML files are generated - edit `config.js` and `build.js`, not the HTML directly
- Privacy policy and FAQ content support HTML in the config
