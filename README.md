# Azad Shorthand: redesigned site

    npm install
    npm run build      # static export -> ./out
    npm run dev        # local preview at http://localhost:3000

Deploy the contents of `out/` to any static host (Netlify, Vercel static, Cloudflare Pages, S3, cPanel...).

## Replace before launch (all in src/data/siteConfig.ts)
- PLAY_STORE_URL (currently "#")
- testimonials, stats, blogPosts (empty = tasteful "coming soon" states)
- socials: YouTube, Telegram, Facebook, Instagram URLs (empty = hidden)
- Privacy and Terms pages are templates with [bracketed] gaps; have them reviewed
- public/images/brand/og-image.png is a simple generated card; swap in a designed one
