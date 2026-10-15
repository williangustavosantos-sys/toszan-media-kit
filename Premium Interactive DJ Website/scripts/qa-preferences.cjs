async(page) => {
 const base=new URL(page.url()).origin;const browser=page.context().browser();const cookies=await page.context().cookies(base);const results=[];
 for(const mode of ['reduced-motion','save-data']) {
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:mode==='reduced-motion'?'reduce':'no-preference'});
  await context.addCookies(cookies);if(mode==='save-data')await context.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true},configurable:true}));
  const p=await context.newPage();await p.goto(base+'/#experience');await p.waitForTimeout(1000);
  await p.locator('.is-center video').evaluate(v=>v.scrollIntoView({behavior:'instant',block:'center'}));await p.waitForTimeout(300);
  const before=await p.locator('.is-center video').evaluate(v=>({time:v.currentTime,paused:v.paused}));
  await p.locator('.is-center .inline-media-control').click();await p.waitForFunction(()=>{const v=document.querySelector('.is-center video');return !v.paused&&v.currentTime>.2;});
  const after=await p.locator('.is-center video').evaluate(v=>({time:v.currentTime,paused:v.paused,muted:v.muted}));
  results.push({mode,before,after,pass:before.paused&&before.time===0&&!after.paused&&after.muted});await context.close();
 }
 return {base,results};
}
