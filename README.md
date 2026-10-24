# Sunflower Mind

Website for **Nayana Binuraj Antony**, psychologist. Brand palette: warm ivory `#f8f6ef`, deep sage `#2d4238`, leaf `#788664`, sunflower gold `#ad7b28`. The supplied logo appears in navigation, footer, practice introduction, booking calendar, booking dialog, closing section, browser icon and social metadata.

## Live website

https://sunflower-mind.issacbalappatt.chatgpt.site

## Preview and verify

No build is needed. Run `python -m http.server 4173 --directory dist` and open http://localhost:4173.

Run `node --test tests/calendar.test.cjs` to verify leap years, Monday-first calendar alignment, India date boundaries, date ordering and URL validation. Browser checks cover phone and desktop layouts, selected-date enquiries, dialogs, global animation pause and reduced motion.

## Booking status

The calendar interface works now, including India timezone, month navigation and preferred-date selection. **Online booking and email enquiries remain inactive at the owner's request.** The domain sunflowermind.com has not yet been purchased and the proposed mailbox nayana@sunflowermind.com is not active. No mailto links are published while `contactEnabled` is false. Date selection remains in memory and is not sent, saved or reserved. Default session duration is **60 minutes**, with other lengths by arrangement.

Direct bookings await the practice-owned Cal.com account. Signup was prepared with the proposed username `sunflower-mind-nayana`; availability of that username is not confirmed. Account creation was not submitted. The account owner must create the password, accept provider terms and verify the email.

## Activate live availability

1. Purchase the domain and activate/test the practice mailbox, or choose a working existing email. Only then enable `contactEnabled` in `dist/config.js`. Complete https://app.cal.com/signup using nayana@sunflowermind.com. Create the password privately and verify the email. Do not put passwords or keys in this repository.
2. Set account display name to Nayana Binuraj Antony and timezone to **Asia/Kolkata**. Upload the supplied logo from `dist/assets/sunflower-mind-logo.webp`.
3. Connect the calendar that Nayana actually uses. Choose conflict-checking calendars and the destination calendar. Do not connect another person's calendar by default.
4. Create a 60-minute event, with other durations by arrangement. Confirm session location/online format, fees, cancellation policy, consent and practice privacy notice before accepting appointments.
5. Add actual bookable hours and date overrides. Flexible availability is not the same as 24/7 availability: keep the email enquiry option for times outside the schedule. Decide and configure buffers, minimum notice and booking horizon with Nayana.
6. Copy the verified public event URL, for example `https://cal.com/<actual-username>/<actual-event-slug>`. Do not activate guessed URLs.
7. Run `pwsh -File scripts/configure-booking.ps1 -BookingUrl 'https://cal.com/<actual-username>/<actual-event-slug>'`. This updates public configuration only; it does not deploy automatically.
8. Test conflict handling, timezone display, confirmation email and cancellation/rescheduling using a test appointment, then deploy the update. Only treat the calendar as live after successful end-to-end verification.

Visitors choose whether to load the external booking service. The site can embed verified Cal.com event pages and always offers a separate-tab fallback. Other HTTPS booking providers open in a separate tab. No provider API keys are needed for this integration.

## Payments and reminders

Not activated. Payment-provider onboarding, identity and bank verification belong to the practice owner. Configure payment within the booking provider and verify confirmed payment status, refunds and slot release before accepting payments. A standalone payment link does not reserve an appointment. WhatsApp requires its own business setup and recipient opt-in; no WhatsApp messages are sent by this site. Provider or payment processing fees may apply.

## Motion and assets

Motion 14.6.0 is bundled locally from its official npm package, with SHA-512 package integrity checked and its MIT license retained. The sunflower SVG and ambient effects are original. The global pause controls stop CSS and Motion animation; reduced-motion preferences disable decorative motion. Google Fonts are served locally with their OFL licenses. No runtime dependency on a public animation CDN or Google Fonts requests.

See THIRD_PARTY.md for reviewed open-source projects and licenses. Self-hosting a large scheduling platform is unnecessary for this static site; Cal.com account setup remains separate from the MIT-licensed Cal.diy source repository.

## Free hosting and updates

The current site is deployed through Sites. GitHub keeps the source; pushing GitHub alone does not deploy the Sites website. Publish the matching version through the Sites workflow after each update.

For an independent Cloudflare Pages deployment, connect this repository, use no framework/build command and set the output directory to `dist`. Domain ownership and provider accounts remain separate. Do not upload clinical records, bank details, credentials or the confidential reference PDF.
