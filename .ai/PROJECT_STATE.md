# TOSZAN website — final UX correction

Updated 2026-10-15. Implementation and published Preview validation complete; Production remains frozen.

- Workspace: /Users/williandossantos/Documents/Codex/2026-10-14/crie-um-novo-site-com-sites-3/work/toszan-media-kit
- Repository: https://github.com/williangustavosantos-sys/toszan-media-kit
- Branch: polish/premium-ui-finisher-20261015
- Requested base: b5ccd49f3c0aeea617e7b79eb90f208dbf7f6556, clean at start; origin fetched.
- Application candidate: c8633a21c57ef94dfca5c8d7977a7a4916d8cf04.
- Tested Preview: https://toszan-media-e8w9d1mcr-williangustavosantos-sys-projects.vercel.app
- Deployment: dpl_8xojaWUFVqi1vRkpCz2fHFvsipym, READY, Preview.
- Production unchanged: dpl_A2RaYN3Bb4CQWnxByjMTv9qZWkJX / 39cfd2fbec1a819d2f408971172dbd27b10e7ead / main.
- Vercel project: prj_WUvb9Q4dKWL9ZbDIP33ZgXoJU3Pe, team_nHdoEBA8W5CwzGDn8BZeDGVu.

Implemented shared muted/inline media + audio ownership, nine-video carousel lifecycle, content-sized multilingual Creator hero preserving NOVAFOTO, centered fifth video, immediate/adaptive fixed WhatsApp using existing contact, local original music covers with decode/loading/error state, measured fixed-header offsets.

Fresh published evidence: nine widths in Chrome and WebKit, five complete locale flows per engine, zero failures / JS exceptions / first-party HTTP errors. Four additional iPhone/iPad Safari/Chrome profiles passed (emulated). Thirty-two floating-contact overlap checks passed. Reduced-motion/save-data manual start passed. All 14 active files H.264/AAC and fast start. Safari native Mac manual playback/sound and 9->1 observed; OS reduceMotion=1 explains the manual preference. No physical iPhone/iPad or physical speaker-output claim.

Full report: docs/audits/2026-10-15/final-ux/FINAL_VALIDATION.md. JSON and selected screenshots are alongside it. The final evidence commit changes only documentation and QA scripts, not the application source of the tested candidate.

Next: owner reviews this exact Preview on the actual iPhone. Any source fix requires a fresh candidate and affected-flow validation. Production/main require explicit new owner authorization. Do not treat older automated approval as physical acceptance.

Temporary local runtime must be closed at delivery; no persistent server is needed for the published Preview.
