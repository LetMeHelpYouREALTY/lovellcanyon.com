/**
 * Next.js custom image loader — Cloudflare Image Transformations at the edge.
 *
 * Requires:
 * - NEXT_PUBLIC_CLOUDFLARE_IMAGE_TRANSFORMATIONS=true
 * - Zone setting `transformations` = on (lovellcanyon.com zone)
 * - Allowed origin for R2 pub hostname (if originals live on R2)
 * - Traffic for transform host must pass through Cloudflare proxy (orange cloud)
 */

import {
  buildCloudflareImageTransformUrl,
  isCloudflareImageTransformationsEnabled,
  resolveImageSourceUrl,
} from "@/lib/cloudflare-image-transform";

export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (!isCloudflareImageTransformationsEnabled()) {
    return resolveImageSourceUrl(src);
  }

  return buildCloudflareImageTransformUrl(src, {
    width,
    quality: quality ?? 85,
    format: "auto",
    fit: "scale-down",
  });
}
