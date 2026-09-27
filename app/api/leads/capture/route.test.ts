/**
 * Test: /api/leads/capture Route Handler
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from './route';

const originalEnv = process.env;

describe('POST /api/leads/capture', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    delete process.env.TURNSTILE_SECRET_KEY;
    process.env.FOLLOW_UP_BOSS_API_KEY = 'test-fub-key';
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('returns 400 for empty JSON body', async () => {
    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('required');
  });

  it('returns 400 for missing name', async () => {
    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: '7025551234',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('required');
  });

  it('returns 400 for invalid email', async () => {
    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'not-an-email',
        phone: '7025551234',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('email');
  });

  it('returns 503 when FOLLOW_UP_BOSS_API_KEY is missing', async () => {
    delete process.env.FOLLOW_UP_BOSS_API_KEY;

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.error).toBeDefined();
  });

  it('posts FUB event with valid data', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
    });
    vi.stubGlobal('fetch', fetchMock);

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '7025551234',
        message: 'Interested in buying',
        source: 'website-form',
        tags: ['website'],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);

    const fubCall = fetchMock.mock.calls.find(
      (call) => call[0] === 'https://api.followupboss.com/v1/events'
    );
    expect(fubCall).toBeDefined();

    const body = JSON.parse(fubCall![1].body as string);
    expect(body.source).toBe('lovellcanyon.com');
    expect(body.system).toBe('lovellcanyon.com');
    expect(body.type).toBe('General Inquiry');
    expect(body.person.firstName).toBe('John');
    expect(body.person.emails).toEqual([{ value: 'john@example.com' }]);
    expect(body.person.phones).toEqual([{ value: '7025551234' }]);
    expect(body.person.tags).toContain('lovellcanyon.com');
    expect(body.person.tags).toContain('website-form');
  });

  it('returns 502 when FUB responds with error status', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(502);
    expect(data.error).toBeDefined();
  });

  it('returns success without calling FUB when honeypot is filled', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company: 'spam corp',
        firstName: 'Bot',
        email: 'bot@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('uses Seller Inquiry type for home valuation sources', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        source: 'home-valuation',
      }),
    });

    await POST(request);

    const fubCall = fetchMock.mock.calls.find(
      (call) => call[0] === 'https://api.followupboss.com/v1/events'
    );
    const body = JSON.parse(fubCall![1].body as string);
    expect(body.type).toBe('Seller Inquiry');
  });

  it('sanitizes XSS in name fields sent to FUB', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: '<script>alert("xss")</script>',
        lastName: 'Doe',
        email: 'test@example.com',
      }),
    });

    await POST(request);

    const fubCall = fetchMock.mock.calls.find(
      (call) => call[0] === 'https://api.followupboss.com/v1/events'
    );
    const body = JSON.parse(fubCall![1].body as string);
    expect(body.person.firstName).not.toContain('<script>');
  });
});
