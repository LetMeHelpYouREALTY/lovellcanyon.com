import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  const disallow = ["/api/", "/admin/", "/monitoring/"];
  const allowPublic = { allow: "/", disallow };

  return {
    rules: [
      { userAgent: "*", ...allowPublic },
      { userAgent: "Googlebot", ...allowPublic },
      { userAgent: "GPTBot", ...allowPublic },
      { userAgent: "ChatGPT-User", ...allowPublic },
      { userAgent: "ClaudeBot", ...allowPublic },
      { userAgent: "anthropic-ai", ...allowPublic },
      { userAgent: "PerplexityBot", ...allowPublic },
      { userAgent: "Applebot-Extended", ...allowPublic },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl.replace(/^https?:\/\//, ""),
  };
}
