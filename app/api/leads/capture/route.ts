/**
 * Lead Capture API — sends leads to Follow Up Boss via /v1/events
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  leadFormLimiter,
  getClientId,
  checkRateLimit,
  getRateLimitHeaders,
} from '@/lib/rate-limit';

const FUB_EVENTS_URL = 'https://api.followupboss.com/v1/events';
const SITE_SOURCE = 'lovellcanyon.com';

export interface LeadCaptureRequest {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  stage?: string;
  tags?: string[];
  message?: string;
  sourceUrl?: string;
  formType?: string;
  propertyType?: string;
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  neighborhoods?: string[];
  timeline?: string;
  financing?: string;
  preApproved?: boolean;
  turnstileToken?: string;
  customFields?: Record<string, unknown>;
  /** Honeypot — must stay empty */
  company?: string;
  website?: string;
}

async function verifyTurnstileToken(token: string): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.warn('TURNSTILE_SECRET_KEY not configured - skipping verification');
    return true;
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

function sanitizeText(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getFubAuthHeader(apiKey: string): string {
  return `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`;
}

function splitName(data: LeadCaptureRequest): { firstName: string; lastName: string } {
  if (data.firstName || data.lastName) {
    return {
      firstName: sanitizeText(data.firstName || ''),
      lastName: sanitizeText(data.lastName || ''),
    };
  }
  const full = sanitizeText(data.name || '');
  const parts = full.split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: '', lastName: '' };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

function getEventType(data: LeadCaptureRequest): string {
  const hints = [
    data.formType,
    data.source,
    ...(data.tags || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (
    hints.includes('newsletter') ||
    hints.includes('registration') ||
    hints.includes('guide')
  ) {
    return 'Registration';
  }
  if (
    hints.includes('seller') ||
    hints.includes('home-valuation') ||
    hints.includes('valuation') ||
    hints.includes('selling')
  ) {
    return 'Seller Inquiry';
  }
  if (
    hints.includes('property') ||
    hints.includes('listing') ||
    data.propertyType ||
    data.priceMin ||
    data.priceMax
  ) {
    return 'Property Inquiry';
  }
  return 'General Inquiry';
}

function getAttributionTags(request: NextRequest, data: LeadCaptureRequest): string[] {
  const tags: string[] = [];
  const url = new URL(request.url);

  const utmSource = url.searchParams.get('utm_source');
  const utmMedium = url.searchParams.get('utm_medium');
  const utmCampaign = url.searchParams.get('utm_campaign');

  if (utmSource) {
    tags.push(`utm_source:${utmSource}`);
  }
  if (utmMedium) {
    tags.push(`utm_medium:${utmMedium}`);
  }
  if (utmCampaign) {
    tags.push(`utm_campaign:${utmCampaign}`);
  }

  const referrer = request.headers.get('referer');
  if (referrer) {
    try {
      const refUrl = new URL(referrer);
      if (!refUrl.hostname.includes('lovellcanyon.com')) {
        tags.push(`referrer:${refUrl.hostname}`);
      }
    } catch {
      // ignore invalid referrer
    }
  }

  if (data.source) {
    tags.push(`form:${data.source}`);
  }

  return tags;
}

function buildMessageBody(data: LeadCaptureRequest): string {
  const parts: string[] = [];

  if (data.message) {
    parts.push(sanitizeText(data.message));
  }

  const criteria = buildSearchCriteria(data);
  if (criteria) {
    parts.push(`\nSearch criteria:\n${criteria}`);
  }

  if (data.stage) {
    parts.push(`Stage: ${data.stage}`);
  }

  if (data.financing) {
    parts.push(`Financing: ${data.financing}`);
  }

  if (data.preApproved) {
    parts.push('Pre-approved: yes');
  }

  return parts.join('\n').trim() || 'Lead submitted via website form';
}

function buildSearchCriteria(data: LeadCaptureRequest): string | null {
  const criteria: string[] = [];

  if (data.propertyType) {
    criteria.push(`Type: ${data.propertyType}`);
  }

  if (data.priceMin || data.priceMax) {
    const min = data.priceMin ? `$${data.priceMin.toLocaleString()}` : 'Any';
    const max = data.priceMax ? `$${data.priceMax.toLocaleString()}` : 'Any';
    criteria.push(`Price: ${min} - ${max}`);
  }

  if (data.bedrooms) {
    criteria.push(`Bedrooms: ${data.bedrooms}+`);
  }

  if (data.bathrooms) {
    criteria.push(`Bathrooms: ${data.bathrooms}+`);
  }

  if (data.neighborhoods && data.neighborhoods.length > 0) {
    criteria.push(`Areas: ${data.neighborhoods.join(', ')}`);
  }

  if (data.timeline) {
    criteria.push(`Timeline: ${data.timeline}`);
  }

  return criteria.length > 0 ? criteria.join('\n') : null;
}

function getPropertyTags(data: LeadCaptureRequest): string[] {
  const tags: string[] = [];

  if (data.neighborhoods) {
    tags.push(...data.neighborhoods);
  }

  if (data.priceMax) {
    if (data.priceMax > 1000000) {
      tags.push('luxury');
    } else if (data.priceMax < 300000) {
      tags.push('first-time-buyer');
    }
  }

  if (data.propertyType) {
    tags.push(data.propertyType.toLowerCase());
  }

  if (data.preApproved) {
    tags.push('pre-approved');
  }

  if (data.timeline) {
    const lowerTimeline = data.timeline.toLowerCase();
    if (lowerTimeline.includes('immediately') || lowerTimeline.includes('asap')) {
      tags.push('urgent');
    }
  }

  return tags;
}

async function sendFubEvent(
  request: NextRequest,
  data: LeadCaptureRequest
): Promise<Response> {
  const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY;
  if (!apiKey) {
    console.error(
      '[Lead Capture] FOLLOW_UP_BOSS_API_KEY is not configured — cannot send lead to FUB'
    );
    throw new ServiceUnavailableError();
  }

  const { firstName, lastName } = splitName(data);
  const formName = data.source || 'lead-capture';
  const sourceUrl =
    data.sourceUrl ||
    request.headers.get('referer') ||
    `https://${SITE_SOURCE}`;

  const personTags = [
    SITE_SOURCE,
    formName,
    ...getAttributionTags(request, data),
    ...(data.tags || []),
    ...getPropertyTags(data),
  ].filter((tag, index, arr) => Boolean(tag) && arr.indexOf(tag) === index);

  const payload = {
    source: SITE_SOURCE,
    system: SITE_SOURCE,
    type: getEventType(data),
    message: buildMessageBody(data),
    description: `Lead Capture — ${formName} | ${sourceUrl}`,
    sourceUrl,
    person: {
      firstName,
      lastName,
      emails: data.email ? [{ value: sanitizeText(data.email) }] : [],
      phones: data.phone ? [{ value: sanitizeText(data.phone) }] : [],
      tags: personTags,
    },
  };

  const headers: Record<string, string> = {
    Authorization: getFubAuthHeader(apiKey),
    'Content-Type': 'application/json',
    'X-System': SITE_SOURCE,
  };

  const systemKey = process.env.FUB_SYSTEM_KEY;
  if (systemKey) {
    headers['X-System-Key'] = systemKey;
  }

  return fetch(FUB_EVENTS_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
}

class ServiceUnavailableError extends Error {
  constructor() {
    super('FUB not configured');
    this.name = 'ServiceUnavailableError';
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadCaptureRequest = await request.json();

    if (data.company?.trim() || data.website?.trim()) {
      return NextResponse.json({ success: true });
    }

    const clientId = getClientId(request);
    const rateLimit = await checkRateLimit(leadFormLimiter, clientId);

    if (!rateLimit.success) {
      const resetDate = new Date(rateLimit.reset);
      const minutesUntilReset = Math.ceil((rateLimit.reset - Date.now()) / 60000);

      return NextResponse.json(
        {
          error: `Too many submissions. Please try again in ${minutesUntilReset} minute${minutesUntilReset > 1 ? 's' : ''}.`,
          retryAfter: resetDate.toISOString(),
        },
        {
          status: 429,
          headers: getRateLimitHeaders(rateLimit),
        }
      );
    }

    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY) {
      if (!data.turnstileToken) {
        return NextResponse.json({ error: 'CAPTCHA verification required' }, { status: 400 });
      }

      const isValid = await verifyTurnstileToken(data.turnstileToken);
      if (!isValid) {
        return NextResponse.json(
          { error: 'CAPTCHA verification failed. Please try again.' },
          { status: 403 }
        );
      }
    }

    if (!data.email && !data.phone) {
      return NextResponse.json({ error: 'Email or phone is required' }, { status: 400 });
    }

    if (data.email && !isValidEmail(data.email)) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }

    if (!data.firstName && !data.lastName && !data.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    let fubResponse: Response;
    try {
      fubResponse = await sendFubEvent(request, data);
    } catch (error) {
      if (error instanceof ServiceUnavailableError) {
        return NextResponse.json(
          { error: 'Lead capture is temporarily unavailable. Please try again later.' },
          { status: 503 }
        );
      }
      console.error('[Lead Capture] FUB request failed:', error);
      return NextResponse.json(
        { error: 'Failed to send lead to CRM. Please try again later.' },
        { status: 502 }
      );
    }

    if (!fubResponse.ok) {
      console.error('[Lead Capture] FUB API error status:', fubResponse.status);
      return NextResponse.json(
        { error: 'Failed to send lead to CRM. Please try again later.' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Lead submitted successfully',
      },
      {
        headers: getRateLimitHeaders(rateLimit),
      }
    );
  } catch (error) {
    console.error('[Lead Capture] Error:', error);

    return NextResponse.json({ error: 'Failed to capture lead' }, { status: 500 });
  }
}
