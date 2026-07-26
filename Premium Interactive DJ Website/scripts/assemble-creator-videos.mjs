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

  if (existsSync(output)) {
    continue;
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
