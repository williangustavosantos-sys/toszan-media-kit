const urls = [
  "https://soundcloud.com/dj-willian-toszan/toszan-live-at-manicomio",
  "https://soundcloud.com/dj-willian-toszan/g-latina-pedro-sampaio-toszan-remix",
  "https://soundcloud.com/dj-willian-toszan/sesso-e-samba-toszan-remix",
  "https://soundcloud.com/dj-willian-toszan/toszan-solta-mais-pressa-o",
  "https://soundcloud.com/dj-willian-toszan/toszan-batte-forte",
  "https://soundcloud.com/dj-willian-toszan/toszan-opera",
  "https://soundcloud.com/dj-willian-toszan/toszan-thundr-promo-set"
];

async function fetchMetadata(url) {
  try {
    const res = await fetch(`https://soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json`);
    const json = await res.json();
    return { url, title: json.title, img: json.thumbnail_url };
  } catch (err) {
    return { url, img: 'error' };
  }
}

async function main() {
  const results = [];
  for (const url of urls) {
    const res = await fetchMetadata(url);
    results.push(res);
  }
  console.log(JSON.stringify(results, null, 2));
}
main();
