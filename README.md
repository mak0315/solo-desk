# SoloDesk - Freelance Business Toolkit Website

A professional, 100% frontend-only static website featuring free online tools, educational articles, templates, and resources for freelancers.

## Features

- **Free Tools**: Invoice Generator, Hourly Rate Calculator, Project Pricing Calculator, Quote Generator, Freelance Platform Fee Calculator, Time Tracker
- **Static Admin Panel**: Browser-based admin interface for managing settings (localStorage-based)
- **AdSense Ready**: Built-in AdSense configuration and placement management
- **SEO Optimized**: Meta tags, Open Graph, structured data ready
- **Dark/Light Mode**: User preference saved in localStorage
- **Mobile Responsive**: Mobile-first design
- **100% Static**: No backend, no database, deployable on GitHub Pages or Cloudflare Pages
- **Privacy Focused**: All calculations happen in the browser

## Project Structure

```
solodesk/
├── index.html              # Homepage
├── about.html              # About page
├── contact.html            # Contact page
├── tools/                  # All tools
│   ├── index.html
│   ├── invoice-generator.html
│   ├── hourly-rate-calculator.html
│   ├── project-pricing-calculator.html
│   ├── quote-generator.html
│   ├── freelance-fee-calculator.html
│   └── time-tracker.html
├── blog/                   # Blog/Guides
├── templates/              # Templates
├── legal/                  # Legal pages
├── admin/                  # Static admin panel
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── config/
│   └── site-config.json   # Website configuration
└── content/
    └── articles/          # Static article content
```

## Quick Start

### 1. Download the Project

Download or clone this repository to your computer.

### 2. Open Locally

Simply open `index.html` in your web browser. No server required - it's 100% static.

### 3. Edit Website Settings

1. Open `/admin/index.html` in your browser
2. Go to different sections to configure settings
3. Settings are saved to your browser's localStorage
4. **Important**: These changes are only visible in this browser until published

### 4. Add an Article

1. Create a new file in `content/articles/` as either `.json` or `.md`
2. Example JSON format:
```json
{
  "title": "Your Article Title",
  "slug": "your-article-slug",
  "description": "Short description",
  "content": "<p>HTML content</p>",
  "category": "Guides",
  "tags": ["freelance", "tips"],
  "author": "SoloDesk",
  "date": "2026-01-01",
  "published": true,
  "seoTitle": "SEO Title",
  "seoDescription": "SEO Description"
}
```
3. Or use Markdown files
4. Commit to GitHub

### 5. Add or Update a Tool

1. Go to `tools/` directory
2. Create a new HTML file or edit existing ones
3. Follow the existing tool structure (use vanilla JS, no backend)
4. Add link to `tools/index.html` and homepage if needed
5. Commit to GitHub

### 6. Configure AdSense

1. Open `/admin/index.html` → AdSense section
2. Add your Publisher ID (ca-pub-XXXXXXXXXX)
3. Add AdSense verification script if needed
4. Enable Auto Ads or add manual ad unit codes
5. Configure placements
6. Save to localStorage
7. Export settings and update `config/site-config.json`
8. Commit to GitHub

### 7. Add Header and Footer Scripts

1. Open `/admin/index.html` → Header/Footer Scripts
2. Add Google Analytics, Google Tag Manager, or custom code
3. **Never** add private API keys or passwords
4. Save and export settings
5. Update `config/site-config.json`

### 8. Export Settings

1. Go to Admin → Export/Import
2. Click "Export All Settings (JSON)"
3. Copy relevant parts to `config/site-config.json`
4. Commit the updated config file

### 9. Upload Changes to GitHub

1. Create a GitHub repository
2. Upload all files to the repository
3. Commit with descriptive messages

### 10. Deploy Using Cloudflare Pages

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your GitHub account
3. Select your repository
4. Build settings: Leave empty (it's static)
5. Click "Save and Deploy"
6. Your site will be live at `*.pages.dev`

### 11. Connect a Custom Domain

1. In Cloudflare Pages, go to your project → Custom domains
2. Add your domain
3. Update DNS records as instructed
4. SSL will be automatic

## Important Notes

### Admin Panel Limitations

- **Not password protected** - Anyone with access to `/admin/` files can view them
- **Local only** - Changes saved in admin are stored in localStorage, not published
- **Static only** - This is not a server-powered CMS
- **Export required** - To publish changes, you must export and commit to GitHub

### Security

- No passwords or private keys in frontend code
- All tools run client-side only
- No user data is collected or sent to servers
- Validate all user inputs

### AdSense Guidelines

- Only show ads where content is sufficient
- Avoid ads on empty tool result pages
- Follow [Google AdSense policies](https://support.google.com/adsense/answer/48182)
- Test ads in non-production environments

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free to use for personal and commercial projects.

## Support

For questions or issues, use the Contact page on the website.

---

**Built with HTML5, CSS3, and Vanilla JavaScript. No frameworks, no build tools required.**
