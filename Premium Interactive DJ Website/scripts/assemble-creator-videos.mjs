import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

const videos = [
  "ugc-creator-introduction.mp4",
  "ugc-hair-wax-bottega-paesano.mp4",
];

for (const video of videos) {
  const partsDirectory = join("build-assets", "creator-videos", video);
  const output = join("public", "creator", "videos", video);

  // The committed, optimized MP4 is the source used by the Creator portfolio.
  // Older builds may also reconstruct an original MP4 from chunk files; never
  // fail a clean Git checkout when the optimized delivery asset already exists.
  const optimizedVideo = join("public", "creator", "optimized", video);
  if (existsSync(output) || existsSync(optimizedVideo)) {
    continue;
  }

  if (!existsSync(partsDirectory)) {
    throw new Error(`No optimized video or build parts found for ${video}`);
  }

  const parts = readdirSync(partsDirectory)
    .filter((name) => name.endsWith(".part"))
    .sort()
    .map((name) => join(partsDirectory, name));

  if (parts.length === 0) {
    throw new Error(`No build parts found for ${video}`);
  }

  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, new Uint8Array());

  for (const part of parts) {
    appendFileSync(output, readFileSync(part));
  }
}
