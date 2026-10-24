# Sunflower Mind

Original responsive website for psychologist Nayana Alappatt. Warm neutral design, custom SVG sunflower motion, breathing animation, reduced-motion support, accessible dialogs and FAQs. No build dependencies.

## Preview

Run `python -m http.server 4173 --directory dist` and open http://localhost:4173.

## Current status

The informational website is ready. Online appointment availability, intake, signed consent, payments and reminders are NOT activated. The portal accurately displays this status. No client health data is collected or stored. The reference PDF contains placeholder credentials, fees and testimonials; none were reused. The PDF itself is not included in this repository.

## Activate bookings

1. Nayana confirms qualifications, registration, professional photo, clinic address, public contact, session formats, duration and prices.
2. Create a practice-owned booking provider account with calendar synchronisation, capacity management and a private client portal. Configure timezone Asia/Kolkata, working hours, appointment buffers, minimum notice, cancellation windows and test double-booking prevention.
3. Complete merchant onboarding and identity/bank verification with a payment provider supporting the practice's country and currency. Payment processing may charge transaction fees. Do not collect card data on this static website.
4. Configure payment inside the booking provider. Confirm webhook-backed payment status, appointment holds, failed/abandoned payment release, refunds and confirmation receipts before launch. A standalone payment link does not reserve a calendar slot.
5. Nayana supplies approved informed consent, privacy, safeguarding, cancellation and refund terms. Keep intake and signed consent within the provider's secure portal; do not put clinical notes in calendar titles, email, URLs, source code or localStorage.
6. Configure reminders through the provider. WhatsApp requires the appropriate business setup, recipient opt-in and approved templates; it is not active here.
7. Set the verified public HTTPS booking URL and public contact email in `dist/config.js`. Only set `bookingEnabled: true` after a full test appointment, payment, cancellation and refund succeed. Never add secret keys to this file or GitHub.

## Free hosting

Static files in `dist/` can be deployed to Cloudflare Pages Free. Connect this GitHub repository, select no framework, leave the build command blank and use `dist` as output directory. A pages.dev address is included; a custom domain requires domain ownership. Provider accounts and clinical operations are separate from website hosting.

## Publish checklist

Verify the practice details; test keyboard use, mobile layout and reduced motion; verify privacy terms; test provider scheduling and payment end to end. Hosting logs and external font requests are subject to their providers' policies. No analytics or advertising cookies are installed.
