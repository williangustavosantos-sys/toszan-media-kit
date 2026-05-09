const logoImg = "/logo_toszan_sem_preto.png";

/**
 * Renders the TOSZAN logo (1080×1350 px portrait PNG, transparent background).
 *
 * The logo text occupies approximately:
 *   - Horizontally: 7% → 85%  (78% of width)
 *   - Vertically:   34% → 55% (21% of height)
 *
 * We crop to just the text area using overflow:hidden + negative margins,
 * so logoHeight refers to the VISIBLE text height.
 *
 * Use `logoHeight` in px for fixed contexts (nav, footer, etc.)
 * Use `cssHeight` string for responsive contexts (hero), e.g. "clamp(4.5rem, 18vw, 13rem)"
 */

// Crop fractions (tweak if logo art changes)
const TOP_FRAC    = 0.32;   // text starts at 32% from top
const BOTTOM_FRAC = 0.57;   // text ends at 57% from top
const LEFT_FRAC   = 0.05;   // text starts at 5% from left
const RIGHT_FRAC  = 0.88;   // text ends at 88% from left

// Image natural aspect ratio
const IMG_W = 1080;
const IMG_H = 1350;
const ASPECT = IMG_W / IMG_H; // ~0.8

// Fraction of image height occupied by text
const TEXT_H_FRAC = BOTTOM_FRAC - TOP_FRAC;   // 0.21
// Fraction of image width occupied by text
const TEXT_W_FRAC = RIGHT_FRAC - LEFT_FRAC;    // 0.78

interface ToszanLogoProps {
  /** Height of the VISIBLE logo text in px. Default 40. */
  logoHeight?: number;
  /** CSS height string for responsive contexts. Overrides logoHeight. */
  cssHeight?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Apply golden tint filter. Default true. */
  gold?: boolean;
}

export function ToszanLogo({
  logoHeight = 40,
  cssHeight,
  className = "",
  style = {},
  gold = true,
}: ToszanLogoProps) {
  const filter = gold
    ? "sepia(0.6) saturate(2.5) hue-rotate(5deg) brightness(1.1)"
    : "brightness(0) invert(1)"; // Forces it to pure white

  // Responsive mode: use CSS variables trick via style tag won't work in inline JSX.
  // For cssHeight we render a wrapper sized by the CSS string using a trick:
  // The img is scaled such that its height equals cssHeight / TEXT_H_FRAC.
  if (cssHeight) {
    // imgHeight = textHeight / TEXT_H_FRAC
    // imgWidth  = imgHeight * ASPECT
    // containerHeight = textHeight  (= cssHeight)
    // containerWidth  = imgWidth * TEXT_W_FRAC
    // marginTop = -imgHeight * TOP_FRAC
    // marginLeft = -imgWidth * LEFT_FRAC
    // We express all of these in terms of cssHeight using calc()
    const scale = 1 / TEXT_H_FRAC;           // img is scale× taller than visible text
    const wScale = scale * ASPECT * TEXT_W_FRAC; // container width / text height
    const mTop  = -(TOP_FRAC / TEXT_H_FRAC);    // negative margin factor
    const mLeft = -(LEFT_FRAC / TEXT_H_FRAC) * ASPECT; // negative margin factor

    return (
      <div
        className={className}
        style={{
          height: cssHeight,
          width: `calc(${cssHeight} * ${wScale.toFixed(4)})`,
          overflow: "hidden",
          display: "inline-block",
          flexShrink: 0,
          lineHeight: 0,
          ...style,
        }}
      >
        <img
          src={logoImg}
          alt="TOSZAN"
          draggable={false}
          style={{
            height: `calc(${cssHeight} * ${scale.toFixed(4)})`,
            width: `calc(${cssHeight} * ${(scale * ASPECT).toFixed(4)})`,
            marginTop: `calc(${cssHeight} * ${mTop.toFixed(4)})`,
            marginLeft: `calc(${cssHeight} * ${mLeft.toFixed(4)})`,
            display: "block",
            maxWidth: "none",
            objectFit: "fill",
            filter,
            userSelect: "none",
            pointerEvents: "none",
            background: "transparent",
          }}
        />
      </div>
    );
  }

  // Fixed px mode
  const imgH    = logoHeight / TEXT_H_FRAC;
  const imgW    = imgH * ASPECT;
  const conW    = imgW * TEXT_W_FRAC;
  const mTop    = -(imgH * TOP_FRAC);
  const mLeft   = -(imgW * LEFT_FRAC);

  return (
    <div
      className={className}
      style={{
        height: logoHeight,
        width: conW,
        overflow: "hidden",
        display: "inline-block",
        flexShrink: 0,
        lineHeight: 0,
        ...style,
      }}
    >
      <img
        src={logoImg}
        alt="TOSZAN"
        draggable={false}
        style={{
          height: imgH,
          width: imgW,
          marginTop: mTop,
          marginLeft: mLeft,
          display: "block",
          maxWidth: "none",
          objectFit: "fill",
          filter,
          userSelect: "none",
          pointerEvents: "none",
          background: "transparent",
        }}
      />
    </div>
  );
}