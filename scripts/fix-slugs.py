#!/usr/bin/env python3
"""
scripts/fix-slugs.py
====================
ממיר slugs עבריים / URL-encoded ל-slugs אנגליים נקיים בתיקיית content/.
מפעילים פעם אחת לפני הבנייה הראשונה.

שימוש:
  python3 scripts/fix-slugs.py [--dry-run]

  --dry-run  הצגת שינויים בלבד ללא כתיבה
"""

import os, re, sys, shutil
from pathlib import Path

CONTENT_DIR = Path("src/content")
DRY_RUN = "--dry-run" in sys.argv

# ── מפת transliteration עברית → אנגלית ─────────────────────────
HE_MAP = {
    'א':'a','ב':'b','ג':'g','ד':'d','ה':'h','ו':'v','ז':'z',
    'ח':'h','ט':'t','י':'y','כ':'k','ך':'k','ל':'l','מ':'m',
    'ם':'m','נ':'n','ן':'n','ס':'s','ע':'a','פ':'p','ף':'p',
    'צ':'tz','ץ':'tz','ק':'k','ר':'r','ש':'sh','ת':'t',
}

def transliterate(text: str) -> str:
    result = []
    for ch in text:
        if ch in HE_MAP:
            result.append(HE_MAP[ch])
        elif ch.isascii():
            result.append(ch)
        else:
            result.append('-')
    return ''.join(result)

def slugify(name: str) -> str:
    # URL-decode %XX sequences
    import urllib.parse
    name = urllib.parse.unquote(name)
    # Keep already-ASCII slugs as-is
    if all(c.isascii() for c in name):
        return name.lower().replace(' ', '-')
    trans = transliterate(name)
    trans = re.sub(r'[^a-z0-9]+', '-', trans.lower())
    trans = trans.strip('-')
    return trans[:80]

def fix_slugs_in_dir(folder: Path) -> dict[str, str]:
    """Returns mapping old_slug → new_slug for link fixing."""
    mapping = {}
    for md_file in sorted(folder.glob("*.md")):
        stem = md_file.stem
        new_stem = slugify(stem)
        if new_stem == stem:
            continue
        new_path = folder / f"{new_stem}.md"

        # Avoid collision
        counter = 1
        while new_path.exists() and new_path != md_file:
            new_path = folder / f"{new_stem}-{counter}.md"
            counter += 1

        mapping[stem] = new_path.stem
        print(f"  {'[DRY-RUN] ' if DRY_RUN else ''}rename: {stem}.md → {new_path.name}")
        if not DRY_RUN:
            shutil.move(str(md_file), str(new_path))
    return mapping

def update_front_matter_slug(folder: Path, mapping: dict[str, str]):
    """Updates slug: field in front-matter of renamed files."""
    if DRY_RUN:
        return
    for old, new in mapping.items():
        md_path = folder / f"{new}.md"
        if not md_path.exists():
            continue
        text = md_path.read_text(encoding='utf-8')
        # Update slug: field
        text = re.sub(r'^slug:\s*.+$', f'slug: {new}', text, count=1, flags=re.MULTILINE)
        md_path.write_text(text, encoding='utf-8')

def fix_links_in_content(all_mappings: dict[str, str]):
    """Replaces old slug references in all .md files."""
    if DRY_RUN:
        return
    for md_file in CONTENT_DIR.rglob("*.md"):
        text = md_file.read_text(encoding='utf-8')
        changed = False
        for old, new in all_mappings.items():
            # Match /blog/old-slug, /articles/old-slug etc.
            patterns = [
                (rf'/(blog|articles|projects|events)/{re.escape(old)}([/"\')\s])',
                 rf'/\1/{new}\2'),
            ]
            for pat, rep in patterns:
                new_text = re.sub(pat, rep, text)
                if new_text != text:
                    text = new_text
                    changed = True
        if changed:
            md_file.write_text(text, encoding='utf-8')

# ────────────────────────────────────────────────────────────
if __name__ == '__main__':
    print(f"\n🔧 תיקון Slugs עבריים{' [DRY-RUN]' if DRY_RUN else ''}\n{'='*50}")
    all_mappings: dict[str, str] = {}

    for collection in ['blog', 'articles', 'projects', 'events', 'pages']:
        folder = CONTENT_DIR / collection
        if not folder.exists():
            continue
        print(f"\n📁 {collection}/")
        m = fix_slugs_in_dir(folder)
        update_front_matter_slug(folder, m)
        all_mappings.update(m)

    print(f"\n🔗 מעדכן קישורים פנימיים...")
    fix_links_in_content(all_mappings)

    print(f"\n✅ הושלם! {len(all_mappings)} קבצים שונו.\n")
    if DRY_RUN:
        print("הפעל ללא --dry-run לביצוע השינויים בפועל.\n")
