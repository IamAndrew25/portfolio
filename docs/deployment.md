# Publish to Vercel manually

**GitHub holds the source. Vercel serves the website.** Keeping the code in GitHub does not require enabling automatic deployments.

Run the commands below yourself, from the portfolio directory. This guide does not configure an account or publish anything automatically.

## 1. Verify the local site

```bash
npm ci
npm run check
npm run start
```

Open `http://localhost:3000` and `/es/`. Check each project, its source link, your contact details and the résumé. Stop the local server with `Ctrl+C` when finished.

The production build is `.next/`, not the old GitHub Pages `out/` export. Let Vercel detect Next.js and keep its default build and output settings.

## 2. Sign in

```bash
npx vercel login
```

This authenticates the CLI. It does not publish the portfolio. Complete the browser sign-in using your own Vercel account.

## 3. Create a preview

```bash
npx vercel
```

Choose your account/scope, create a new project and select the current directory (`./`). Keep the detected Next.js settings. If offered a Git repository connection, decline it to retain manual deployment control.

The CLI creates a local `.vercel/` link, which is ignored by Git. It uploads the project for a remote build and prints a preview URL. This step **does** create a remote deployment. Preview access may follow the project's deployment-protection settings; check it in your browser.

Do not import the repository through Vercel's Git integration if you want pushes to remain independent from deployments. A pre-existing project with a Git connection should have that connection disconnected in its settings first.

## 4. Set the production origin

Find the assigned production domain in the project's Vercel settings. Add it as a fully qualified HTTPS URL:

```bash
npx vercel env add NEXT_PUBLIC_SITE_URL production
```

At the prompt, enter the actual URL, such as `https://your-project.vercel.app` (replace the example). This controls canonical links, language alternatives, sitemap URLs and social metadata. You can use your own domain later; update the variable and redeploy when you do.

## 5. Publish production

```bash
npx vercel --prod
```

This publishes the current local project using production settings. A Git commit alone does not publish it in this workflow. Conversely, CLI deployment can include local source changes that have not been pushed, so review the source you are uploading.

Open the production URL and verify:

- Home, project details and résumé load directly in English and Spanish.
- The language switch preserves the project.
- Project images and public GitHub links work.
- The canonical link and `/sitemap.xml` use the production domain.
- Production has `index, follow`; preview builds remain `noindex`.

The existing GitHub Pages site remains a separate deployment until you choose to retire it. The old automatic Pages workflow has been removed from this local source; the replacement GitHub workflow only runs checks.

## Updating the portfolio

Edit content → run checks → inspect locally → run `npx vercel` for a preview → run `npx vercel --prod` when ready. Version the changes in GitHub as a separate, deliberate step.

References: [Vercel CLI deployment](https://vercel.com/docs/cli/deploy), [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs), [environment variables](https://vercel.com/docs/environment-variables).
