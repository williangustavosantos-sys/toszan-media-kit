async (page) => {
 const base=new URL(page.url()).origin;
 const browser=page.context().browser();
 const cookies=await page.context().cookies(base); const results=[];
 const profiles=[
  {name:'iphone-safari',width:390,height:844,ua:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'},
  {name:'iphone-chrome',width:390,height:844,ua:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/138.0.7204.156 Mobile/15E148 Safari/604.1'},
  {name:'ipad-safari',width:820,height:1180,ua:'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'},
  {name:'ipad-chrome',width:768,height:1024,ua:'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/138.0.7204.156 Mobile/15E148 Safari/604.1'}
 ];
 for(const profile of profiles) {
  const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},isMobile:true,hasTouch:true,userAgent:profile.ua});
  await context.addCookies(cookies);const p=await context.newPage();const row={profile:profile.name,emulated:true,clips:[],creator:[]};
  try {
   await p.goto(base);await p.waitForTimeout(1000);
   row.whatsapp=await p.locator('.hero-whatsapp').getAttribute('href');
   await p.screenshot({path:`output/playwright/preview-${profile.name}-home.png`});
   await p.locator('#experience').evaluate(el=>el.scrollIntoView({behavior:'instant'}));
   for(let i=0;i<10;i++) {
    await p.locator('.is-center video').evaluate(v=>v.scrollIntoView({behavior:'instant',block:'center'}));
    await p.waitForFunction(()=>{const v=document.querySelector('.is-center video');return !v.paused&&v.currentTime>.2;});
    const a=await p.locator('.is-center video').evaluate(v=>({src:v.getAttribute('src'),t:v.currentTime}));await p.waitForTimeout(350);
    const b=await p.locator('.is-center video').evaluate(v=>({t:v.currentTime,frames:v.getVideoPlaybackQuality().totalVideoFrames}));
    if(b.t<=a.t) throw Error('Time did not advance');row.clips.push({a,b});
    if(i<9)await p.locator('.live-carousel-arrow').last().click();
   }
   if(row.clips[0].a.src!==row.clips[9].a.src)throw Error('Wrap failed');
   await p.locator('.is-center .inline-media-control').click();
   await p.waitForFunction(()=>!document.querySelector('.is-center video').muted);
   await p.screenshot({path:`output/playwright/preview-${profile.name}-dj.png`});
   await p.locator('#creator').evaluate(el=>el.scrollIntoView({behavior:'instant'}));await p.waitForTimeout(600);
   await p.screenshot({path:`output/playwright/preview-${profile.name}-creator.png`});
   for(let i=0;i<5;i++) {
    const sel=`.creator-work-item:nth-child(${i+1}) video`;
    await p.locator(sel).evaluate(v=>v.scrollIntoView({behavior:'instant',block:'center'}));
    await p.waitForFunction(sel=>{const v=document.querySelector(sel);return !v.paused&&v.currentTime>.1;},sel);
    row.creator.push(await p.locator(sel).evaluate(v=>({src:v.getAttribute('src'),t:v.currentTime})));
   }
   row.overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
   if(row.overflow)throw Error('Overflow');
  } catch(error) {row.error=String(error);}
  results.push(row);await context.close();
 }
 return results;
}
