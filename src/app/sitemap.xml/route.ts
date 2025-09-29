import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const routes = ["", "/about", "/contacts", "/services"];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
      .map((route) => {
        return `
        <url>
          <loc>${baseUrl}${route}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
      })
      .join("")}
  </urlset>
  `;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
