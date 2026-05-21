# אלוני ישראל – אתר עמותה

**Stack:** Astro 4 · Decap CMS · Cloudflare Pages

---

## מבנה הפרויקט

```
baloot-astro/
├── src/
│   ├── content/          ← כל התוכן (Markdown)
│   │   ├── blog/         ← פוסטים בבלוג
│   │   ├── articles/     ← מאמרים (עץ האלון)
│   │   ├── projects/     ← פרויקטים
│   │   ├── events/       ← אירועים
│   │   └── pages/        ← דפים מיוחדים (home.md, about.md)
│   ├── pages/            ← קבצי Astro (routes)
│   ├── layouts/          ← תבניות HTML
│   ├── components/       ← Header, Footer וכד'
│   └── styles/           ← CSS גלובלי
├── public/
│   ├── admin/            ← Decap CMS (/admin)
│   │   ├── index.html
│   │   └── config.yml    ← הגדרות ה-CMS
│   ├── images/           ← תמונות סטטיות (לוגו, og וכד')
│   └── uploads/          ← תמונות שמועלות דרך ה-CMS
└── scripts/
    └── fix-slugs.py      ← המרת slugs עבריים לאנגלית
```

---

## שלב 0 – הכנה ראשונית (פעם אחת)

### 1. התקינו Node.js 18+
```bash
node -v  # חייב להיות 18 ומעלה
```

### 2. התקנת תלויות
```bash
npm install
```

### 3. תיקון Slugs עבריים (חובה לפני בנייה!)
```bash
# קודם הצג מה ישתנה
python3 scripts/fix-slugs.py --dry-run

# אחרי בדיקה – בצע בפועל
python3 scripts/fix-slugs.py
```

### 4. הוסיפו את קבצי הלוגו
```bash
# העתיקו מהאתר הישן:
# public/images/logo.png    ← הלוגו של העמותה
# public/images/favicon.png ← האיקון
# public/images/og-default.jpg ← תמונה לשיתוף (1200×630)
```

---

## פיתוח מקומי

```bash
npm run dev
# → http://localhost:4321
```

---

## פריסה ל-Cloudflare Pages

### 1. צרו GitHub repo
```bash
git init
git add .
git commit -m "initial: migrate from WordPress"
git remote add origin https://github.com/YOUR_USER/baloot-org-il.git
git push -u origin main
```

### 2. הגדרות ב-Cloudflare Pages
1. היכנסו ל-[Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Pages → Create application → Connect to Git**
3. בחרו את ה-repo
4. הגדרות בנייה:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`

### 3. הגדרת OAuth ל-Decap CMS (כניסה לממשק עריכה)
1. צרו GitHub OAuth App:
   - Settings → Developer settings → OAuth Apps → New OAuth App
   - Homepage URL: `https://baloot.org.il`
   - Callback URL: `https://baloot.org.il/admin/`
2. התקינו [cloudflare-workers-oauth-provider](https://github.com/sterlingwes/cloudflare-github-oauth) (מדריך קצר בתוך הקישור)
3. עדכנו `public/admin/config.yml`:
   ```yaml
   backend:
     name: github
     repo: YOUR_USER/baloot-org-il
     branch: main
     base_url: https://YOUR_WORKER.workers.dev
   ```

---

## עריכת תוכן דרך ה-CMS

לאחר הפריסה, גשו אל:
```
https://baloot.org.il/admin
```
התחברו עם חשבון GitHub של העמותה.

### מה ניתן לערוך:
| קטע | מה עורכים |
|-----|-----------|
| 📝 בלוג | פוסטים, תמונות, תגיות |
| 🌳 עץ האלון | מאמרים ומחקרים |
| 🔨 פרויקטים | כרטיסי פרויקט + תוכן |
| 📅 אירועים | לוח האירועים |
| 🏠 דף הבית | Hero, באנרים, אירועים, תרומות |
| 👥 אודות | טקסט + כל חברי הנהלה |

---

## הוספת תמונות

1. ב-CMS: לחצו על שדה תמונה → **Choose an image → Upload**
2. התמונה נשמרת ב-`public/uploads/` ומועלית ל-GitHub → בנייה חדשה
3. לתמונות סטטיות (לוגו וכד') – שמרו ב-`public/images/`

---

## שינוי עיצוב

| מה לשנות | איפה |
|----------|------|
| צבעים ופונטים | `src/styles/global.css` (משתני CSS) |
| Header / Footer | `src/components/Header.astro` / `Footer.astro` |
| דף הבית | `src/pages/index.astro` |
| דף אודות | `src/pages/about.astro` |
| תבנית מאמר | `src/pages/blog/[slug].astro` |

---

## תחזוקה

### עדכון Decap CMS
ב-`public/admin/index.html`, שנו את גרסת ה-CDN:
```html
<script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
```

### עדכון Astro
```bash
npm update astro @astrojs/mdx @astrojs/sitemap
```

---

## שאלות נפוצות

**ש: השינויים ב-CMS לא מופיעים באתר**  
ת: Cloudflare Pages בונה מחדש בכל push ל-GitHub. הבנייה לוקחת ~1-2 דקות.

**ש: איפה מגדירים את כתובת הטופס ליצירת קשר?**  
ת: ב-`src/pages/contact.astro` — החליפו `YOUR_FORM_ID` ב-ID מ-[formspree.io](https://formspree.io).

**ש: כיצד מוסיפים עמוד חדש לתפריט?**  
ת: ערכו את `src/components/Header.astro` — מערך `NAV`.
