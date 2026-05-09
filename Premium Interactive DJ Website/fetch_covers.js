const urls = [
  "https://soundcloud.com/dj-willian-toszan/toszan-live-at-manicomio",
  "https://soundcloud.com/dj-willian-toszan/g-latina-pedro-sampaio-toszan-remix",
  "https://soundcloud.com/dj-willian-toszan/sesso-e-samba-toszan-remix",
  "https://soundcloud.com/dj-willian-toszan/toszan-solta-mais-pressa-o",
  "https://soundcloud.com/dj-willian-toszan/toszan-batte-forte",
  "https://soundcloud.com/dj-willian-toszan/toszan-opera",
  "https://soundcloud.com/dj-willian-toszan/toszan-thundr-promo-set"
];

async function fetchOgImage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const text = await res.text();
    const match = text.match(/<meta property="og:image" content="([^"]+)"/);
    return { url, img: match ? match[1] : 'not found' };
  } catch (err) {
    return { url, img: 'error' };
  }
}

async function main() {
  const results = [];
  for (const url of urls) {
    const res = await fetchOgImage(url);
    results.push(res);
  }
  console.log(JSON.stringify(results, null, 2));
}
main();
