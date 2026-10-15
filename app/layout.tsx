import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { draftMode } from "next/headers";
import { MapledLive } from "@mapled/next/live";
import { mapled } from "@/lib/mapled";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await mapled.getSingle("site-settings");
  const name = settings?.data["site-name"] ?? "My site";
  return { title: { default: name, template: `%s · ${name}` }, description: settings?.data.tagline ?? undefined };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const preview = (await draftMode()).isEnabled;
  const settings = await mapled.getSingle("site-settings");
  const { records: pages } = await mapled.getRecords("pages", { fields: ["title", "slug"], sort: "title" });

  return (
    <html lang="en">
      <body>
        {preview ? (
          <div className="preview-bar">
            You are looking at drafts. <a href="/api/mapled/preview/exit">Exit preview</a>
          </div>
        ) : null}
        <header className="site-header">
          <div className="container">
            <Link href="/" className="brand">
              {settings?.data["site-name"] ?? "My site"}
            </Link>
            <nav className="site-nav" aria-label="Pages">
              {pages
                .filter((page) => page.data.slug !== "home")
                .map((page) => (
                  <Link key={page.id} href={`/${page.data.slug}`}>
                    {page.data.title}
                  </Link>
                ))}
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            {settings?.data["footer-text"] ? <p>{settings.data["footer-text"]}</p> : null}
            {settings?.data.tagline ? <p className="muted">{settings.data.tagline}</p> : null}
          </div>
        </footer>
        <MapledLive />
      </body>
    </html>
  );
}
