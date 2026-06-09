/**
 * Cloudflare Image Transformations (/cdn-cgi/image/)
 * @see https://developers.cloudflare.com/images/transform-images/transform-via-url/
 */

const DEFAULT_TRANSFORM_HOST = "lovellcanyon.com";
const DEFAULT_SITE_URL = "https://lovellcanyon.com";

export type CloudflareImageTransformOptions = {
  width: number;
  quality?: number;
  format?: "auto" | "webp" | "avif" | "jpeg" | "png";
  fit?: "scale-down" | "contain" | "cover" | "crop" | "pad";
};

export function isCloudflareImageTransformationsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_TRANSFORMATIONS === "true";
}

export function getImageTransformHost(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_IMAGE_TRANSFORM_HOST ||
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, "");

  return (fromEnv || DEFAULT_TRANSFORM_HOST).replace(/\/$/, "");
}

export function resolveImageSourceUrl(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  if (src.startsWith("//")) {
    return `https:${src}`;
  }

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
  return `${siteUrl}${src.startsWith("/") ? src : `/${src}`}`;
}

export function buildCloudflareImageTransformUrl(
  src: string,
  { width, quality = 85, format = "auto", fit = "scale-down" }: CloudflareImageTransformOptions
): string {
  const host = getImageTransformHost();
  const absoluteSrc = resolveImageSourceUrl(src);
  const options = [`width=${width}`, `quality=${quality}`, `format=${format}`, `fit=${fit}`].join(
    ","
  );

  return `https://${host}/cdn-cgi/image/${options}/${absoluteSrc}`;
}
