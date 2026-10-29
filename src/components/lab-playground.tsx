"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
export function LabPlayground() {
  const t = useTranslations("lab");
  const items = t.raw("experiments") as Array<{number:string;title:string;type:string;copy:string;action:string}>;
  const [palette, setPalette] = useState(0);
  const palettes = ["field-lime", "field-coral", "field-blue"];
  return <div className="lab-grid">{items.map((item, index) => <article className="lab-card" data-reveal key={item.number}>
    <div className={"lab-art " + (index === 1 ? palettes[palette] : palettes[index % 3])}
      onPointerMove={(e) => { const r=e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--pointer-x", ((e.clientX-r.left)/r.width*100)+"%"); e.currentTarget.style.setProperty("--pointer-y", ((e.clientY-r.top)/r.height*100)+"%"); }}
      onPointerLeave={(e) => { e.currentTarget.style.setProperty("--pointer-x","50%"); e.currentTarget.style.setProperty("--pointer-y","50%"); }}>
      <span className="lab-orb" aria-hidden="true"/>
      {index === 1 ? <button className="palette-button" type="button" aria-label={item.action} onClick={()=>setPalette((palette+1)%3)}>↻</button>
        : <span className="lab-art-word" aria-hidden="true">{index === 0 ? "FIELD" : "Aa"}</span>}
    </div><div className="lab-card-copy"><div><span className="project-type">{item.type}</span><h2>{item.title}</h2></div><p>{item.copy}</p></div>
  </article>)}</div>;
}
