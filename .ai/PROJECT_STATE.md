# TOSZAN WEBSITE — PROJECT STATE

Date: 2026-10-15 Europe/Rome.

## Binding status

The owner inspected the published result on a physical iPhone and rejected it for visual and commercial reasons. The earlier `24/24 layouts + 9/9 flows` result proved only bounded technical behavior; it is not visual acceptance and must not be used to contradict the rejection.

The current task is a full mobile-first visual correction. Production, the canonical domain and `main` are frozen until the owner explicitly approves a new Preview. Preview deployment remains authorized after local visual and functional validation.

## Identity

- Repository: `https://github.com/williangustavosantos-sys/toszan-media-kit`
- Workspace: `/Users/williandossantos/Documents/Codex/2026-10-14/crie-um-novo-site-com-sites-3/work/toszan-media-kit`
- Application: `Premium Interactive DJ Website`
- Correction branch: `fix/iphone-visual-correction-20261015`
- Correction base / rejected Production source: `39cfd2fbec1a819d2f408971172dbd27b10e7ead`
- `main` and `origin/main` at correction start: `39cfd2fbec1a819d2f408971172dbd27b10e7ead`
- Production URL, currently rejected: `https://toszan-media-kit.vercel.app`
- Vercel project: `prj_WUvb9Q4dKWL9ZbDIP33ZgXoJU3Pe`
- Vercel scope: `williangustavosantos-sys-projects`

## Baseline visual audit

- Captured all four routes at `320`, `375`, `390`, `430`, `768`, `1024`, `1440` and `1920` CSS pixels in Chromium and WebKit: 64 full-page screenshots.
- Captured 76 additional critical-section viewports at `320` and `390` CSS pixels.
- Evidence: `outputs/iphone-correction/baseline/` and `outputs/iphone-correction/VISUAL_AUDIT.md`.
- Baseline capture completion is not a PASS. Optical inspection confirmed the physical-iPhone report.

## Confirmed critical defects

- Creator mobile hero is approximately `1,200px` high at common iPhone widths; the portrait begins too late and the copy/CTA stack dominates the first viewport.
- Creator mobile portfolio intentionally uses two columns after the first item; supporting 9:16 videos shrink to roughly `168px` width at `390px` viewport.
- General contact is approximately `2,223px` high at `390px`, contains untranslated internal-looking booking cards and oversized contact tiles.
- General and Booking mix two visual systems: legacy saturated orange/green/blue cards and newer quiet editorial gold.
- Live mobile uses two narrow featured vertical cards side-by-side and a supporting rail without sufficient index/scroll affordance; visible titles remain English in Portuguese.
- Fixed navigation and hash offsets are not safe-area-aware and can visually cover section headings during anchor navigation.
- General has excessive vertical gaps and duplicate commercial transitions; Hero, Brand, Media Kit and Contact compete rather than form one narrative.
- Translation gaps remain in visible text, media metadata and accessibility labels.

## Preserved product contract

- General remains `/` and connects to Booking and Creator; the official logo always returns to `/`.
- Keep 10 real selectable music tracks, Spotify, 9 real live videos, one audio owner, Creator portfolio media, verified metrics, 14 evidence images, real contacts, language persistence, SEO and original assets.
- Do not alter a face, body or tattoos; do not invent shows, audiences, metrics or endorsements.
- Keep historical metrics explicitly dated and sourced.

## Current execution

1. Rebuild the mobile compositions and shared visual tokens, then refine tablet and desktop.
2. Audit and localize all visible strings and ARIA labels for every supported language.
3. Add visual QA gates that test composition, header overlap, touch targets and locale leakage rather than only overflow/rendering.
4. Rebuild, run Chromium and WebKit functional/media checks, capture the complete after matrix and inspect it optically.
5. Deploy a new protected Preview only, open General `/` for owner review, and wait for explicit approval before touching `main` or Production.

This website remains distinct from the registered TOSZAN music-production/REAPER workspace.
