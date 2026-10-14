# TOSZAN WEBSITE — PROJECT STATE

Date: 2026-10-14 Europe/Rome.

## Binding status

The rejected candidate `65cd2ee258f7349ed56006d5240f57d643c81918` remains rejected and is not evidence of approval. The materially revised site is now published on `main` and Vercel Production after local, Preview and Production QA. The remaining decision is the owner's visual/commercial review of the new result.

The user has now explicitly authorized updating `main` and Vercel after final validation. This supersedes the prior publication prohibition, but it does not convert automated QA into a claim of owner visual approval.

## Identity

- Repository: `https://github.com/williangustavosantos-sys/toszan-media-kit`
- Workspace: `/Users/williandossantos/Documents/Codex/2026-10-14/crie-um-novo-site-com-sites-3/work/toszan-media-kit`
- Application: `Premium Interactive DJ Website`
- Working branch: `redesign/cinematic-toszan-20261014`
- Revised implementation commit: `5c35192659c031451af740e738dcd66d0424a264`
- Saved WIP base: `21a5d067535306ca42548d6de3d087bd38afb465`
- Remote main/base before this publication: `e2b3449652e0b64bd3f947402d4c89ca02a91711`
- Vercel project: `prj_WUvb9Q4dKWL9ZbDIP33ZgXoJU3Pe`
- Vercel scope: `williangustavosantos-sys-projects`
- Validated Preview: `https://toszan-media-c3g8bviig-williangustavosantos-sys-projects.vercel.app`
- Preview deployment: `dpl_AM72TGH4PfEDPePoiM99kn8V5Aju`
- Production URL: `https://toszan-media-kit.vercel.app`
- Validated Production deployment: `dpl_98tbkqRGooPVkH5YBCApbHXQuG85`
- Main at publication: `7a0327d9fb755f02a41e1cdf292346e089936bfe`

## Revised implementation

- General `/` now leads with the corrected hero, then the complete music catalog and complete live archive.
- Booking embeds the complete reusable music experience: 10 real selectable SoundCloud tracks, Spotify artist player, real previous/next controls, swipe, semantic selected states and direct platform fallbacks.
- Booking embeds the complete reusable live experience once: 9 real MP4 clips, 3 featured clips, 6 supporting clips, visible touch controls, one audio owner, mute and retry behavior.
- Live autoplay now obeys reduced-motion and Save Data while preserving explicit manual playback.
- General, Booking and Creator remain permanently connected in desktop/mobile navigation; the official logo always returns to `/`.
- The General hero logo respects the official `874/199` crop ratio and no longer overlaps `WILLIAN`.
- Creator/Analytics motion, counters, bars, interactive evidence metrics, footer paths and button resets are complete; the rejected giant contact arrow is removed.

## Current evidence

- `npm run build`: PASS after the final audio-owner race fix.
- Local Playwright matrix: 24/24 PASS across General, Booking, Creator and Analytics at 390×844, 768×1024 and 1440×1000 in Chrome and WebKit.
- Local functional flows: 9/9 PASS for global/logo navigation, all 10 track selections, previous/next/swipe/Spotify, five Booking languages and persistence, all 9 videos with one audio owner, reduced-motion manual playback, Save Data gating, Creator counters/bars and Analytics 6 metric + 14 evidence modals.
- Visual section captures are stored under `outputs/final-redesign/` and were optically reviewed during implementation.
- Detailed machine-readable evidence: `outputs/final-redesign-qa.json`.
- Hosted Preview matrix: 24/24 PASS and 9/9 functional flows against deployment `dpl_AM72TGH4PfEDPePoiM99kn8V5Aju`; evidence in `outputs/hosted-preview-qa.json`.
- Hosted SoundCloud UI entered real `playing` state in Chrome and WebKit mobile contexts; evidence in `outputs/hosted-soundcloud-qa.json`.
- Production matrix: 24/24 PASS and 9/9 functional flows against the canonical alias; evidence in `outputs/production-qa.json`.
- Production SoundCloud UI entered real `playing` state in Chrome and WebKit mobile contexts; evidence in `outputs/production-soundcloud-qa.json`.

## Evidence limits

- Browser emulation is not a physical iPhone or iPad.
- Automated media state proves browser playback/progress/mute behavior, not sound perceived through physical speakers.
- Automated and implementer visual review do not constitute the owner's final aesthetic approval.

## Exact next step

Open `https://toszan-media-kit.vercel.app/` on General for owner visual/commercial review. Do not reinterpret automated PASS results as that approval. Apply only new feedback from the owner; no further publication action is pending.

This website remains distinct from the registered TOSZAN music-production/REAPER workspace.
