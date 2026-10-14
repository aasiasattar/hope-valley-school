# Hope Valley School Website

## Project
Landing page for Hope Valley School, run by Hope Valley Trust, Islamabad. Running since 2016.
Always write "Hope Valley Trust", never "Foundation". Domain: hopevalleytrust.com
Show "Registered under Charity Act 2021" (small, trust signal).

## Stack (strict)
- Plain HTML + CSS + vanilla JS. No frameworks, no npm, no build tools.
- Only these files: index.html, style.css, script.js, README.md, images/
- Never create extra files or folders unless asked.

## Code rules
- Shortest clean solution. If 2 lines work, don't write 20.
- No unused CSS/JS, no obvious comments.
- Semantic HTML, mobile-first, colors and fonts as CSS variables in :root.
- Fonts: Fraunces (headings), Nunito Sans (body) from Google Fonts.
- Icons: Lucide inline SVG. No emoji icons.
- Subtle, slow animations; respect prefers-reduced-motion.
- Avoid the "AI look": no purple-blue gradients, glowing blobs, glassmorphism.
- Exception: navbar only may use a subtle frosted-glass effect, with a faint lavender tint (--glass-tint) washed into the off-white.

## Images
- Originals live in _originals/ (gitignored, local only). Never delete, rename or overwrite them.
- images/ holds only web copies: logo.jpg, about.jpg, hero/hero-1..4.jpg, gallery/.
- Logo is images/logo.jpg.
- Web copies are max 1600px wide, JPG quality ~80.
- Staff must be able to replace a photo by keeping the same file name.
- Gallery items live in ONE array at the top of script.js: { file, title }.
- Alt text on every image; loading="lazy" except hero.

## Content facts
- Principal: Zermina Shakeel (no title), 30+ years of experience in teaching and running a school.
- Phone & WhatsApp (principal): 0335-4988088. Floating WhatsApp button opens https://wa.me/923354988088
- Email: hopevalley18@gmail.com
- Facebook: https://www.facebook.com/share/1ciJnt5rgU/
- School address: Dhoke Malla Malot, Near Haji Chowk, Islamabad
- Trust office address: Plot no. 3, Flat Class-3, Shopping Centre, Firdous Market, Sector F-6/2, Islamabad
- Never invent numbers (no student/teacher counts).

## Workflow
- Build ONE section at a time, only what is asked. Don't touch other sections.
- After each change, explain what you did in 2-3 short lines.
