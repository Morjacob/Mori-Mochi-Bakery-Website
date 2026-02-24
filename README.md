# Mori Mochi — Demo Site

Lightweight static demo for a matcha & coffee bakery with an aesthetic UI.

To view locally:

1. Open `index.html` in your browser (double-click or use your system's open command).

Windows (PowerShell):

```powershell
Start-Process index.html
```

Files added:
- `index.html` — main page
- `styles.css` — styles
- `script.js` — small interactions

This is a static front-end demo — no server required.

Publish to GitHub (quick steps)

1. Create a new repository on GitHub (do not initialize with README).
2. From this project folder run in PowerShell:

```powershell
.\init-git.ps1 -remote "https://github.com/<username>/<repo>.git"
```

3. Push to `main`. The included GitHub Actions workflow will deploy the site to GitHub Pages on push to `main`.

Manual commands (alternative):

```powershell
git init
git branch -M main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Replace `<username>` and `<repo>` with your GitHub username and repository name. After the push the workflow runs and your site will be available under `https://<username>.github.io/<repo>/` (allow a minute for the first deploy).

Resume snippet: see `RESUME.md` for a ready-to-use project blurb.
