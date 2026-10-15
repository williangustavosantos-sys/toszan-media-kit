# TOSZAN final UX correction — local evidence

2026-10-15. Base b5ccd49, branch polish/premium-ui-finisher-20261015.

## Implemented

- One InlineVideo component drives all nine DJ clips and five Creator samples. Muted playback begins on actual intersection (15%, zero preload margin); hidden/inactive clips pause. playsInline, webkit-playsinline and defaultMuted are set before play. A submitted frame/timeupdate controls poster removal. Audio ownership spans DJ and Creator. Browser denial exposes a real tap fallback without policy bypass.
- Circular carrousel reuses keyed cards, pauses old media on deactivation/unmount, retains buttons, swipe and keyboard, including 9 -> 1 and 1 -> 9.
- Creator cover uses content-sized Grid areas. NOVAFOTO asset is unchanged and contained at its original ratio. Mobile fifth sample centered at the same width as the other four.
- Hero WhatsApp + one fixed contact, professional destination 393428369444 derived from existing creatorLinks. Localized short messages, recognizable WhatsApp mark and safe areas. Mobile carousel arrows reserve room for the contact.
- Ten original covers downloaded unchanged from successful origin responses; same-origin static files remove external CDN dependency. Explicit loading/error artwork, decode before reveal, source-keyed state prevents stale rapid-switch events.
- ResizeObserver measures total fixed header bottom. All anchor offsets share the measured height. Mobile header trimmed, redundant hamburger removed; General / DJ / Creator remain directly available.

## Local evidence

Chrome installed on Mac and Playwright WebKit 26.6 ran the nine requested widths: 320, 375, 390, 430, 768, 820, 1024, 1280, 1440. Each engine completed 18 section geometry checks and 27 home/DJ/Creator screenshots. Five full locale flows at 390x844 cover PT, IT, EN, ES, FR.

Every locale flow opened the real WhatsApp destination without sending a message, exercised all nine DJ videos, measured advancing time and changing nonblack canvas pixels, tested wrap/back/keyboard/swipe, enabled audio, checked a single sound owner, exercised all five Creator videos, verified final-card centering, and selected all ten music covers followed by 20 rapid changes. The forced NotAllowedError test confirmed fallback recovery. A network-aborted artwork request produced the branded error fallback and recovered on reload.

Both complete local suites returned zero failures and zero uncaught JavaScript errors. JSON evidence is in this directory. Subsequent visual inspection found an initial cover opacity transition gap; keeping the branded backing and awaiting decode fixed it. The rapid-switch artwork check was repeated in both engines after that fix; final published suites must include it.

All active media are H.264/AAC (see codecs.json). Safari native on Mac was opened and visibly showed inline DJ playback locally. This does not prove playback on physical iPhone/iPad or their Low Power Mode. No physical iPhone/iPad was accessed.

`npm run build` and `git diff --check` pass. Build emits a Node deprecation warning for module.register in the installed tooling; no build failure.

## Publication boundary

Commit/push/Preview authorized. main and Production remain frozen. The published candidate still requires browser checks; this local report is not a claim of physical iPhone acceptance.

## Reproduce

Install the Playwright CLI skill/runtime and WebKit browser, run the application, then open named Chrome/WebKit sessions with playwright_cli.sh. Run `python3 scripts/run-premium-qa.py SESSION BASE_URL TAG` from the app directory. `.playwright/webkit.json` supplies mobile/touch context. Screenshots and detailed results go to ignored `output/playwright/`; selected final Preview evidence is preserved separately.
