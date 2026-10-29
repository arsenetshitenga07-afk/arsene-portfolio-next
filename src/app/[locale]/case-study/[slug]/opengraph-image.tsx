import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import type { Project } from "@/types/project";
export const alt = "Étude de cas / Case study — Arsène Tshitenga";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const project = (t.raw("items") as Project[]).find((item) => item.slug === slug);
  const title = project?.title ?? "Arsène Tshitenga";
  const category = project?.category ?? "Creative developer";
  const footerCaption = locale === "fr" ? "FULL-STACK · INTERACTION · CRÉATION" : "FULL-STACK · INTERACTION · CREATIVE CODE";
  return new ImageResponse(
    <div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"68px",background:"radial-gradient(circle at 78% 40%, #445537 0, #171c16 34%, #111411 70%)",color:"#f1f0e8",fontFamily:"Arial" }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:18,letterSpacing:5,color:"#c5ef70" }}><span>ARSÈNE TSHITENGA</span><span>KINSHASA · {locale.toUpperCase()}</span></div>
      <div style={{ display:"flex",flexDirection:"column",gap:18 }}><span style={{ fontSize:18,letterSpacing:4,color:"#fa7655" }}>{category.toUpperCase()} / {project?.year ?? "2026"}</span><span style={{ fontSize:76,lineHeight:1.02,letterSpacing:-5,maxWidth:980 }}>{title}</span></div>
      <div style={{ display:"flex",justifyContent:"space-between",borderTop:"1px solid rgba(255,255,255,.28)",paddingTop:20,fontSize:16,color:"#a0a69a" }}><span>{footerCaption}</span><span>ARSENE.TSHITENGA ↗</span></div>
    </div>,
    { ...size },
  );
}
