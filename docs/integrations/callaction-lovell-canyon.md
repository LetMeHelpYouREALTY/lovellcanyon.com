# CallAction — lovellcanyon.com

Tracking and lead routing for **(702) 842-9736** via [CallAction](https://widgetbe.com) WidgetTracker.

**Site code:** `lib/lovell-canyon-contact.ts` · Widget ID `WT-XQHVYQWW` · loaded in `app/layout.tsx`

---

## Phone routing

| Role | Number | Where it appears |
|------|--------|------------------|
| **Public tracking (GBP + site NAP)** | **(702) 842-9736** | Footer, contact, schema, `tel:` / `sms:` links, GBP |
| **Forward destination (private)** | (702) 222-1964 — Jan Duffy | CallAction dashboard only — **never on website** |

Calls and texts to **842-9736** forward to **222-1964**. GBP and the website must list **842-9736** so attribution and drip campaigns work.

---

## Dashboard settings (June 2026)

### Call Settings

- **Tracking number:** (702) 842-9736
- **Destination user:** Jan Duffy
- **Destination number:** (702) 222-1964

### Campaign

| Field | Value |
|-------|--------|
| Campaign name | Lovell Canyon |
| Drip campaign | KTS New Land Buyer Lead - US/Pacific - Admin |
| Channel / Source | (set per ad source in dashboard) |

### Integrations

- **CRM:** Follow Up Boss (sync enabled)
- **Filter VOIP numbers from sync:** per dashboard preference

### Conversation automations (summary)

**Missed calls**

1. First message: missed-call auto-reply (on call now)
2. Second message: schedule callback (call or text?)
3. Non-responsive: 45 min nudge → voicemail drop → drip

**Answered calls (2+ minutes)**

- Follow-up text ~5 minutes after call
- vCard text with contact download link
- Voice message delay 10+ min (“Hello Lead Song” recording)

### Advanced

- Incoming/outgoing recording: per dashboard
- Spam caller filter: enabled
- New lead + reply notifications: enabled
- Follow Up Boss lead export / email parse: per dashboard

---

## Environment variable

```env
NEXT_PUBLIC_CALLACTION_PHONE=702-842-9736
```

Must match the CallAction tracking number. Redeploy after changes.

---

## GBP verification note

Google Business Profile **phone** = **(702) 842-9736** (tracking line).

Do **not** put **(702) 222-1964** in GBP, schema, or visible site copy — that is the private forward destination.

See [gbp-verification-checklist.md](../seo/gbp-verification-checklist.md).

---

## Checklist after dashboard changes

- [ ] Tracking number still **842-9736**
- [ ] Forward destination still **222-1964**
- [ ] Campaign name **Lovell Canyon**
- [ ] FUB sync active for new leads
- [ ] Site `NEXT_PUBLIC_CALLACTION_PHONE` matches tracking number
- [ ] No **222-1964** in indexable land pages or JSON-LD

Last updated: June 2026
