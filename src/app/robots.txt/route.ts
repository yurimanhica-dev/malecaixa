import { NextResponse } from "next/server";

export async function GET() {
  const robots = `
User-agent: *
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml
  `.trim();

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
