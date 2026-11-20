import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/inter";
import "@fontsource-variable/cormorant-garamond";
import { indexable, site, siteUrl } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  ...(siteUrl && { metadataBase: siteUrl, alternates: { canonical: "/" } }),
  title: site.seo.title,
  description: site.seo.description,
  robots: { index: indexable, follow: indexable },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.brand,
    title: site.seo.title,
    description: site.seo.description,
    ...(siteUrl && { url: siteUrl, images: [{ url: site.hero.image, alt: site.hero.alt }] }),
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}

