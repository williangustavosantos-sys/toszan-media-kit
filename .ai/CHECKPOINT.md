# TOSZAN WEBSITE — CHECKPOINT

Date: 2026-10-15 Europe/Rome.

## Reopened after physical-iPhone rejection

- The owner rejected Production source `39cfd2fbec1a819d2f408971172dbd27b10e7ead` after inspecting it on a physical iPhone.
- Prior automated layout and flow passes are retained only as historical technical evidence. They did not detect the unacceptable mobile composition and are not release acceptance.
- Correction work is isolated on `fix/iphone-visual-correction-20261015` from the rejected Production commit.
- `main`, `origin/main`, Production deployment and canonical domain must remain unchanged until explicit owner approval of a new Preview.

## Baseline completed

- Local Vite runs through managed session `toszan-iphone-visual-audit-60d5887b` at `http://127.0.0.1:4173`.
- 64 full-page screenshots cover `/`, `/booking`, `/creator` and `/analytics` at eight widths in Chromium and WebKit.
- 76 additional mobile critical-section captures cover the sections most likely to hide proportion and control defects.
- Optical inspection confirms the reported defects; zero overflow was a false-positive proxy for visual quality.
- Evidence and measurements are recorded in `outputs/iphone-correction/baseline/` and `outputs/iphone-correction/VISUAL_AUDIT.md`.

## Immediate implementation order

1. Compact and integrate the Creator mobile hero portrait; remove redundant first-viewport CTAs.
2. Make every Creator portfolio video a full-width editorial 9:16 item per row on phones with separated caption/control zones.
3. Simplify General Hero and replace the internal-looking General contact/cards with a concise booking bridge and contact rows.
4. Recompose Live for one dominant featured item plus clear, touch-safe navigation through all nine videos while preserving one audio owner.
5. Consolidate color/type/spacing tokens and safe-area-aware fixed navigation/anchor offsets.
6. Localize media titles, track types, dates, controls and ARIA labels across all supported languages.
7. Validate build, interaction, media/audio state, links, languages, reduced motion, Chromium/WebKit and full-page visual evidence.
8. Create a new Preview only and open `/` for owner review.

## Release boundary

- Preview: authorized after validation.
- `main`: not authorized in this reopened correction task.
- Vercel Production / canonical alias: not authorized.
- Physical iPhone Safari and perceived speaker output remain owner-side checks unless separately observed; do not claim them from emulation.
