import { MetadataRoute } from "next";
import { getSiteHost, getSitemapUrl } from "@/lib/site-url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
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
    sitemap: getSitemapUrl(),
    host: getSiteHost(),
  };
}
