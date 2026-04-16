# App landing page

## Purpose

This repository hosts a small, static **directory page** for Washington State University Graduate School internal tools. Visitors see a grid of application tiles (name and URL). Editors use an in-page **Manage** view to add, remove, reorder, and lightly style tiles without a separate CMS or database.

Remote: [gcrouch-wsu/App-landing-page](https://github.com/gcrouch-wsu/App-landing-page)

## What is in the repo

| Item | Role |
|------|------|
| `index.html` | Single-file app: markup, WSU-inspired styling (crimson/gray palette, Montserrat), and client-side behavior. |

There is no bundler, framework, or `package.json`. Everything runs in the browser as written.

## Behavior

- **Apps** — Renders tiles in order. Each tile links to its URL in a new tab and shows an optional accent color as a left stripe.
- **Manage** — Form to add a display name, URL, and accent color. Rows can be **dragged** to reorder. **Remove** deletes a tile. **Copy JSON** / **Paste JSON** supports backup and moving data between browsers.
- **Persistence** — Tile list is stored in `localStorage` under a fixed key (`wsu-grad-tools-hub:v1`). It is per-browser, not shared across users or devices until you add a server or checked-in data file.

## Local preview

From this folder:

```bash
npx --yes serve .
```

Then open the URL shown in the terminal (typically `http://localhost:3000`). You can also open `index.html` directly in a browser; some features (for example clipboard copy) behave best on `http://localhost` or HTTPS.

## Deploying on Vercel

1. Import the GitHub project in Vercel.
2. Set the **root directory** to the repository root (where `index.html` lives).
3. Framework preset: **Other** (no build command).
4. Output is static: Vercel serves `index.html` at `/`.

Optional: enable **Deployment Protection** or similar if the Manage screen should not be public.

## Security note

The Manage view is not authenticated. Anyone who can load the site can change tiles in their own browser storage, or use Manage if you expose it. Treat this as a convenience directory, not a secured admin console, unless you add authentication or gate the deployment.

## Possible next steps

- Replace `localStorage` with a build-time `tiles.json` committed to the repo for a shared, read-only directory.
- Add a minimal API or server action if multiple editors need one shared source of truth.
- Swap the placeholder “WSU” block for assets that comply with your unit’s brand guidelines.
