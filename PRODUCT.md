# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing codebase: Next.js 16 (App Router), React 19, Tailwind v4, shadcn (base-ui style "base-luma"). Not a greenfield stack decision.

## Users

[Inferred from brief, not confirmed by interview.] Two audiences:
- Local small-business owners (e.g. restaurants, home services, salons, retail) evaluating whether to advertise, deciding on a whim during a work day whether a shared-cost mailer is worth the money and effort. They are price-sensitive, time-poor, and skeptical of anything that reads as a tech/SaaS pitch rather than a straightforward local-marketing offer.
- The site's job is to get that owner to submit their contact/address info via the lead form so Doorly Marketing's team can follow up and sell them an ad space.

## Product Purpose

Doorly Marketing sells shared physical postcard ad space to local businesses. One postcard, mailed via USPS to approximately 10,000 households in a target area, is split into multiple ad sections (tiers) so several businesses share the cost of one mailing. The landing page's job is to explain this offer clearly, make the shared-postcard concept visually obvious, and convert visitors into leads via a form. Success = qualified leads submitted through the embedded JotForm.

## Positioning

Cost-sharing is the mechanism a single-advertiser mail service could not truthfully copy: multiple local businesses split one physical mailing to ~10,000 households, which is what makes direct mail affordable for a small business that could not justify buying a full mailing alone.

## Operating Context

- The product is a physical, printed postcard mailed by USPS — not a digital ad product. All visual metaphors should reference paper, print, and physical mail rather than screens/dashboards.
- Businesses select one of four ad-space tiers on a single shared postcard: one large "Featured" space, one medium "Standard" space, and two small "Starter" spaces.
- Lead intake and email notification are handled entirely by an external JotForm embed; this page performs no server-side form handling.

## Capabilities and Constraints

- No backend, database, or API routes — this is a static marketing page.
- Lead form is a JotForm iframe embed; the real JotForm form ID is not yet available and is a labeled placeholder (`JOTFORM_ID`) pending client input.
- No fabricated testimonials, customer counts, years-in-business claims, or specific unverifiable statistics. Only the ~10,000 households/mailing figure and reasonably generic, defensible supporting claims (USPS delivery, shared-cost affordability, professional design included) are used.
- Real business contact info, mailing/service-area details, and final brand-name confirmation are outstanding and marked as placeholders pending client input.

## Brand Commitments

Working name: "Doorly Marketing," per the requester's brief. Not yet confirmed by the business owner as final. No existing logo, wordmark, or brand assets exist in the repo; a text wordmark is used until real brand assets are supplied.

## Evidence on Hand

None. No real customer testimonials, case studies, logos, or press exist in the repo. Copy on the page must stay within the general, non-fabricated claims listed under Capabilities and Constraints.

## Product Principles

1. Make the shared-postcard mechanic (one mailer, four ad tiers) instantly legible through an accurate visual diagram — this is the product's core differentiator and the page's central explainer.
2. Feel tangible and trustworthy (print/paper cues, editorial confidence) rather than like a generic SaaS/tech product, matching the physical, real-world nature of direct mail.
3. Optimize the entire page toward one action: getting a local business to submit the lead form.
4. Never fabricate specific, unverifiable proof claims; keep supporting stats generic and defensible.
5. Keep the build static and dependency-light — JotForm owns submission and notification; no parallel custom form logic.

## Accessibility & Inclusion

No project-specific requirement was established beyond standard WCAG AA text/UI contrast and full keyboard operability, which apply as a baseline.
