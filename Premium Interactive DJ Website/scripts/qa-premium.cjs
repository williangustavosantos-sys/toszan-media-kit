// Playwright CLI run-code callback. Run with scripts/run-premium-qa.py.
async (page) => {
  const base = '__BASE__';
  const tag = '__TAG__';
  const out = 'output/playwright/' + tag;
  const results = { base, tag, layouts: [], flows: [], failures: [], pageErrors: [], httpErrors: [] };
  page.on('pageerror', error => results.pageErrors.push(error.message));
  page.on('response', response => { if (response.status()>=400 && new URL(response.url()).origin===new URL(base).origin) results.httpErrors.push({path:new URL(response.url()).pathname,status:response.status()}); });
  const check = (condition, message) => { if (!condition) { results.failures.push(message); throw new Error(message); } };
  const capture = async name => page.screenshot({ path: `${out}-${name}.png` });
  const scroll = async selector => {
    await page.locator(selector).first().evaluate(el => el.scrollIntoView({ block:'start', behavior:'instant' }));
    await page.waitForTimeout(850);
  };
  const media = async selector => {
    const video = page.locator(selector).first();
    await video.evaluate(el => el.scrollIntoView({ block:'center', behavior:'instant' }));
    await page.waitForFunction(selector => {
      const v = document.querySelector(selector);
      return v && !v.paused && v.currentTime > .12 && v.readyState >= 2;
    }, selector, { timeout:15000 });
    const sample = () => video.evaluate(v => {
      const c = document.createElement('canvas'); c.width=32; c.height=32;
      const ctx = c.getContext('2d'); ctx.drawImage(v,0,0,32,32);
      const pixels = ctx.getImageData(0,0,32,32).data;
      let hash=0, nonblack=0;
      for(let i=0;i<pixels.length;i+=4) { hash=(hash*31+pixels[i]+pixels[i+1]*3+pixels[i+2]*7)>>>0; if(pixels[i]+pixels[i+1]+pixels[i+2]>24) nonblack++; }
      return { source:v.getAttribute('src'), time:v.currentTime, frames:v.getVideoPlaybackQuality().totalVideoFrames,
        paused:v.paused, muted:v.muted, inline:v.playsInline, webkitInline:v.hasAttribute('webkit-playsinline'),
        hash, nonblack, rendered:v.parentElement.dataset.rendered, state:v.parentElement.dataset.playback };
    });
    const before = await sample(); await page.waitForTimeout(500); const after = await sample();
    check(after.time > before.time, `${tag}: currentTime stalled ${after.source}`);
    check(after.nonblack > 0 && after.hash !== before.hash && after.rendered === "true",
      `${tag}: no changing rendered frames ${after.source}`);
    check(after.inline && after.webkitInline, `${tag}: missing inline attributes`);
    return { before, after };
  };
  try {
    await page.goto(base); await page.waitForTimeout(1000);
    for (const width of [320,375,390,430,768,820,1024,1280,1440]) {
      await page.setViewportSize({width,height:width<768?844:1000});
      await scroll('#top');
      const home = await page.locator('.hero-whatsapp').boundingBox();
      check(home && home.y >= 0 && home.y+home.height <= (width<768?844:1000), `${width}: initial WhatsApp off screen`);
      await capture(`${width}-home`);
      for(const section of ['#dj-booking','#creator']) {
        await scroll(section);
        const geometry = await page.evaluate(() => {
          const rect = s => document.querySelector(s).getBoundingClientRect().toJSON();
          return { width:innerWidth, scrollWidth:document.documentElement.scrollWidth,
            header:parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')),
            statement:rect('.creator-hero-statement'), portrait:rect('.creator-hero-portrait'),
            creator:rect('#creator'), dj:rect('#dj-booking') };
        });
        check(geometry.scrollWidth<=width,`${width}: horizontal overflow`);
        if(section==='#creator') {
          check(geometry.statement.right<=geometry.portrait.left+1,`${width}: portrait overlaps copy`);
          check(geometry.creator.top>=geometry.header,`${width}: creator hidden under header`);
        } else check(geometry.dj.top>=geometry.header,`${width}: DJ hidden under header`);
        results.layouts.push({width,section,geometry}); await capture(`${width}-${section.slice(1)}`);
      }
    }
    await page.setViewportSize({width:390,height:844});
    for(const [locale,name] of [['pt','Português'],['it','Italiano'],['en','English'],['es','Español'],['fr','Français']]) {
      await page.locator('.cine-nav-tools button[aria-haspopup="menu"]').click();
      await page.getByRole('menuitem').filter({hasText:name}).click();
      await page.waitForFunction(locale => document.documentElement.lang===locale,locale);
      await page.locator('.toszan-mobile-tabs a').nth(0).click(); await page.waitForTimeout(1000);
      check(await page.locator('.hero-whatsapp').isVisible(),`${locale}: WhatsApp missing`);
      const href = await page.locator('.hero-whatsapp').getAttribute('href');
      check(new URL(href).hostname==='wa.me' && new URL(href).pathname==='/393428369444',`${locale}: incorrect contact`);
      // Open the actual link; inspect destination without sending a message.
      const [popup] = await Promise.all([page.waitForEvent('popup'),page.locator('.hero-whatsapp').click()]);
      try { await popup.waitForLoadState('domcontentloaded',{timeout:15000}); } catch {}
      const destination=popup.url();
      check(/wa\.me|whatsapp\.com/.test(destination),`${locale}: wrong WhatsApp destination`);
      await popup.close();
      await page.locator('.toszan-mobile-tabs a').nth(1).click(); await page.waitForTimeout(1000);
      await scroll('#experience');
      const clips=[];
      for(let i=0;i<9;i++) {
        const sample = await media('.is-center video'); clips.push(sample);
        if(i===0) {
          await page.locator('.is-center .inline-media-control').click();
          await page.waitForFunction(()=>{const v=document.querySelector('.is-center video');return !v.paused&&!v.muted;});
          check(await page.locator('video[data-inline-video]').evaluateAll(vs=>vs.filter(v=>!v.paused&&!v.muted).length)===1,`${locale}: multiple audio owners`);
          await capture(`${locale}-dj-sound`);
        }
        const old=await page.locator('.is-center video').elementHandle();
        await page.locator('.live-carousel-arrow').last().click();
        await page.waitForTimeout(120);
        check(await old.evaluate(v=>v.paused&&v.muted),`${locale}: previous video not stopped`);
      }
      const wrapped=await media('.is-center video');
      check(wrapped.after.source===clips[0].after.source,`${locale}: 9 to 1 wrap failed`);
      await page.locator('.live-infinite-window').focus(); await page.keyboard.press('ArrowLeft');
      const backward=await media('.is-center video');
      check(backward.after.source===clips[8].after.source,`${locale}: keyboard back failed`);
      await page.keyboard.press('ArrowRight'); await media('.is-center video');
      // Touch events exercise the actual swipe handlers, independently from keyboard/buttons.
      await page.locator('.live-infinite-window').dispatchEvent('touchstart',{touches:[{identifier:1,clientX:250,clientY:300}]});
      await page.locator('.live-infinite-window').dispatchEvent('touchend',{changedTouches:[{identifier:1,clientX:100,clientY:300}]});
      const swiped=await media('.is-center video');
      check(swiped.after.source===clips[1].after.source,`${locale}: swipe failed`);
      await page.locator('.toszan-mobile-tabs a').nth(2).click(); await page.waitForTimeout(1100);
      await capture(`${locale}-creator-cover`);
      const cover=await page.evaluate(()=>({statement:document.querySelector('.creator-hero-statement').getBoundingClientRect().toJSON(),portrait:document.querySelector('.creator-hero-portrait').getBoundingClientRect().toJSON()}));
      check(cover.statement.right<=cover.portrait.left,`${locale}: translated copy/photo overlap`);
      const creator=[];
      for(let i=0;i<5;i++) {
        creator.push(await media(`.creator-work-item:nth-child(${i+1}) video`));
        await page.locator('.creator-work-item').nth(i).locator('.inline-media-control').click();
        await page.waitForFunction(i=>{const v=document.querySelectorAll('.creator-work-item video')[i];return !v.muted&&!v.paused;},i);
        check(await page.locator('video[data-inline-video]').evaluateAll(vs=>vs.filter(v=>!v.paused&&!v.muted).length)===1,`${locale}: Creator audio conflict`);
      }
      const last=await page.locator('.creator-work-item').last().boundingBox();
      const first=await page.locator('.creator-work-item').first().boundingBox();
      check(Math.abs(last.width-first.width)<1&&Math.abs(last.x+last.width/2-195)<1,`${locale}: fifth card not centered`);
      await capture(`${locale}-creator-last`);
      await scroll('#music');
      for(let i=0;i<10;i++) {
        await page.locator('.music-cover-button').nth(i).click();
        await page.waitForFunction(()=>document.querySelector('.music-selected-track .music-artwork').dataset.artworkState==='ready');
      }
      // Rapid changes, including ten-to-one, must leave artwork and destination coherent.
      for(let i=19;i>=0;i--) await page.locator('.music-cover-button').nth(i%10).click({force:true});
      await page.waitForFunction(()=>{const img=document.querySelector('.music-selected-track .music-artwork img');return img.complete&&img.naturalWidth>0&&getComputedStyle(img).opacity==='1';});
      const artwork=await page.locator('.music-selected-track .music-artwork img').getAttribute('src');
      check(artwork.includes('promo-set-2026'),`${locale}: stale artwork after rapid selection`);
      await capture(`${locale}-music`);
      check(await page.locator('.whatsapp-floating').count()===1,`${locale}: duplicate floating contact`);
      results.flows.push({locale,whatsapp:{href,destination},clips,wrapped,creator,cover,last,artwork});
    }
    // Deterministic policy denial: the fallback must remain usable, with no policy bypass loop.
    await scroll('#experience');
    await page.evaluate(()=>{window.__originalPlay=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){return Promise.reject(new DOMException('QA autoplay denial','NotAllowedError'));};});
    await page.locator('.live-carousel-arrow').last().click();
    await page.waitForFunction(()=>document.querySelector('.is-center .inline-media').dataset.playback==='blocked');
    await capture('autoplay-blocked');
    await page.evaluate(()=>{HTMLMediaElement.prototype.play=window.__originalPlay;delete window.__originalPlay;});
    await page.locator('.is-center .inline-media-control').click();
    results.fallback=await media('.is-center video');
    // A valid image unavailable in the network must produce an explicit branded fallback.
    await page.route('**/music/covers/brasil.jpg',route=>route.abort());
    await page.reload(); await scroll('#music'); await page.locator('[data-track-id="brasil"]').click();
    await page.waitForFunction(()=>document.querySelector('.music-selected-track .music-artwork').dataset.artworkState==='error');
    await capture('artwork-error'); await page.unroute('**/music/covers/brasil.jpg');
    await page.reload(); await scroll('#music'); await page.locator('[data-track-id="brasil"]').click();
    await page.waitForFunction(()=>document.querySelector('.music-selected-track .music-artwork').dataset.artworkState==='ready');
    results.artworkRecovery=true;
    check(results.pageErrors.length===0,'JavaScript exceptions');
    check(results.httpErrors.length===0,'First-party HTTP errors');
  } catch(error) { results.error=String(error); }
  return results;

}
