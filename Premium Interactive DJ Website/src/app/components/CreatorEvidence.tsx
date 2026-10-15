import { useEffect, useState } from "react";
import { X, ZoomIn, ShieldCheck } from "lucide-react";
import { analyticsScreenshots } from "../../data/creatorStats";
import { creatorCopy, getCreatorLanguage } from "../../data/creatorCopy";
import { useLanguage } from "../context/LanguageContext";
import "../../styles/three-path.css";

export function CreatorEvidence({open, onToggle}: {open:boolean;onToggle:(open:boolean)=>void}) {
 const {language}=useLanguage();
 const c=creatorCopy[getCreatorLanguage(language)];
 const [selected,setSelected]=useState<number|null>(null);
 useEffect(()=>{
  if(selected===null)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow="hidden";
  const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setSelected(null)};
  window.addEventListener("keydown",onKey);
  return()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",onKey)};
 },[selected]);
 const close=()=>setSelected(null);
 return <>
  <details id="verified-metrics" className="creator-evidence" open={open} onToggle={e=>onToggle(e.currentTarget.open)}>
   <summary><ShieldCheck size={24}/><span><strong>{c.analyticsPage.proof}</strong><small>{c.analyticsPage.verification}</small></span><span className="creator-evidence-action">{open?"−":"+"}</span></summary>
   <p className="creator-evidence-description">{c.analyticsPage.intro}</p>
   <div className="creator-evidence-gallery">
    {analyticsScreenshots.map((item,index)=><button type="button" key={item.src} onClick={()=>setSelected(index)} aria-label={c.analyticsPage.galleryItems[index]?.title ?? item.src}>
      <img loading="lazy" src={item.src} alt={c.analyticsPage.galleryItems[index]?.title ?? ""}/>
      <span>{String(index+1).padStart(2,"0")} <ZoomIn size={16}/></span>
    </button>)}
   </div>
  </details>
  {selected !== null && <div className="creator-evidence-modal" role="dialog" aria-modal="true" aria-label={c.analyticsPage.galleryItems[selected]?.title} onClick={close}>
   <div onClick={e=>e.stopPropagation()}>
    <button type="button" onClick={close} aria-label={c.analyticsPage.close}><X size={26}/></button>
    <img src={analyticsScreenshots[selected].src} alt={c.analyticsPage.galleryItems[selected]?.title ?? ""}/>
    <p>{c.analyticsPage.galleryItems[selected]?.title}</p>
   </div>
  </div>}
 </>;
}
