# Third-party sources

- **Motion 14.6.0**, https://github.com/motiondivision/motion — MIT. Used for coordinated entrance animations. Distributed file: `dist/vendor/motion-14.6.0.js`; license: `dist/vendor/MOTION-LICENSE.md`. The source npm package SHA-512 was verified before extracting these exact files. Reproduce with `python vendor-motion.py`.
- **DM Sans** and **Manrope**, https://github.com/google/fonts — SIL Open Font License. Font files and licenses are in `dist/assets/fonts/`; served locally. Reproduce with `python vendor-fonts.py` (downloaded font bytes may change if upstream changes).
- **Cal.com hosted scheduling**, https://cal.com — selected integration option, no account or event created by the website. Hosted service terms apply. Public event-page embedding loads only at the visitor's request after a real event URL is configured.
- **Cal.diy**, https://github.com/calcom/cal.diy — reviewed as a self-hosted option. No Cal.diy code included. Its server, database and authentication requirements are not needed for the selected hosted-calendar approach.

The supplied Sunflower Mind logo belongs to the practice and is not covered by the third-party software licenses. No placeholder credentials, testimonials or fees from the confidential reference PDF are published.
