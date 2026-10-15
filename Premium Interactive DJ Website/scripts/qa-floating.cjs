async(page) => {
 const result=[];
 for(const width of [320,390,820,1440]) {
  await page.setViewportSize({width,height:width<768?844:1000});
  for(const id of ['top','experience','creator','work','performance','services','contact','music']) {
   await page.locator('#'+id).evaluate(el=>el.scrollIntoView({behavior:'instant'}));await page.waitForTimeout(180);
   const x=await page.locator('.whatsapp-floating').evaluate(el=>{
    const a=el.getBoundingClientRect();
    return {lift:el.style.getPropertyValue('--whatsapp-lift'),collisions:Array.from(document.querySelectorAll('h1,h2,h3,button,a,video,iframe'))
     .filter(x=>x!==el&&!x.closest('.cine-navigation,.toszan-mobile-tabs')&&!(x.tagName==='IFRAME'&&x.src.startsWith('https://vercel.live/')))
     .filter(x=>{const b=x.getBoundingClientRect();return b.width>0&&b.height>0&&b.bottom>a.top&&b.top<a.bottom&&b.right>a.left&&b.left<a.right;}).map(x=>x.tagName+':'+x.className)};
   }); result.push({width,id,...x});
  }
 }
 return {url:page.url(),result};
}
