import { useState } from "react";
import { Music2 } from "lucide-react";

// Remount by source when switching tracks; stale load/error events cannot affect the next artwork.
export function MusicArtwork({ src, title, eager = false }: { src: string; title: string; eager?: boolean }) {
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  return <span className="music-artwork" data-artwork-state={state}>
    <span className="music-artwork-placeholder" role={state === "error" ? "img" : undefined} aria-label={state === "error" ? title : undefined}>
      <Music2 size={28} aria-hidden="true" /><span>TOSZAN</span>
    </span>
    <img src={src} alt={title} width={500} height={500} loading={eager ? "eager" : "lazy"} decoding="async"
      onLoad={event => { void event.currentTarget.decode().then(() => setState("ready")).catch(() => setState("error")); }} onError={() => setState("error")} style={{ opacity: state === "ready" ? 1 : 0 }} />
  </span>;
}
