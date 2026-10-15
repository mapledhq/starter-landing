# Mapled starter: Landing

A landing site: every page is a list of sections (hero, features, text, gallery, FAQ, testimonial, call to action) that editors add, remove and reorder in Mapled. Built with Next.js (App Router) and [`@mapled/next`](https://www.npmjs.com/package/@mapled/next); every text on the site comes from a [Mapled](https://mapled.io) project made from the **Landing** template.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmapledhq%2Fstarter-landing&env=MAPLED_KEY&envDescription=The%20delivery%20key%20from%20Mapled%3A%20project%20settings%20%E2%86%92%20Integrations%20%E2%86%92%20Your%20site&envLink=https%3A%2F%2Fapp.mapled.io)

## Run it in five minutes

You need Node.js 20.9 or newer.

1. In [Mapled](https://app.mapled.io), create a project from the **Landing** template (**New project** → **Landing**). It comes with **Pages** (each with a **Sections** field) and **Site settings**, and the sample content is already published.
2. Get the code: press **Use this template** on GitHub, or

   ```bash
   git clone https://github.com/mapledhq/starter-landing.git my-site
   cd my-site
   ```

3. Copy the env file and paste your delivery key into `MAPLED_KEY` — project settings (the gear in the project's header) → **Integrations** → **Your site**:

   ```bash
   cp .env.example .env.local
   ```

4. Install and start:

   ```bash
   npm install
   npm run dev
   ```

Open http://localhost:3000. Change a text in Mapled, press **Review & publish**, and reload the page.

## What's inside

| Page | Shows |
| --- | --- |
| `/` | the page with the slug `home` |
| `/[slug]` | any other page, such as `/about` |

- `lib/mapled.ts` — the one client the site reads with, typed by `mapled-types.ts`.
- `mapled-types.ts` — the types of the template's content, written by `mapled types generate`.
- `app/api/mapled/revalidate` — refreshes the site when someone publishes.
- `app/api/mapled/preview` — the **Preview** button in Mapled opens drafts here.
- `app/api/mapled/release` and `<MapledLive />` in the layout — open tabs follow a publish without a reload.

Pages are rendered on the server and cached; rich text is Markdown, rendered with `react-markdown` (never as raw HTML).

## Deploy

1. Deploy the repository to your host (the button above does it on Vercel) with `MAPLED_KEY` set.
2. In Mapled → **Integrations** → **Your site**, save `https://your-site.com/api/mapled/revalidate` as the **Revalidation webhook**. Copy the **Signing secret** it shows once into `MAPLED_WEBHOOK_SECRET` on your host, and redeploy.
3. Press **Send test ping**: the delivery shows up under **Recent deliveries** as Delivered. From now on every publish refreshes the site at once, and **Preview** in Mapled opens your drafts on it.

## Environment variables

| Variable | Needed | What it is |
| --- | --- | --- |
| `MAPLED_KEY` | yes | The delivery key: project settings (the gear in the project's header) → **Integrations** → **Your site**. It reads published content only. |
| `MAPLED_WEBHOOK_SECRET` | after the first deploy | The signing secret of the revalidation webhook (see [Deploy](#deploy)). Until it is set, `/api/mapled/revalidate` answers 503 and the site refreshes once an hour. |

Keep them in `.env.local` on your machine and in your host's settings; never commit an env file.

## When the structure changes

Add a field or a collection in Mapled, then bring the types up to date and let TypeScript show what to change:

```bash
npx @mapled/cli auth login
npx @mapled/cli project link
npx @mapled/cli types generate
npx @mapled/cli doctor
```

`doctor` checks the whole integration — the key, the webhook, the preview route — from both sides. The [`@mapled/next` README](https://www.npmjs.com/package/@mapled/next) has every read, filter and option the client has.

Working with an AI agent? `npx skills add mapledhq/agent-kit -g` teaches it Mapled, and it can change the structure and the code together.

## License

MIT
