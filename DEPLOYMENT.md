# ALM Landing Page - Deployment Guide

## 🎨 View Your Site Locally

### Quick Start
```bash
# Run the server script
./start-server.sh

# Then open your browser to:
# http://localhost:8000
```

### Alternative Methods
```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have npx)
npx serve

# Or simply open index.html in your browser
# (some features may not work without a server)
```

---

## 🚀 Deploy to GitHub Pages (Free Hosting)

### Option 1: Deploy from Main Branch

1. **Create/Merge Pull Request:**
   ```bash
   # Visit this URL to create a PR:
   https://github.com/ALMMECHANICAL/landpage/pull/new/claude/rebuild-to-more-0146koPha55UNCtqwRLSay8u

   # Review and merge the PR on GitHub
   ```

2. **Enable GitHub Pages:**
   - Go to your repository: https://github.com/ALMMECHANICAL/landpage
   - Click **Settings** → **Pages** (in left sidebar)
   - Under "Source", select **main** branch
   - Select **/ (root)** folder
   - Click **Save**
   - Wait 2-3 minutes for deployment

3. **Access Your Site:**
   ```
   Your site will be available at:
   https://ALMMECHANICAL.github.io/landpage/
   ```

### Option 2: Deploy from Feature Branch (Temporary Preview)

1. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Under "Source", select branch: `claude/rebuild-to-more-0146koPha55UNCtqwRLSay8u`
   - Select **/ (root)** folder
   - Click **Save**

2. **Access Preview:**
   ```
   Preview at: https://ALMMECHANICAL.github.io/landpage/
   ```

---

## 🌐 Other Deployment Options

### Netlify (Recommended for Production)

1. **Via GitHub:**
   - Visit: https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Build settings:
     - Branch: `main` (after merging PR)
     - Build command: (leave empty)
     - Publish directory: `/`
   - Click "Deploy site"

2. **Custom Domain:**
   - In Netlify dashboard → Domain Settings
   - Add your custom domain (e.g., almmedia.dev)
   - Follow DNS configuration instructions

### Vercel

1. **Via GitHub:**
   - Visit: https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Your site will be live instantly!

### Cloudflare Pages

1. **Via GitHub:**
   - Visit: https://pages.cloudflare.com
   - Click "Create a project"
   - Connect to GitHub
   - Select your repository
   - Build settings:
     - Framework preset: None
     - Build command: (leave empty)
     - Build output directory: `/`
   - Click "Save and Deploy"

---

## 📝 Custom Domain Setup

### If using GitHub Pages with custom domain:

1. **Add CNAME file:**
   ```bash
   echo "almmedia.dev" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

2. **Configure DNS (at your domain provider):**
   ```
   Type    Name    Value
   ----------------------------------------
   A       @       185.199.108.153
   A       @       185.199.109.153
   A       @       185.199.110.153
   A       @       185.199.111.153
   CNAME   www     ALMMECHANICAL.github.io
   ```

3. **Enable HTTPS:**
   - Go to Settings → Pages
   - Check "Enforce HTTPS"

---

## 🎯 What's Included

Your modern landing page includes:

✅ **Responsive Design** - Works perfectly on all devices
✅ **Modern UI/UX** - Purple/blue gradient theme with smooth animations
✅ **SEO Optimized** - Meta tags for social media sharing
✅ **Fast Loading** - Optimized CSS and minimal dependencies
✅ **Accessible** - WCAG compliant with keyboard navigation
✅ **Portfolio Section** - Showcase 4 featured projects
✅ **Testimonials** - Client reviews with 5-star ratings
✅ **Social Media Links** - Twitter, LinkedIn, YouTube, GitHub
✅ **Mobile Menu** - Smooth hamburger menu for mobile devices
✅ **Smooth Animations** - Fade-in effects and parallax scrolling

---

## 🔧 Maintenance

### Update Content:
- **Services:** Edit `index.html` lines 65-141
- **Portfolio:** Edit `index.html` lines 144-227
- **Testimonials:** Edit `index.html` lines 230-292
- **About:** Edit `index.html` lines 295-342
- **Contact:** Edit `index.html` lines 345-398

### Update Styling:
- **Colors:** Edit CSS variables in `styles.css` lines 10-58
- **Fonts:** Change Google Fonts link in `index.html` line 34
- **Layout:** Modify component styles in `styles.css`

---

## 📊 Performance Tips

1. **Optimize Images:** If you add project images, use:
   - WebP format for modern browsers
   - Compress images (use tinypng.com)
   - Add loading="lazy" to images

2. **Add Analytics:**
   ```html
   <!-- Add before </head> -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

3. **Add Structured Data:**
   - Include JSON-LD schema for better SEO
   - Add Organization and WebSite schema

---

## 🆘 Troubleshooting

### Animations not working?
- Make sure you're viewing via HTTP server (not file://)
- Check browser console for JavaScript errors

### Styles not loading?
- Verify styles.css is in the same directory as index.html
- Check browser console for 404 errors
- Clear browser cache (Ctrl+Shift+R)

### Mobile menu not working?
- Ensure JavaScript is enabled in browser
- Check browser console for errors
- Try different browser

---

## 📞 Support

For issues or questions about this landing page:
- Create an issue: https://github.com/ALMMECHANICAL/landpage/issues
- Email: info@almmedia.dev

---

**Built with ❤️ using modern web technologies**
